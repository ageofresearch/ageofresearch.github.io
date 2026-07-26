import FixedPerimeter.PoleModel
import Mathlib.Analysis.Asymptotics.SpecificAsymptotics
import Mathlib.Analysis.SpecificLimits.Normed

/-!
# Exponentially smaller coefficient remainders

A coefficient sequence controlled by a larger convergence radius is
negligible compared with the dominant pole, even if the two sides carry
different fixed polynomial powers of the index.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

theorem pureExponential_isBigO_coefficientModel
    {constant radius : ℝ} (j : ℕ)
    (hConstant : constant ≠ 0) (hRadius : 0 < radius) :
    (fun n : ℕ => radius⁻¹ ^ n) =O[atTop]
      coefficientModel constant j radius := by
  have hAbs : 0 < |constant| := abs_pos.mpr hConstant
  apply IsBigO.of_bound |constant|⁻¹
  filter_upwards [eventually_ge_atTop 1] with n hn
  have hnReal : (1 : ℝ) ≤ n := by exact_mod_cast hn
  have hnPow : (1 : ℝ) ≤ (n : ℝ) ^ j :=
    one_le_pow₀ hnReal
  unfold coefficientModel
  rw [Real.norm_eq_abs, Real.norm_eq_abs]
  rw [abs_of_pos (pow_pos (inv_pos.mpr hRadius) n)]
  rw [abs_div, abs_mul, abs_pow]
  have hNatAbs : |(n : ℝ)| = (n : ℝ) :=
    abs_of_nonneg (Nat.cast_nonneg n)
  rw [hNatAbs]
  rw [abs_of_pos (pow_pos hRadius n)]
  calc
    radius⁻¹ ^ n = 1 / radius ^ n := by
      rw [one_div, inv_pow]
    _ ≤ (n : ℝ) ^ j / radius ^ n :=
      (div_le_div_iff_of_pos_right (pow_pos hRadius n)).2 hnPow
    _ = |constant|⁻¹ *
        (|constant| * (n : ℝ) ^ j / radius ^ n) := by
      field_simp

/-- A fixed polynomial factor cannot overcome a strict gap between positive
exponential radii. -/
theorem coefficientModel_isLittleO_of_radius_lt
    {remainderConstant dominantConstant remainderRadius dominantRadius : ℝ}
    (remainderDegree dominantDegree : ℕ)
    (hDominantConstant : dominantConstant ≠ 0)
    (hDominantRadius : 0 < dominantRadius)
    (hRadius : dominantRadius < remainderRadius) :
    coefficientModel remainderConstant remainderDegree remainderRadius =o[atTop]
      coefficientModel dominantConstant dominantDegree dominantRadius := by
  have hRemainderRadius : 0 < remainderRadius :=
    hDominantRadius.trans hRadius
  have hInverse :
      ‖(remainderRadius⁻¹ : ℝ)‖ < dominantRadius⁻¹ := by
    rw [Real.norm_eq_abs, abs_of_pos (inv_pos.mpr hRemainderRadius)]
    exact (inv_lt_inv₀ hRemainderRadius hDominantRadius).2 hRadius
  have hexponential :
      (fun n : ℕ =>
        (n : ℝ) ^ remainderDegree * remainderRadius⁻¹ ^ n) =o[atTop]
      (fun n : ℕ => dominantRadius⁻¹ ^ n) :=
    isLittleO_pow_const_mul_const_pow_const_pow_of_norm_lt
      remainderDegree hInverse
  have hscaled :=
    hexponential.const_mul_left remainderConstant
  have hdominant :=
    pureExponential_isBigO_coefficientModel
      dominantDegree hDominantConstant hDominantRadius
  apply (hscaled.trans_isBigO hdominant).congr_left
  intro n
  unfold coefficientModel
  rw [div_eq_mul_inv]
  ring

/-- Any sequence with a coefficient-model big-O estimate at a larger radius
is little-o of the dominant coefficient model. -/
theorem isLittleO_coefficientModel_of_isBigO_larger_radius
    {sequence : ℕ → ℝ}
    {remainderConstant dominantConstant remainderRadius dominantRadius : ℝ}
    (remainderDegree dominantDegree : ℕ)
    (hDominantConstant : dominantConstant ≠ 0)
    (hDominantRadius : 0 < dominantRadius)
    (hRadius : dominantRadius < remainderRadius)
    (hSequence :
      sequence =O[atTop]
        coefficientModel remainderConstant remainderDegree remainderRadius) :
    sequence =o[atTop]
      coefficientModel dominantConstant dominantDegree dominantRadius :=
  hSequence.trans_isLittleO
    (coefficientModel_isLittleO_of_radius_lt
      remainderDegree dominantDegree hDominantConstant
      hDominantRadius hRadius)

