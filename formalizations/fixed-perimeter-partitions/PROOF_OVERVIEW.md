# Proof overview

The development is intentionally split into small compiler-checked layers.

## 1. Executable finite model

`Basic.lean` defines bounded multiplicity vectors, perimeter, the two
statistics, and executable finite counts. `BasicFiberBridge.lean` and
`CountBridge.lean` connect these definitions to canonical multiplicity fibers.

## 2. Exact `k = 2` correspondence

`BoundaryWords.lean`, `MultiplicityBijection.lean`, and `Fiber.lean` adapt the
recursive transformation used by Lin–Xiong–Yan, formalize its inverse and
perimeter preservation, and prove a support-level statistic identity.
Lin–Xiong–Yan's stated theorem concerns even-part occurrences and adjacent
repetitions; the distinct-size identity required here is an additional result
proved in this development. `CountBridge.lean` transports that cardinality
equality to `FO` and `FD`.

## 3. Generating functions

The `Enumerative*`, `FormalSeries.lean`, `FixedJSeries.lean`, and
`ExecutableSeries.lean` modules derive fixed-`j` formal power-series identities
from the finite combinatorial definitions. They are not assumed as axioms.

## 4. Dominant roots

`Polynomials.lean`, `Roots.lean`, `DominantRoots.lean`, `SimpleRoots.lean`,
`DominantFactorization.lean`, and `AnalyticRootGap.lean` establish the positive
dominant roots, their simplicity, minimum-modulus uniqueness, and the strict
root comparison required for `k ≥ 3`.

## 5. Coefficient asymptotics

`PoleModel.lean`, `AnalyticCoefficientBounds.lean`,
`PolynomialInverseAnalytic.lean`, `AnalyticFormalInverse.lean`,
`RationalTransfer.lean`, `ConcreteAsymptotics.lean`, and
`SeriesTransport.lean` implement the claim-specific rational transfer
argument. The leading constants are shown positive.

## 6. Final comparison

`AsymptoticComparison.lean` converts positive asymptotic equivalents and the
root gap into a ratio limit and eventual strict inequality.
`MainTheorems.lean` instantiates the analytic results for `j = 0` and `j > 0`
and transports them to the executable `FO` and `FD` definitions.

## 7. Audit

`AxiomAudit.lean` guards the expected axiom output for all three public
declarations. The root `FixedPerimeter.lean` imports every module, including
the audit.
