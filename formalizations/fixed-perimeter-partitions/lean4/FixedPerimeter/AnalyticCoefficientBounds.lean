import FixedPerimeter.RemainderBounds
import Mathlib.Analysis.Analytic.ConvergenceRadius
import Mathlib.Analysis.Analytic.OfScalars

/-!
# From convergence radius to coefficient big-O bounds

This is the analytic bridge needed for the non-dominant rational remainder.
Once its scalar Taylor series is known to converge past a chosen radius, its
coefficients receive the exponential bound expected by the transfer theorem.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter
open scoped ENNReal NNReal

/-- In one scalar variable, a formal multilinear series is completely
determined by its ordinary scalar coefficients. -/
theorem formalMultilinearSeries_eq_ofScalars_coeff
    (series : FormalMultilinearSeries ℂ ℂ ℂ) :
    series =
      FormalMultilinearSeries.ofScalars ℂ
        (fun n => series.coeff n) := by
  ext n
  rw [FormalMultilinearSeries.apply_eq_prod_smul_coeff]
  simp [FormalMultilinearSeries.ofScalars]

theorem coefficientSequence_isBigO_of_lt_radius
    (coefficients : ℕ → ℝ) (radius : ℝ≥0)
    (hRadiusPos : 0 < radius)
    (hRadius :
      (radius : ℝ≥0∞) <
        (FormalMultilinearSeries.ofScalars ℝ coefficients).radius) :
    ∃ constant : ℝ, 0 < constant ∧
      coefficients =O[atTop]
        coefficientModel constant 0 (radius : ℝ) := by
  rcases
      (FormalMultilinearSeries.norm_le_div_pow_of_pos_of_lt_radius
        (FormalMultilinearSeries.ofScalars ℝ coefficients)
        hRadiusPos hRadius) with
    ⟨constant, hConstant, hbound⟩
  refine ⟨constant, hConstant, IsBigO.of_bound 1 ?_⟩
  filter_upwards [] with n
  have hn := hbound n
  rw [FormalMultilinearSeries.ofScalars_norm] at hn
  have hmodelPos :
      0 ≤ coefficientModel constant 0 (radius : ℝ) n := by
    unfold coefficientModel
    positivity
  rw [Real.norm_eq_abs, Real.norm_eq_abs, abs_of_nonneg hmodelPos]
  simp only [one_mul]
  have hmodel :
      coefficientModel constant 0 (radius : ℝ) n =
        constant / (radius : ℝ) ^ n := by
    unfold coefficientModel
    simp
  rw [hmodel]
  exact hn

theorem complexCoefficientNorm_isBigO_of_lt_radius
    (coefficients : ℕ → ℂ) (radius : ℝ≥0)
    (hRadiusPos : 0 < radius)
    (hRadius :
      (radius : ℝ≥0∞) <
        (FormalMultilinearSeries.ofScalars ℂ coefficients).radius) :
    ∃ constant : ℝ, 0 < constant ∧
      (fun n => ‖coefficients n‖) =O[atTop]
        coefficientModel constant 0 (radius : ℝ) := by
  rcases
      (FormalMultilinearSeries.norm_le_div_pow_of_pos_of_lt_radius
        (FormalMultilinearSeries.ofScalars ℂ coefficients)
        hRadiusPos hRadius) with
    ⟨constant, hConstant, hbound⟩
  refine ⟨constant, hConstant, IsBigO.of_bound 1 ?_⟩
  filter_upwards [] with n
  have hn := hbound n
  rw [FormalMultilinearSeries.ofScalars_norm] at hn
  have hmodelPos :
      0 ≤ coefficientModel constant 0 (radius : ℝ) n := by
    unfold coefficientModel
    positivity
  rw [Real.norm_eq_abs, Real.norm_eq_abs,
    abs_of_nonneg (norm_nonneg _), abs_of_nonneg hmodelPos]
  simp only [one_mul]
  have hmodel :
      coefficientModel constant 0 (radius : ℝ) n =
        constant / (radius : ℝ) ^ n := by
    unfold coefficientModel
    simp
  rw [hmodel]
  exact hn

end FixedPerimeter
