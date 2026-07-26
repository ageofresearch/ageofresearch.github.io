import FixedPerimeter.SimpleRoots
import Mathlib.Analysis.Asymptotics.AsymptoticEquivalent
import Mathlib.Analysis.SpecificLimits.Basic
import Mathlib.Tactic.FieldSimp

/-!
# Comparing two coefficient asymptotics

This file separates the final limit argument from coefficient extraction.  Once
the two counting sequences have the expected positive single-pole asymptotics,
the strict root inequality makes their quotient a decaying geometric sequence.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter
open scoped Topology

/-- Standard coefficient model for a pole of order `j+1`. -/
noncomputable def coefficientModel
    (constant : ℝ) (j : ℕ) (radius : ℝ) (n : ℕ) : ℝ :=
  constant * (n : ℝ) ^ j / radius ^ n

theorem coefficientModel_ratio_eventually
    {outerConstant innerConstant outerRadius innerRadius : ℝ}
    (j : ℕ)
    (hOuterConstant : outerConstant ≠ 0)
    (hInnerConstant : innerConstant ≠ 0)
    (hOuterRadius : outerRadius ≠ 0)
    (hInnerRadius : innerRadius ≠ 0) :
    (fun n : ℕ =>
      coefficientModel outerConstant j outerRadius n /
        coefficientModel innerConstant j innerRadius n) =ᶠ[atTop]
      (fun n : ℕ =>
        (outerConstant / innerConstant) *
          (innerRadius / outerRadius) ^ n) := by
  filter_upwards [eventually_ge_atTop 1] with n hn
  have hnNe : (n : ℝ) ≠ 0 := by
    exact_mod_cast (by omega : n ≠ 0)
  have hnPowNe : (n : ℝ) ^ j ≠ 0 := pow_ne_zero _ hnNe
  have hOuterPowNe : outerRadius ^ n ≠ 0 :=
    pow_ne_zero _ hOuterRadius
  have hInnerPowNe : innerRadius ^ n ≠ 0 :=
    pow_ne_zero _ hInnerRadius
  unfold coefficientModel
  rw [div_pow]
  field_simp

