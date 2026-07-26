# Fixed-perimeter partition counts

## Artifact status

This artifact contains a Lean 4 and Mathlib formalization of three statements
about fixed-perimeter partition statistics:

1. exact equality of the two statistics at `k = 2`;
2. convergence of `FO(j,k,n) / FD(j,k,n)` to zero for fixed `j` and `k ≥ 3`;
3. eventual strict inequality `FO(j,k,n) < FD(j,k,n)` for fixed `j` and
   `k ≥ 3`.

The current source:

- builds with Lean `v4.32.1`;
- pins Mathlib to commit
  `520045ab14e26149ee970e2e617ca04b09bde5d6`;
- contains no `sorry`, `admit`, explicit local `axiom`, `unsafe`
  declaration, or explicit `opaque` declaration;
- reports only `propext`, `Classical.choice`, and `Quot.sound` for the three
  public conclusions.

Automated clean [GitHub CI](reviews/github-ci-2026-07-25.md) passed on a fresh
checkout: all 2,822 Lean build jobs, the bundled `leanchecker`, dependency-pin
integrity, the guarded axiom audit, and nanoda's independent type-check
completed successfully. **Independent semantic alignment, subject-matter
review, independent human reproduction, and novelty assessment have not yet
been recorded.**

## Public declarations

```lean
FixedPerimeter.fixedPerimeter_eq_two
FixedPerimeter.fixedPerimeter_ratio_tendsto_zero
FixedPerimeter.fixedPerimeter_eventually_strict
```

See [STATEMENT_MAPPING.md](STATEMENT_MAPPING.md) for the exact definitions,
quantifiers, boundary conventions, and informal interpretations.

## Definitions in brief

A fixed-perimeter partition is represented by a nonzero bounded multiplicity
vector. Its perimeter is

```text
largest part + number of parts − 1.
```

`FO j k n` counts partitions of perimeter `n` with exactly `j` distinct
present part sizes divisible by `k`. `FD j k n` counts partitions of perimeter
`n` with exactly `j` distinct part sizes whose multiplicity is at least `k`.

The quotient in the limit theorem is taken in the real numbers. The artifact
extends both counts by zero at `n = 0`.

## Reproduce

```bash
cd lean4
lake exe cache get
lake exe mk_all --check
lake build FixedPerimeter
lake env lean FixedPerimeter/AxiomAudit.lean
```

See [REPRODUCIBILITY.md](REPRODUCIBILITY.md) for expected output and clean
environment instructions.

## Sources and provenance

The formalization target was recovered from a public ChatGPT shared response.
The exact selected rendered response and its reproducible hash are preserved
under [`source/`](source/); it is treated as source material, not mathematical
evidence.

The `k = 2` Lean bijection adapts the recursive map used in Theorem 11 of:

Zhicong Lin, Huan Xiong, and Sherry H. F. Yan, *Combinatorics of Integer
Partitions With Prescribed Perimeter*, arXiv:2204.02879.

The cited theorem counts even-part occurrences and adjacent repetitions. This
artifact instead counts distinct supported even sizes and distinct sizes with
multiplicity at least two. The support-level statistic correspondence is
therefore an additional Lean proof about the adapted map, not a direct
formalization of the paper's stated equality. The inverse, perimeter
preservation, support-level correspondence, generating functions, root
analysis, coefficient asymptotics, and final transport are proved in Lean
rather than imported as assumptions.

See [AI_DISCLOSURE.md](AI_DISCLOSURE.md) and
[references.bib](references.bib).

## Scientific boundary

Lean kernel acceptance establishes that the formal conclusions follow from
their formal definitions and disclosed foundations in the pinned environment.
It does not by itself establish that those definitions perfectly represent the
informal source, that the source is correct, or that any result is novel.

## License and citation

The formalization is available under the repository's MIT License. Use
[`CITATION.cff`](CITATION.cff) for the preferred artifact citation.
