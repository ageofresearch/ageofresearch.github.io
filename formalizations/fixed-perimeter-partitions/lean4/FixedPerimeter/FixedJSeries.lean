import FixedPerimeter.FormalSeries
import FixedPerimeter.Fiber

/-!
# Claimed fixed-`j` rational series

This file records the exact polynomial numerators and denominators appearing
after extraction of a positive `z^j` coefficient.  The final enumerative task
is thereby reduced to explicit convolution recurrences for the canonical
counts; the recurrences themselves are not assumed here.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial

noncomputable def mapIntPolynomialToRat
    (polynomial : Polynomial ℤ) : Polynomial ℚ :=
  polynomial.map (Int.castRingHom ℚ)

noncomputable def fdFixedJNumerator (j k : ℕ) : Polynomial ℚ :=
  X ^ ((k + 1) * j - 1)

noncomputable def fdFixedJDenominator (j k : ℕ) : Polynomial ℚ :=
  (1 - X) ^ (j - 1) *
    (mapIntPolynomialToRat (AD k)) ^ (j + 1)

noncomputable def foFixedJNumerator (j k : ℕ) : Polynomial ℚ :=
  X ^ ((k + 1) * j - 1) *
    mapIntPolynomialToRat (RK k)

noncomputable def foFixedJDenominator (j k : ℕ) : Polynomial ℚ :=
  (1 - X) ^ (j - 1) *
    (mapIntPolynomialToRat (AO k)) ^ (j + 1)

/-! The zero-statistic branch has a different numerator and only a simple
dominant pole.  It must not be obtained by substituting `j = 0` into the
positive-`j` formula. -/

noncomputable def fdZeroNumerator (k : ℕ) : Polynomial ℚ :=
  ∑ index ∈ Finset.range (k - 1), X ^ (index + 1)

noncomputable def fdZeroDenominator (k : ℕ) : Polynomial ℚ :=
  mapIntPolynomialToRat (AD k)

noncomputable def foZeroNumerator (k : ℕ) : Polynomial ℚ :=
  mapIntPolynomialToRat (TK k)

noncomputable def foZeroDenominator (k : ℕ) : Polynomial ℚ :=
  mapIntPolynomialToRat (AO k)

theorem mapIntPolynomialToRat_coeff_zero_AD (k : ℕ) :
    (mapIntPolynomialToRat (AD k)).coeff 0 = 1 := by
  rw [coeff_zero_eq_eval_zero]
  simp [mapIntPolynomialToRat, AD]
  rw [eval_finsetSum]
  simp

theorem mapIntPolynomialToRat_coeff_zero_AO (k : ℕ) (hk : 1 ≤ k) :
    (mapIntPolynomialToRat (AO k)).coeff 0 = 1 := by
  have hkNe : k ≠ 0 := by omega
  rw [coeff_zero_eq_eval_zero]
  simp [mapIntPolynomialToRat, AO, hkNe]

theorem fdFixedJDenominator_coeff_zero (j k : ℕ) :
    (fdFixedJDenominator j k).coeff 0 = 1 := by
  have hADValue :
      (mapIntPolynomialToRat (AD k)).eval 0 = 1 := by
    rw [← coeff_zero_eq_eval_zero]
    exact mapIntPolynomialToRat_coeff_zero_AD k
  rw [coeff_zero_eq_eval_zero]
  simp [fdFixedJDenominator, hADValue]

theorem foFixedJDenominator_coeff_zero
    (j k : ℕ) (hk : 1 ≤ k) :
    (foFixedJDenominator j k).coeff 0 = 1 := by
  have hAOValue :
      (mapIntPolynomialToRat (AO k)).eval 0 = 1 := by
    rw [← coeff_zero_eq_eval_zero]
    exact mapIntPolynomialToRat_coeff_zero_AO k hk
  rw [coeff_zero_eq_eval_zero]
  simp [foFixedJDenominator, hAOValue]

