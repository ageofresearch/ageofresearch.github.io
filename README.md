# Formagization

**A reproducible Lean-first archive of machine-checked mathematics.**

[![Registry validation](https://github.com/ageofresearch/formagization/actions/workflows/validate-registry.yml/badge.svg)](https://github.com/ageofresearch/formagization/actions/workflows/validate-registry.yml)
[![Lean verification](https://github.com/ageofresearch/formagization/actions/workflows/lean.yml/badge.svg)](https://github.com/ageofresearch/formagization/actions/workflows/lean.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This repository is an evidence-graded archive of reproducible mathematical
formalizations developed with AI assistance. It is designed for contributions
in Lean, Isabelle, Rocq/Coq, HOL, Agda, Mizar, and other proof systems.

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
| [Fixed-perimeter partition counts](formalizations/fixed-perimeter-partitions/) | Lean 4 + Mathlib | Local build passed; clean CI pending | Local audit passed; CI pending | Not independently reviewed | Not recorded |

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
