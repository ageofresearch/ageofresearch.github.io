import FixedPerimeter.AnalyticCoefficientBounds
import FixedPerimeter.AnalyticRootGap
import Mathlib.Analysis.Calculus.Deriv.Polynomial
import Mathlib.Analysis.Complex.CauchyIntegral

/-!
# Analytic inverse series inside a root-free disk

A complex polynomial with no zero in a closed disk has a differentiable
reciprocal there.  Cauchy's theorem therefore supplies a power series whose
radius reaches that disk.  This converts the spectral root gaps into the
analytic-radius certificates consumed by the coefficient-bound layer.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Metric Polynomial
open Asymptotics Filter
open scoped ENNReal NNReal

theorem polynomialInverse_hasFPowerSeriesOnBall
    (polynomial : Polynomial ℂ) (radius rootBound : ℝ≥0)
    (hRadiusPos : 0 < radius)
    (hRadiusBound : radius < rootBound)
    (hRoots :
      ∀ {z : ℂ}, polynomial.IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ expansion : FormalMultilinearSeries ℂ ℂ ℂ,
      HasFPowerSeriesOnBall
        (fun z : ℂ => (polynomial.eval z)⁻¹)
        expansion 0 radius := by
  have hnonzero :
      ∀ z ∈ closedBall (0 : ℂ) (radius : ℝ),
        polynomial.eval z ≠ 0 := by
    intro z hz hzero
    have hroot : polynomial.IsRoot z := hzero
    have hlower := hRoots hroot
    have hupper : ‖z‖ ≤ (radius : ℝ) := by
      simpa [mem_closedBall] using hz
    have hstrict : (radius : ℝ) < (rootBound : ℝ) := by
      exact_mod_cast hRadiusBound
    linarith
  have hdifferentiable :
      DifferentiableOn ℂ
        (fun z : ℂ => (polynomial.eval z)⁻¹)
        (closedBall (0 : ℂ) (radius : ℝ)) :=
    polynomial.differentiableOn.inv hnonzero
  exact
    ⟨cauchyPowerSeries
        (fun z : ℂ => (polynomial.eval z)⁻¹) 0 radius,
      hdifferentiable.hasFPowerSeriesOnBall hRadiusPos⟩

theorem polynomialInverse_expansion_radius
    (polynomial : Polynomial ℂ) (radius rootBound : ℝ≥0)
    (hRadiusPos : 0 < radius)
    (hRadiusBound : radius < rootBound)
    (hRoots :
      ∀ {z : ℂ}, polynomial.IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ expansion : FormalMultilinearSeries ℂ ℂ ℂ,
      (radius : ℝ≥0∞) ≤ expansion.radius ∧
        HasFPowerSeriesOnBall
          (fun z : ℂ => (polynomial.eval z)⁻¹)
          expansion 0 radius := by
  rcases polynomialInverse_hasFPowerSeriesOnBall
      polynomial radius rootBound hRadiusPos hRadiusBound hRoots with
    ⟨expansion, hexpansion⟩
  exact ⟨expansion, hexpansion.r_le, hexpansion⟩

/-- Cauchy's expansion on an outer root-free disk gives an exponential
coefficient bound at every strictly smaller positive radius. -/
theorem polynomialInverse_expansion_coeff_bound
    (polynomial : Polynomial ℂ)
    (innerRadius outerRadius rootBound : ℝ≥0)
    (hInnerPos : 0 < innerRadius)
    (hInnerOuter : innerRadius < outerRadius)
    (hOuterRoot : outerRadius < rootBound)
    (hRoots :
      ∀ {z : ℂ}, polynomial.IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ expansion : FormalMultilinearSeries ℂ ℂ ℂ,
      ∃ constant : ℝ,
        HasFPowerSeriesOnBall
            (fun z : ℂ => (polynomial.eval z)⁻¹)
            expansion 0 outerRadius ∧
          0 < constant ∧
          (fun n => ‖expansion.coeff n‖) =O[atTop]
            coefficientModel constant 0 (innerRadius : ℝ) := by
  rcases polynomialInverse_hasFPowerSeriesOnBall
      polynomial outerRadius rootBound
      (hInnerPos.trans hInnerOuter) hOuterRoot hRoots with
    ⟨expansion, hexpansion⟩
  have hinner :
      (innerRadius : ℝ≥0∞) < expansion.radius := by
    exact
      (ENNReal.coe_lt_coe.mpr hInnerOuter).trans_le
        hexpansion.r_le
  have hscalar :=
    formalMultilinearSeries_eq_ofScalars_coeff expansion
  have hbound :
      ∃ constant : ℝ, 0 < constant ∧
        (fun n => ‖expansion.coeff n‖) =O[atTop]
          coefficientModel constant 0 (innerRadius : ℝ) := by
    apply complexCoefficientNorm_isBigO_of_lt_radius
      (fun n => expansion.coeff n) innerRadius hInnerPos
    rw [← hscalar]
    exact hinner
  rcases hbound with ⟨constant, hconstant, hbound⟩
  exact ⟨expansion, constant, hexpansion, hconstant, hbound⟩

end FixedPerimeter