theorem fdZeroDenominator_coeff_zero (k : ℕ) :
    (fdZeroDenominator k).coeff 0 = 1 :=
  mapIntPolynomialToRat_coeff_zero_AD k

theorem foZeroDenominator_coeff_zero
    (k : ℕ) (hk : 1 ≤ k) :
    (foZeroDenominator k).coeff 0 = 1 :=
  mapIntPolynomialToRat_coeff_zero_AO k hk

/-- Exact recurrence obligation for the separate `j = 0` `FD` series. -/
theorem canonicalFD_zero_series_iff_recurrence
    (k : ℕ) :
    seriesOf (fun n => (CanonicalFD 0 k n : ℚ)) =
        rationalSeries (fdZeroNumerator k) (fdZeroDenominator k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (fdZeroDenominator k).coeff pair.1 *
            (CanonicalFD 0 k pair.2 : ℚ)) =
        (fdZeroNumerator k).coeff n := by
  apply seriesOf_eq_rationalSeries_iff
  rw [fdZeroDenominator_coeff_zero]
  exact one_ne_zero

/-- Exact recurrence obligation for the separate `j = 0` `FO` series. -/
theorem canonicalFO_zero_series_iff_recurrence
    (k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (CanonicalFO 0 k n : ℚ)) =
        rationalSeries (foZeroNumerator k) (foZeroDenominator k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (foZeroDenominator k).coeff pair.1 *
            (CanonicalFO 0 k pair.2 : ℚ)) =
        (foZeroNumerator k).coeff n := by
  apply seriesOf_eq_rationalSeries_iff
  rw [foZeroDenominator_coeff_zero k hk]
  exact one_ne_zero

/-- Exact recurrence obligation equivalent to the positive-`j` `FD`
generating-function identity. -/
theorem canonicalFD_series_iff_recurrence
    (j k : ℕ) :
    seriesOf (fun n => (CanonicalFD j k n : ℚ)) =
        rationalSeries
          (fdFixedJNumerator j k)
          (fdFixedJDenominator j k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (fdFixedJDenominator j k).coeff pair.1 *
            (CanonicalFD j k pair.2 : ℚ)) =
        (fdFixedJNumerator j k).coeff n := by
  apply seriesOf_eq_rationalSeries_iff
  rw [fdFixedJDenominator_coeff_zero]
  exact one_ne_zero

/-- Exact recurrence obligation equivalent to the positive-`j` `FO`
generating-function identity. -/
theorem canonicalFO_series_iff_recurrence
    (j k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (CanonicalFO j k n : ℚ)) =
        rationalSeries
          (foFixedJNumerator j k)
          (foFixedJDenominator j k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (foFixedJDenominator j k).coeff pair.1 *
            (CanonicalFO j k pair.2 : ℚ)) =
        (foFixedJNumerator j k).coeff n := by
  apply seriesOf_eq_rationalSeries_iff
  rw [foFixedJDenominator_coeff_zero j k hk]
  exact one_ne_zero

theorem fdFixedJNumerator_eq_foFixedJNumerator_two (j : ℕ) :
    fdFixedJNumerator j 2 = foFixedJNumerator j 2 := by
  simp [fdFixedJNumerator, foFixedJNumerator, mapIntPolynomialToRat,
    RK_two]

theorem fdFixedJDenominator_eq_foFixedJDenominator_two (j : ℕ) :
    fdFixedJDenominator j 2 = foFixedJDenominator j 2 := by
  simp [fdFixedJDenominator, foFixedJDenominator,
    mapIntPolynomialToRat, AD_two_eq_AO_two]

theorem fixedJ_rationalSeries_eq_two (j : ℕ) :
    rationalSeries
        (fdFixedJNumerator j 2)
        (fdFixedJDenominator j 2) =
      rationalSeries
        (foFixedJNumerator j 2)
        (foFixedJDenominator j 2) := by
  rw [fdFixedJNumerator_eq_foFixedJNumerator_two,
    fdFixedJDenominator_eq_foFixedJDenominator_two]

end FixedPerimeter
