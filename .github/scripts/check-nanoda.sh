#!/usr/bin/env bash

set -euo pipefail

if [[ "$#" -ne 2 ]]; then
  echo "usage: $0 <lake-package-directory> <root-module>" >&2
  exit 2
fi

project_directory="$1"
root_module="$2"

readonly lean4export_repository="https://github.com/leanprover/lean4export.git"
readonly lean4export_commit="af5aa64bb914c3c2c781f378088dbd38acf4f804"
readonly nanoda_repository="https://github.com/ammkrn/nanoda_lib.git"
readonly nanoda_commit="e5438ac0a85a036b6dfe093aa457bc3448498014"

# lean-action v1.5.0 cannot infer the library root from Lake's current
# top-level TOML package format. Resolve the exact sources here and export the
# explicit module instead of relying on that wrapper's package-name heuristic.
project_directory="$(cd "$project_directory" && pwd)"
checker_directory="$(mktemp -d "${RUNNER_TEMP:-/tmp}/formagization-nanoda.XXXXXX")"

cleanup() {
  rm -rf -- "$checker_directory"
}
trap cleanup EXIT

clone_at_commit() {
  local repository="$1"
  local commit="$2"
  local destination="$3"

  git init --quiet "$destination"
  git -C "$destination" remote add origin "$repository"
  git -C "$destination" fetch --quiet --depth=1 --no-tags origin "$commit"
  git -C "$destination" checkout --quiet --detach FETCH_HEAD

  local resolved
  resolved="$(git -C "$destination" rev-parse HEAD)"
  if [[ "$resolved" != "$commit" ]]; then
    echo "expected $commit from $repository, resolved $resolved" >&2
    exit 1
  fi
}

exporter_directory="$checker_directory/lean4export"
nanoda_directory="$checker_directory/nanoda"
export_file="$checker_directory/environment.export"
config_file="$checker_directory/nanoda.json"

clone_at_commit \
  "$lean4export_repository" \
  "$lean4export_commit" \
  "$exporter_directory"
cp "$project_directory/lean-toolchain" "$exporter_directory/lean-toolchain"
(cd "$exporter_directory" && lake build)

clone_at_commit \
  "$nanoda_repository" \
  "$nanoda_commit" \
  "$nanoda_directory"
cargo build \
  --release \
  --locked \
  --manifest-path "$nanoda_directory/Cargo.toml"

(
  cd "$project_directory"
  lake env "$exporter_directory/.lake/build/bin/lean4export" \
    "$root_module" > "$export_file"
)

cat > "$config_file" <<EOF
{
  "export_file_path": "$export_file",
  "use_stdin": false,
  "permitted_axioms": [
    "propext",
    "Classical.choice",
    "Quot.sound",
    "Lean.trustCompiler"
  ],
  "unpermitted_axiom_hard_error": false,
  "nat_extension": true,
  "string_extension": true,
  "print_success_message": true
}
EOF

"$nanoda_directory/target/release/nanoda_bin" "$config_file"
