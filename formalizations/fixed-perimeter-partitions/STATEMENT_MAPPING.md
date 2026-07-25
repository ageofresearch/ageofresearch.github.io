# Statement and semantic mapping

This document maps the informal target to the exact Lean definitions and
public declarations. It is an author-prepared map, not an independent semantic
review.

## Informal target

For nonempty integer partitions of fixed perimeter `n`, define:

- `FO(j,k,n)` as the number having exactly `j` distinct present part sizes
  divisible by `k`;
- `FD(j,k,n)` as the number having exactly `j` distinct part sizes occurring
  at least `k` times.

The target consists of:

1. `FD(j,2,n) = FO(j,2,n)` for all natural `j,n`;
2. for fixed natural `j` and `k ≥ 3`,
   `FO(j,k,n) / FD(j,k,n) → 0` as `n → ∞`;
3. consequently, for fixed `j` and `k ≥ 3`,
   `FO(j,k,n) < FD(j,k,n)` for all sufficiently large `n`.

## Domain representation

Lean file: `lean4/FixedPerimeter/Basic.lean`

```lean
abbrev Multiplicity (n : ℕ) := Fin n → Fin (n + 1)
```

For a fixed perimeter index `n`, coordinate `i : Fin n` represents part size
`i + 1`; its value is the multiplicity. The predicate `IsPartition` excludes
the all-zero vector. Thus the counted domain consists of nonempty partitions.

The bounded representation is proved equivalent to the canonical finite
multiplicity-list representation used by the generating-function development
in `BasicFiberBridge.lean` and `CountBridge.lean`.

## Perimeter

```lean
def numberOfParts := sum of multiplicities
def largestPart := largest supported index plus one
def perimeter := largestPart + numberOfParts - 1
```

`fixedPerimeterPartitions n` filters nonempty multiplicity vectors for
`perimeter = n`.

The natural subtraction is safe on counted objects because nonemptiness gives
positive largest part and positive number of parts. The supporting equality

```lean
perimeter m + 1 = largestPart m + numberOfParts m
```

is proved as `perimeter_eq_add_sub_one`.

## Statistics

```lean
def divisiblePresentCount (k : ℕ) (m : Multiplicity n) : ℕ :=
  ((support m).filter fun i => k ∣ i.val + 1).card
```

This counts **distinct supported sizes**, not occurrences.

```lean
def frequentSizeCount (k : ℕ) (m : Multiplicity n) : ℕ :=
  ((support m).filter fun i => k ≤ (m i : ℕ)).card
```

This counts **distinct sizes meeting the multiplicity threshold**, not excess
occurrences.

```lean
def FO (j k n : ℕ) : ℕ := ...
def FD (j k n : ℕ) : ℕ := ...
```

Both are cardinalities of explicit finite sets.

## Boundary conventions

- The formal count functions accept all natural `j,k,n`.
- At `n = 0`, the only bounded vector is empty and is excluded, so both counts
  are zero.
- The exact `k = 2` equality therefore includes `n = 0`.
- The asymptotic theorems assume `3 ≤ k`.
- `j` and `k` are universally quantified outside the limit; the sequence
  variable is `n`. No uniformity in `j` or `k` is claimed.
- The ratio is formed after coercing both counts to `ℝ`. It is not natural
  division.
- Eventual positivity of the denominator is proved inside the asymptotic
  development before deriving strict inequality.

## Public theorem 1: exact equality

Lean file: `lean4/FixedPerimeter/CountBridge.lean`

```lean
theorem fixedPerimeter_eq_two (j n : ℕ) :
    FD j 2 n = FO j 2 n
```

This matches target item 1 exactly under the definitions above.

## Public theorem 2: ratio limit

Lean file: `lean4/FixedPerimeter/MainTheorems.lean`

```lean
theorem fixedPerimeter_ratio_tendsto_zero
    (j k : ℕ) (hk : 3 ≤ k) :
    Tendsto
      (fun n => (FO j k n : ℝ) / (FD j k n : ℝ))
      atTop (𝓝 0)
```

This matches target item 2. The topology is the ordinary real topology and
`atTop` is the natural-number limit filter.

## Public theorem 3: eventual strict inequality

Lean file: `lean4/FixedPerimeter/MainTheorems.lean`

```lean
theorem fixedPerimeter_eventually_strict
    (j k : ℕ) (hk : 3 ≤ k) :
    ∃ threshold : ℕ, ∀ n ≥ threshold,
      FO j k n < FD j k n
```

This matches target item 3 with an explicit natural threshold.

## Source relationship

The public ChatGPT response identified in `metadata.json` supplied the
strengthened target. Its assertions were not imported into Lean as axioms.
Generating-function identities, root separation, coefficient asymptotics,
positivity, and transport back to executable counts are internal proof
obligations.

The `k = 2` transformation adapts the recursive construction used by Lin,
Xiong, and Yan in Theorem 11. Their theorem's statistics are not `FO` and `FD`
as defined here: `even(λ)` counts even-part occurrences, while `rep(λ)` counts
adjacent repetitions (equivalently, multiplicity beyond the first copy).
This artifact counts distinct supported even sizes and distinct sizes having
multiplicity at least two. The Lean development proves the inverse, perimeter
preservation, and this additional support-level statistic correspondence; it
does not present the result as a direct formalization of Theorem 11's stated
equality.

## Review still required

An independent reviewer should confirm:

- that “present part sizes” and “part sizes occurring at least `k` times” have
  the intended support-cardinality meanings;
- that nonempty partitions and the extension at `n = 0` match the intended
  public statement;
- that the public source intended the same quantifier order and real ratio;
- that the cited `k = 2` construction has been mapped faithfully.
