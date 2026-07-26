# Author check — 2026-07-25

## Scope

- Reviewer: Age of Research (`@ageofresearch`)
- Role: accountable artifact maintainer and author-side checker
- Independence: not independent
- Artifact version: pre-release candidate for `1.0.0`
- Commit: pre-publication worktree; a commit-specific clean CI report is pending
- Platform: macOS 14.6.1 (`23G93`), Apple silicon (`arm64`)
- Conflicts: artifact maintainer; this report must not be counted as
  independent reproduction or review

## Commands and results

The Lean project was connected temporarily to an existing dependency cache
pinned by the committed `lean-toolchain` and `lake-manifest.json`.

```bash
lake exe mk_all
lake exe mk_all --check
lake build FixedPerimeter
lake env lean FixedPerimeter/AxiomAudit.lean
node scripts/validate-registry.mjs
```

Results:

- `mk_all` regenerated the complete root import and `mk_all --check` passed;
- `lake build FixedPerimeter` completed successfully: 2,822 jobs;
- the complete warm build took approximately three minutes;
- the guarded axiom audit passed for all three public declarations;
- registry validation passed;
- source scans found no `sorry`, `admit`, explicit local `axiom`, `unsafe`
  declaration, or explicit `opaque` declaration.

## Limitation

This check reused an existing dependency and build cache through a temporary
local `.lake` link, which was removed before staging. It establishes a
successful author-run local build, not a clean-checkout reproduction. The
GitHub Actions workflow is the first clean CI reproduction gate.
