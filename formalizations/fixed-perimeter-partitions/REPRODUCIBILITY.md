# Reproducibility

## Pinned environment

- Lean: `leanprover/lean4:v4.32.1`
- Mathlib: `520045ab14e26149ee970e2e617ca04b09bde5d6`
- Lake manifest: committed with exact transitive dependency revisions

The scientific reproduction target is acceptance of the same declarations and
the same guarded axiom output. Byte-for-byte equality of generated `.olean`
files across operating systems is not claimed.

## Requirements

- Git
- Internet access for the first dependency download
- `elan` with a current Lake installation

Linux, macOS, and Windows GitHub-hosted runners are supported by the standard
Lean action. The archive's required CI environment is Ubuntu.

## Clean reproduction

From the artifact directory:

```bash
cd lean4
lake exe cache get
lake exe mk_all --check
lake build FixedPerimeter
lake env lean FixedPerimeter/AxiomAudit.lean
```

`lake exe cache get` downloads Mathlib's precompiled cache and is optional but
strongly recommended. Omitting it may cause Mathlib itself to build from
source.

## Expected audit

All three public declarations must report exactly:

```text
[propext, Classical.choice, Quot.sound]
```

The audit uses `#guard_msgs`, so elaboration fails if this output changes.

## Expected time and storage

- Existing dependencies and a warm local build: approximately 2–3 minutes in
  the author-run environment.
- Fresh machine using the Mathlib cache: commonly 5–20 minutes, depending on
  network and hardware.
- Building Mathlib from source: potentially several hours.
- Source package: approximately 0.5 MiB.
- Downloaded dependencies and build cache: several GiB.

These are practical estimates, not performance guarantees.

## CI

The repository's `Lean verification` workflow:

- uses a GitHub-hosted runner with read-only permissions;
- installs the pinned toolchain;
- uses Mathlib's upstream binary cache;
- disables reuse of this project's `.lake` cache;
- builds the complete `FixedPerimeter` target;
- runs Lean's environment checker;
- runs the independent `nanoda` checker against the explicit
  `FixedPerimeter` root, with both `lean4export` and `nanoda` pinned to
  immutable commits;
- executes the guarded public-theorem axiom audit explicitly;
- rejects `sorryAx`.

## Reproduction report

Independent reproducers should add an append-only report under `reviews/`
containing their commit SHA, platform, commands, elapsed time, output, name,
date, and conflicts of interest.

The pre-publication local check is recorded in
[`reviews/author-check-2026-07-25.md`](reviews/author-check-2026-07-25.md).
Because it reused an existing dependency cache, it is deliberately not labeled
an independent or clean-checkout reproduction.
