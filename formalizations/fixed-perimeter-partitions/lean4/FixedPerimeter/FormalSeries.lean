import FixedPerimeter.Polynomials
import Mathlib.RingTheory.PowerSeries.Basic
import Mathlib.RingTheory.PowerSeries.Inverse

/-!
# Formal coefficient extraction

All enumerative identities are interpreted in the formal power-series ring.
No analytic convergence is used in this layer.  A rational-series identity is
reduced to the coefficient recurrence obtained after clearing its denominator.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

open Polynomial

/-- Formal power series with a prescribed coefficient sequence. -/
noncomputable def seriesOf {R : Type*} [Semiring R]
    (sequence : ℕ → R) : PowerSeries R :=
  PowerSeries.mk sequence

@[simp] theorem coeff_seriesOf {R : Type*} [Semiring R]
    (sequence : ℕ → R) (n : ℕ) :
    PowerSeries.coeff n (seriesOf sequence) = sequence n :=
  PowerSeries.coeff_mk n sequence

/-- A polynomial numerator divided by a polynomial denominator, interpreted
purely formally. -/
noncomputable def rationalSeries {K : Type*} [Field K]
    (numerator denominator : Polynomial K) : PowerSeries K :=
  (numerator : PowerSeries K) * (denominator : PowerSeries K)⁻¹

theorem coeff_polynomial_mul_seriesOf {R : Type*} [Semiring R]
    (polynomial : Polynomial R) (sequence : ℕ → R) (n : ℕ) :
    PowerSeries.coeff n
        ((polynomial : PowerSeries R) * seriesOf sequence) =
      ∑ pair ∈ Finset.antidiagonal n,
        polynomial.coeff pair.1 * sequence pair.2 := by
  rw [PowerSeries.coeff_mul]
  apply Finset.sum_congr rfl
  intro pair _
  simp

theorem polynomial_mul_seriesOf_eq_iff {R : Type*} [Semiring R]
    (polynomial target : Polynomial R) (sequence : ℕ → R) :
    (polynomial : PowerSeries R) * seriesOf sequence =
        (target : PowerSeries R) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          polynomial.coeff pair.1 * sequence pair.2) =
        target.coeff n := by
  constructor
  · intro heq n
    have := congrArg (PowerSeries.coeff n) heq
    simpa [coeff_polynomial_mul_seriesOf] using this
  · intro h
    apply PowerSeries.ext
    intro n
    rw [coeff_polynomial_mul_seriesOf, Polynomial.coeff_coe]
    exact h n

theorem seriesOf_eq_rationalSeries_iff {K : Type*} [Field K]
    (numerator denominator : Polynomial K)
    (sequence : ℕ → K)
    (hconstant : denominator.coeff 0 ≠ 0) :
    seriesOf sequence = rationalSeries numerator denominator ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          denominator.coeff pair.1 * sequence pair.2) =
        numerator.coeff n := by
  have hconstantSeries :
      PowerSeries.constantCoeff (denominator : PowerSeries K) ≠ 0 := by
    simpa using hconstant
  unfold rationalSeries
  rw [PowerSeries.eq_mul_inv_iff_mul_eq hconstantSeries]
  simpa [mul_comm] using
    (polynomial_mul_seriesOf_eq_iff denominator numerator sequence)

theorem denominator_mul_rationalSeries {K : Type*} [Field K]
    (numerator denominator : Polynomial K)
    (hconstant : denominator.coeff 0 ≠ 0) :
    (denominator : PowerSeries K) *
        rationalSeries numerator denominator =
      (numerator : PowerSeries K) := by
  have hconstantSeries :
      PowerSeries.constantCoeff (denominator : PowerSeries K) ≠ 0 := by
    simpa using hconstant
  unfold rationalSeries
  calc
    (denominator : PowerSeries K) *
          ((numerator : PowerSeries K) *
            (denominator : PowerSeries K)⁻¹) =
        (numerator : PowerSeries K) *
          ((denominator : PowerSeries K) *
            (denominator : PowerSeries K)⁻¹) := by ring
    _ = (numerator : PowerSeries K) := by
      rw [PowerSeries.mul_inv_cancel _ hconstantSeries, mul_one]

end FixedPerimeter
