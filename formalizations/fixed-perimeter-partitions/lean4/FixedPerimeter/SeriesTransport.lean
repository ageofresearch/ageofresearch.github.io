import FixedPerimeter.ConcreteAsymptotics
import FixedPerimeter.FixedJSeries

/-!
# Transporting exact counting series from `ℚ` to real asymptotics

The enumerative recurrences are most convenient over `ℚ`, while the
asymptotic comparison lives over `ℝ`.  This file makes that scalar-extension
bridge explicit.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial
open Asymptotics Filter

theorem map_rationalSeries
    {K L : Type*} [Field K] [Field L]
    (hom : K →+* L) (hinjective : Function.Injective hom)
    (numerator denominator : Polynomial K)
    (hDenominator : denominator.coeff 0 ≠ 0) :
    PowerSeries.map hom (rationalSeries numerator denominator) =
      rationalSeries (numerator.map hom) (denominator.map hom) := by
  have hconstant :
      PowerSeries.constantCoeff
          (denominator : PowerSeries K) ≠ 0 := by
    simpa using hDenominator
  have hmapNumerator :
      PowerSeries.map hom (numerator : PowerSeries K) =
        (numerator.map hom : PowerSeries L) := by
    ext n
    simp
  have hmapDenominator :
      PowerSeries.map hom (denominator : PowerSeries K) =
        (denominator.map hom : PowerSeries L) := by
    ext n
    simp
  unfold rationalSeries
  rw [map_mul, hmapNumerator,
    map_powerSeries_inv_of_injective hom hinjective
      (denominator : PowerSeries K) hconstant,
    hmapDenominator]

theorem mapIntPolynomialToRat_map_real
    (polynomial : Polynomial ℤ) :
    (mapIntPolynomialToRat polynomial).map (Rat.castHom ℝ) =
      polynomial.map (Int.castRingHom ℝ) := by
  ext n
  simp [mapIntPolynomialToRat, Polynomial.map_map]

theorem fdFixedJNumerator_map_real (j k : ℕ) :
    (fdFixedJNumerator j k).map (Rat.castHom ℝ) =
      fdFixedJNumeratorReal j k := by
  simp [fdFixedJNumerator, fdFixedJNumeratorReal]

theorem fdFixedJDenominator_map_real (j k : ℕ) :
    (fdFixedJDenominator j k).map (Rat.castHom ℝ) =
      fdFixedJDenominatorReal j k := by
  simp only [fdFixedJDenominator, fdFixedJDenominatorReal,
    Polynomial.map_mul, Polynomial.map_pow,
    Polynomial.map_sub, Polynomial.map_one, map_X]
  rw [mapIntPolynomialToRat_map_real]
  rfl

theorem foFixedJNumerator_map_real (j k : ℕ) :
    (foFixedJNumerator j k).map (Rat.castHom ℝ) =
      foFixedJNumeratorReal j k := by
  simp [foFixedJNumerator, foFixedJNumeratorReal,
    RKReal, mapIntPolynomialToRat_map_real]

theorem foFixedJDenominator_map_real (j k : ℕ) :
    (foFixedJDenominator j k).map (Rat.castHom ℝ) =
      foFixedJDenominatorReal j k := by
  simp only [foFixedJDenominator, foFixedJDenominatorReal,
    Polynomial.map_mul, Polynomial.map_pow,
    Polynomial.map_sub, Polynomial.map_one, map_X]
  rw [mapIntPolynomialToRat_map_real]
  rfl

theorem fdZeroNumerator_map_real (k : ℕ) :
    (fdZeroNumerator k).map (Rat.castHom ℝ) =
      fdZeroNumeratorReal k := by
  simp [fdZeroNumerator, fdZeroNumeratorReal,
    Polynomial.map_sum, Polynomial.map_pow, map_X]

theorem fdZeroDenominator_map_real (k : ℕ) :
    (fdZeroDenominator k).map (Rat.castHom ℝ) =
      ADReal k := by
  simp [fdZeroDenominator, ADReal,
    mapIntPolynomialToRat_map_real]

theorem foZeroNumerator_map_real (k : ℕ) :
    (foZeroNumerator k).map (Rat.castHom ℝ) =
      foZeroNumeratorReal k := by
  simp [foZeroNumerator, foZeroNumeratorReal, TKReal,
    mapIntPolynomialToRat_map_real]

theorem foZeroDenominator_map_real (k : ℕ) :
    (foZeroDenominator k).map (Rat.castHom ℝ) =
      AOReal k := by
  simp [foZeroDenominator, AOReal,
    mapIntPolynomialToRat_map_real]

theorem map_seriesOf_natCast
    (sequence : ℕ → ℕ) :
    PowerSeries.map (Rat.castHom ℝ)
        (seriesOf (fun n => (sequence n : ℚ))) =
      seriesOf (fun n => (sequence n : ℝ)) := by
  ext n
  simp