theorem ratio_tendsto_zero_of_isEquivalent
    {outer inner : ℕ → ℝ}
    {outerConstant innerConstant outerRadius innerRadius : ℝ}
    (j : ℕ)
    (hOuterConstant : outerConstant ≠ 0)
    (hInnerConstant : innerConstant ≠ 0)
    (hInnerRadiusPos : 0 < innerRadius)
    (hRadius : innerRadius < outerRadius)
    (hOuter :
      outer ~[atTop]
        coefficientModel outerConstant j outerRadius)
    (hInner :
      inner ~[atTop]
        coefficientModel innerConstant j innerRadius) :
    Tendsto (fun n => outer n / inner n) atTop (𝓝 0) := by
  have hOuterRadiusPos : 0 < outerRadius :=
    lt_trans hInnerRadiusPos hRadius
  have hbaseNonneg : 0 ≤ innerRadius / outerRadius := by positivity
  have hbaseLtOne : innerRadius / outerRadius < 1 :=
    (div_lt_one hOuterRadiusPos).2 hRadius
  have hgeom :
      Tendsto (fun n : ℕ => (innerRadius / outerRadius) ^ n)
        atTop (𝓝 0) :=
    tendsto_pow_atTop_nhds_zero_of_lt_one hbaseNonneg hbaseLtOne
  have hcomparison :
      Tendsto
        (fun n : ℕ =>
          (outerConstant / innerConstant) *
            (innerRadius / outerRadius) ^ n)
        atTop (𝓝 0) := by
    simpa using (tendsto_const_nhds.mul hgeom)
  have hmodelRatio :
      Tendsto
        (fun n : ℕ =>
          coefficientModel outerConstant j outerRadius n /
            coefficientModel innerConstant j innerRadius n)
        atTop (𝓝 0) := by
    apply (tendsto_congr'
      (coefficientModel_ratio_eventually j hOuterConstant hInnerConstant
        hOuterRadiusPos.ne' hInnerRadiusPos.ne')).mpr
    exact hcomparison
  have hEquivalent := hOuter.div hInner
  rcases hEquivalent.exists_eq_mul with ⟨scale, hscale, hfactor⟩
  have hscaled :
      Tendsto
        (scale *
          (fun n : ℕ =>
            coefficientModel outerConstant j outerRadius n /
              coefficientModel innerConstant j innerRadius n))
        atTop (𝓝 0) := by
    change Tendsto
      (fun n : ℕ =>
        scale n *
          (coefficientModel outerConstant j outerRadius n /
            coefficientModel innerConstant j innerRadius n))
      atTop (𝓝 0)
    simpa only [one_mul] using hscale.mul hmodelRatio
  exact (tendsto_congr' hfactor).mpr hscaled

theorem eventually_lt_of_ratio_tendsto_zero
    {outer inner : ℕ → ℝ}
    (hRatio :
      Tendsto (fun n => outer n / inner n) atTop (𝓝 0))
    (hInnerPos : ∀ᶠ n in atTop, 0 < inner n) :
    ∀ᶠ n in atTop, outer n < inner n := by
  have hRatioLtOne :
      ∀ᶠ n in atTop, outer n / inner n < 1 :=
    (tendsto_order.1 hRatio).2 1 zero_lt_one
  filter_upwards [hRatioLtOne, hInnerPos] with n hlt hpos
  exact (div_lt_one hpos).mp hlt

theorem eventually_nat_strict_of_ratio_tendsto_zero
    {outer inner : ℕ → ℕ}
    (hRatio :
      Tendsto
        (fun n => (outer n : ℝ) / (inner n : ℝ))
        atTop (𝓝 0))
    (hInnerPos : ∀ᶠ n in atTop, 0 < inner n) :
    ∃ threshold : ℕ, ∀ n ≥ threshold, outer n < inner n := by
  have hInnerRealPos :
      ∀ᶠ n in atTop, (0 : ℝ) < (inner n : ℝ) := by
    filter_upwards [hInnerPos] with n hn
    exact_mod_cast hn
  have hRealLt :
      ∀ᶠ n in atTop, (outer n : ℝ) < (inner n : ℝ) :=
    eventually_lt_of_ratio_tendsto_zero hRatio hInnerRealPos
  have hNatLt : ∀ᶠ n in atTop, outer n < inner n := by
    filter_upwards [hRealLt] with n hn
    exact_mod_cast hn
  exact (eventually_atTop.1 hNatLt)

theorem coefficientModel_eventually_pos
    {constant radius : ℝ} (j : ℕ)
    (hConstant : 0 < constant) (hRadius : 0 < radius) :
    ∀ᶠ n : ℕ in atTop, 0 < coefficientModel constant j radius n := by
  filter_upwards [eventually_ge_atTop 1] with n hn
  unfold coefficientModel
  have hnPos : (0 : ℝ) < n := by exact_mod_cast hn
  exact div_pos (mul_pos hConstant (pow_pos hnPos _))
    (pow_pos hRadius _)

theorem eventually_pos_of_isEquivalent_coefficientModel
    {sequence : ℕ → ℝ} {constant radius : ℝ}
    (j : ℕ)
    (hConstant : 0 < constant)
    (hRadius : 0 < radius)
    (hEquivalent :
      sequence ~[atTop] coefficientModel constant j radius) :
    ∀ᶠ n in atTop, 0 < sequence n := by
  rcases hEquivalent.exists_eq_mul with ⟨scale, hscale, hfactor⟩
  have hscalePos : ∀ᶠ n in atTop, 0 < scale n :=
    (tendsto_order.1 hscale).1 0 zero_lt_one
  have hmodelPos :=
    coefficientModel_eventually_pos j hConstant hRadius
  filter_upwards [hfactor, hscalePos, hmodelPos] with n heq hs hm
  rw [heq]
  exact mul_pos hs hm

theorem ratio_zero_and_eventually_strict_of_isEquivalent
    {outer inner : ℕ → ℕ}
    {outerConstant innerConstant outerRadius innerRadius : ℝ}
    (j : ℕ)
    (hOuterConstant : 0 < outerConstant)
    (hInnerConstant : 0 < innerConstant)
    (hInnerRadius : 0 < innerRadius)
    (hRadius : innerRadius < outerRadius)
    (hOuter :
      (fun n => (outer n : ℝ)) ~[atTop]
        coefficientModel outerConstant j outerRadius)
    (hInner :
      (fun n => (inner n : ℝ)) ~[atTop]
        coefficientModel innerConstant j innerRadius) :
    Tendsto
        (fun n => (outer n : ℝ) / (inner n : ℝ))
        atTop (𝓝 0) ∧
      ∃ threshold : ℕ, ∀ n ≥ threshold, outer n < inner n := by
  have hRatio :=
    ratio_tendsto_zero_of_isEquivalent j hOuterConstant.ne'
      hInnerConstant.ne' hInnerRadius hRadius hOuter hInner
  have hInnerRealPos :
      ∀ᶠ n in atTop, (0 : ℝ) < (inner n : ℝ) :=
    eventually_pos_of_isEquivalent_coefficientModel
      j hInnerConstant hInnerRadius hInner
  have hInnerNatPos : ∀ᶠ n in atTop, 0 < inner n := by
    filter_upwards [hInnerRealPos] with n hn
    exact_mod_cast hn
  exact ⟨hRatio,
    eventually_nat_strict_of_ratio_tendsto_zero hRatio hInnerNatPos⟩

end FixedPerimeter