/-- At a common positive radius, a strictly smaller polynomial degree is
negligible.  This handles the lower-order terms in a principal part at the
dominant pole. -/
theorem coefficientModel_isLittleO_of_degree_lt
    {remainderConstant dominantConstant radius : ℝ}
    {remainderDegree dominantDegree : ℕ}
    (hDegree : remainderDegree < dominantDegree)
    (hDominantConstant : dominantConstant ≠ 0)
    (hRadius : 0 < radius) :
    coefficientModel remainderConstant remainderDegree radius =o[atTop]
      coefficientModel dominantConstant dominantDegree radius := by
  have hpolynomial :
      (fun n : ℕ => (n : ℝ) ^ remainderDegree) =o[atTop]
        (fun n : ℕ => (n : ℝ) ^ dominantDegree) :=
    (isLittleO_pow_pow_atTop_of_lt (𝕜 := ℝ) hDegree).comp_tendsto
      tendsto_natCast_atTop_atTop
  have hscaled :=
    (hpolynomial.const_mul_left remainderConstant).const_mul_right
      hDominantConstant
  have hproduct :=
    hscaled.mul_isBigO
      (isBigO_refl (fun n : ℕ => radius⁻¹ ^ n) atTop)
  apply hproduct.congr'
  · filter_upwards [] with n
    unfold coefficientModel
    rw [div_eq_mul_inv, inv_pow]
  · filter_upwards [] with n
    unfold coefficientModel
    rw [div_eq_mul_inv, inv_pow]

theorem isLittleO_coefficientModel_of_isBigO_lower_degree
    {sequence : ℕ → ℝ}
    {remainderConstant dominantConstant radius : ℝ}
    {remainderDegree dominantDegree : ℕ}
    (hDegree : remainderDegree < dominantDegree)
    (hDominantConstant : dominantConstant ≠ 0)
    (hRadius : 0 < radius)
    (hSequence :
      sequence =O[atTop]
        coefficientModel remainderConstant remainderDegree radius) :
    sequence =o[atTop]
      coefficientModel dominantConstant dominantDegree radius :=
  hSequence.trans_isLittleO
    (coefficientModel_isLittleO_of_degree_lt
      hDegree hDominantConstant hRadius)

/-- Practical rational-series interface: an exact principal-part
decomposition plus any coefficient big-O bound at a strictly larger radius
implies the desired dominant-pole asymptotic. -/
theorem coeff_isEquivalent_of_principal_part_and_larger_radius_bound
    (series : PowerSeries ℝ) (numerator : Polynomial ℝ)
    (dominantDegree remainderDegree : ℕ)
    {dominantRadius remainderRadius remainderConstant : ℝ}
    (remainder : PowerSeries ℝ)
    (hDominantRadius : 0 < dominantRadius)
    (hRadius : dominantRadius < remainderRadius)
    (hEval : numerator.eval dominantRadius ≠ 0)
    (hDecomposition :
      series =
        polynomialPoleSeries numerator dominantDegree dominantRadius +
          remainder)
    (hRemainder :
      (fun n : ℕ => PowerSeries.coeff n remainder) =O[atTop]
        coefficientModel
          remainderConstant remainderDegree remainderRadius) :
    (fun n : ℕ => PowerSeries.coeff n series) ~[atTop]
      coefficientModel
        (numerator.eval dominantRadius *
          (dominantDegree.factorial : ℝ)⁻¹)
        dominantDegree dominantRadius := by
  have hDominantConstant :
      numerator.eval dominantRadius *
          (dominantDegree.factorial : ℝ)⁻¹ ≠ 0 :=
    mul_ne_zero hEval
      (inv_ne_zero (Nat.cast_ne_zero.mpr
        (Nat.factorial_ne_zero dominantDegree)))
  have hRemainderLittleO :=
    isLittleO_coefficientModel_of_isBigO_larger_radius
      remainderDegree dominantDegree hDominantConstant
      hDominantRadius hRadius hRemainder
  exact coeff_isEquivalent_of_principal_part
    series numerator dominantDegree remainder
    hDominantRadius hEval hDecomposition hRemainderLittleO

/-- Companion transfer interface for a remainder with one fewer power of the
index at the same exponential radius. -/
theorem coeff_isEquivalent_of_principal_part_and_lower_degree_bound
    (series : PowerSeries ℝ) (numerator : Polynomial ℝ)
    (dominantDegree remainderDegree : ℕ)
    {dominantRadius remainderConstant : ℝ}
    (remainder : PowerSeries ℝ)
    (hDominantRadius : 0 < dominantRadius)
    (hDegree : remainderDegree < dominantDegree)
    (hEval : numerator.eval dominantRadius ≠ 0)
    (hDecomposition :
      series =
        polynomialPoleSeries numerator dominantDegree dominantRadius +
          remainder)
    (hRemainder :
      (fun n : ℕ => PowerSeries.coeff n remainder) =O[atTop]
        coefficientModel
          remainderConstant remainderDegree dominantRadius) :
    (fun n : ℕ => PowerSeries.coeff n series) ~[atTop]
      coefficientModel
        (numerator.eval dominantRadius *
          (dominantDegree.factorial : ℝ)⁻¹)
        dominantDegree dominantRadius := by
  have hDominantConstant :
      numerator.eval dominantRadius *
          (dominantDegree.factorial : ℝ)⁻¹ ≠ 0 :=
    mul_ne_zero hEval
      (inv_ne_zero (Nat.cast_ne_zero.mpr
        (Nat.factorial_ne_zero dominantDegree)))
  have hRemainderLittleO :=
    isLittleO_coefficientModel_of_isBigO_lower_degree
      hDegree hDominantConstant hDominantRadius hRemainder
  exact coeff_isEquivalent_of_principal_part
    series numerator dominantDegree remainder
    hDominantRadius hEval hDecomposition hRemainderLittleO

end FixedPerimeter
