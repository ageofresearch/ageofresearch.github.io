# Formagization

**A reproducible Lean-first archive of machine-checked mathematics.**

[![Registry validation](https://github.com/ageofresearch/formagization/actions/workflows/validate-registry.yml/badge.svg)](https://github.com/ageofresearch/formagization/actions/workflows/validate-registry.yml)
[![Lean verification](https://github.com/ageofresearch/formagization/actions/workflows/lean.yml/badge.svg)](https://github.com/ageofresearch/formagization/actions/workflows/lean.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Project website](https://ageofresearch.github.io/formagization/) ·
[Formalization archive](https://ageofresearch.github.io/formagization/formalizations/) ·
[Evidence standards](https://ageofresearch.github.io/formagization/standards/) ·
[Review an artifact](https://ageofresearch.github.io/formagization/review/)

This repository is an evidence-graded archive of reproducible mathematical
formalizations developed with AI assistance. It is designed for contributions
in Lean, Isabelle, Rocq/Coq, HOL, Agda, Mizar, and other proof systems.

## First published formalization

### Fixed-perimeter partition counts

For a nonempty integer partition, define its *perimeter* as its largest part
plus its number of parts minus one. For natural numbers `j`, `k`, and `n`, let
`FO(j,k,n)` count partitions of perimeter `n` having exactly `j` distinct
present part sizes divisible by `k`, and let `FD(j,k,n)` count those having
exactly `j` distinct part sizes that occur at least `k` times.

The first Lean 4 + Mathlib artifact establishes three related formal
statements:

1. **Exact equality at `k = 2`:** `FD(j,2,n) = FO(j,2,n)` for every natural
   `j` and `n`.
2. **Asymptotic separation for `k ≥ 3`:** for each fixed `j` and `k ≥ 3`,
   `FO(j,k,n) / FD(j,k,n) → 0` as `n → ∞`, with the quotient taken in `ℝ`.
3. **Eventual strict inequality:** consequently, for each fixed `j` and
   `k ≥ 3`, `FO(j,k,n) < FD(j,k,n)` for all sufficiently large `n`.

**Proof architecture.** The `k = 2` result is obtained from a recursive,
perimeter-preserving bijection together with a proved support-statistic
correspondence. For `k ≥ 3`, the development derives fixed-`j` generating
functions from executable finite definitions, proves the required
dominant-root separation, develops a claim-specific rational
coefficient-transfer argument with positive leading constants, and transports
the resulting asymptotics back to `FO` and `FD`.

**Recorded evidence.** A clean GitHub Actions run built all 2,822 Lean jobs and
passed Lean's environment checker, the guarded axiom audit, and nanoda's
independent type-check. The three public declarations contain no proof
placeholders or explicit local axioms; their guarded axiom output is exactly
`propext`, `Classical.choice`, and `Quot.sound`.

**Review status.** Independent semantic alignment, subject-matter review,
independent human reproduction, and novelty assessment have not yet been
recorded.

[Artifact overview](formalizations/fixed-perimeter-partitions/) ·
[Exact statement and conventions](formalizations/fixed-perimeter-partitions/STATEMENT_MAPPING.md) ·
[Proof architecture](formalizations/fixed-perimeter-partitions/PROOF_OVERVIEW.md) ·
[Lean source](formalizations/fixed-perimeter-partitions/lean4/FixedPerimeter/) ·
[Reproduction guide](formalizations/fixed-perimeter-partitions/REPRODUCIBILITY.md) ·
[CI report](formalizations/fixed-perimeter-partitions/reviews/github-ci-2026-07-25.md)

## Scientific boundary

Inclusion in this archive means that an artifact satisfies the archive's
metadata and reproducibility requirements. It does **not** establish novelty,
publication priority, correctness of an informal source, or semantic
equivalence between an informal claim and a formal statement.

We report the following dimensions separately:

- source capture and provenance;
- clean build and dependency pinning;
- kernel or checker acceptance;
- disclosed axioms and trusted computing base;
- semantic alignment with the informal statement;
- proof-assistant expert review;
- subject-matter expert review;
- independent reproduction;
- novelty assessment.

There is deliberately no generic “verified” badge.

## Formalizations

| Artifact | System | Build | Kernel/checker | Semantic alignment | Independent reproduction |
|---|---|---|---|---|---|
| [Fixed-perimeter partition counts](formalizations/fixed-perimeter-partitions/) | Lean 4 + Mathlib | Clean GitHub CI passed | Lean, leanchecker, and nanoda CI passed | Not independently reviewed | Not recorded |

Machine-readable records live in [`registry/artifacts.json`](registry/artifacts.json).

## Repository model

Each artifact is isolated under `formalizations/<artifact-id>/`. It carries its
own source statement, theorem map, toolchain pins, AI disclosure, review state,
and reproduction instructions. Different artifacts may use different proof
assistants and versions.

The archive records evidence; maintainers do not certify mathematics by fiat.
Corrections are versioned, previous releases remain available, and disputes are
recorded rather than erased.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and
[REVIEWING.md](REVIEWING.md). A submission must build without proof
placeholders, disclose all nonstandard axioms, identify an accountable human
maintainer, and separate semantic review from machine checking.

## Citation

Use the repository-level [`CITATION.cff`](CITATION.cff) for the archive. Each
formalization also provides its own preferred citation.

## License

Unless an artifact states otherwise, repository-authored source and
documentation are available under the [MIT License](LICENSE). External source
papers and linked materials retain their own licenses.