theorem canonicalFD_asymptotic_of_series
    (j k : ℕ) (hk : 2 ≤ k)
    (hSeries :
      seriesOf (fun n => (CanonicalFD j k n : ℚ)) =
        rationalSeries
          (fdFixedJNumerator j k)
          (fdFixedJDenominator j k)) :
    (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
      coefficientModel
        (fdLeadingConstant j k hk) j
        (adRoot k (by omega)) := by
  have hmapped := congrArg
    (PowerSeries.map (Rat.castHom ℝ)) hSeries
  rw [map_seriesOf_natCast] at hmapped
  rw [map_rationalSeries
      (Rat.castHom ℝ) Rat.cast_injective
      (fdFixedJNumerator j k)
      (fdFixedJDenominator j k)
      (by
        rw [fdFixedJDenominator_coeff_zero]
        norm_num),
    fdFixedJNumerator_map_real,
    fdFixedJDenominator_map_real] at hmapped
  apply (fdFixedJ_rational_coeff_isEquivalent j k hk).congr_left
  filter_upwards [] with n
  have hcoeff := congrArg (PowerSeries.coeff n) hmapped
  simpa using hcoeff.symm

theorem canonicalFO_asymptotic_of_series
    (j k : ℕ) (hk : 2 ≤ k)
    (hSeries :
      seriesOf (fun n => (CanonicalFO j k n : ℚ)) =
        rationalSeries
          (foFixedJNumerator j k)
          (foFixedJDenominator j k)) :
    (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
      coefficientModel
        (foLeadingConstant j k hk) j
        (aoRoot k hk) := by
  have hmapped := congrArg
    (PowerSeries.map (Rat.castHom ℝ)) hSeries
  rw [map_seriesOf_natCast] at hmapped
  rw [map_rationalSeries
      (Rat.castHom ℝ) Rat.cast_injective
      (foFixedJNumerator j k)
      (foFixedJDenominator j k)
      (by
        rw [foFixedJDenominator_coeff_zero j k (by omega)]
        norm_num),
    foFixedJNumerator_map_real,
    foFixedJDenominator_map_real] at hmapped
  apply (foFixedJ_rational_coeff_isEquivalent j k hk).congr_left
  filter_upwards [] with n
  have hcoeff := congrArg (PowerSeries.coeff n) hmapped
  simpa using hcoeff.symm

theorem canonicalFD_zero_asymptotic_of_series
    (k : ℕ) (hk : 2 ≤ k)
    (hSeries :
      seriesOf (fun n => (CanonicalFD 0 k n : ℚ)) =
        rationalSeries
          (fdZeroNumerator k) (fdZeroDenominator k)) :
    (fun n => (CanonicalFD 0 k n : ℝ)) ~[atTop]
      coefficientModel
        (fdZeroLeadingConstant k hk) 0
        (adRoot k (by omega)) := by
  have hmapped := congrArg
    (PowerSeries.map (Rat.castHom ℝ)) hSeries
  rw [map_seriesOf_natCast] at hmapped
  rw [map_rationalSeries
      (Rat.castHom ℝ) Rat.cast_injective
      (fdZeroNumerator k) (fdZeroDenominator k)
      (by
        rw [fdZeroDenominator_coeff_zero]
        norm_num),
    fdZeroNumerator_map_real,
    fdZeroDenominator_map_real] at hmapped
  apply (fdZero_rational_coeff_isEquivalent k hk).congr_left
  filter_upwards [] with n
  have hcoeff := congrArg (PowerSeries.coeff n) hmapped
  simpa using hcoeff.symm

theorem canonicalFO_zero_asymptotic_of_series
    (k : ℕ) (hk : 2 ≤ k)
    (hSeries :
      seriesOf (fun n => (CanonicalFO 0 k n : ℚ)) =
        rationalSeries
          (foZeroNumerator k) (foZeroDenominator k)) :
    (fun n => (CanonicalFO 0 k n : ℝ)) ~[atTop]
      coefficientModel
        (foZeroLeadingConstant k hk) 0
        (aoRoot k hk) := by
  have hmapped := congrArg
    (PowerSeries.map (Rat.castHom ℝ)) hSeries
  rw [map_seriesOf_natCast] at hmapped
  rw [map_rationalSeries
      (Rat.castHom ℝ) Rat.cast_injective
      (foZeroNumerator k) (foZeroDenominator k)
      (by
        rw [foZeroDenominator_coeff_zero k (by omega)]
        norm_num),
    foZeroNumerator_map_real,
    foZeroDenominator_map_real] at hmapped
  apply (foZero_rational_coeff_isEquivalent k hk).congr_left
  filter_upwards [] with n
  have hcoeff := congrArg (PowerSeries.coeff n) hmapped
  simpa using hcoeff.symm

end FixedPerimeter
