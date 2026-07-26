import FixedPerimeter.AnalyticFormalInverse
import Mathlib.Analysis.SpecificLimits.Basic

/-!
# Coefficient bounds under convolution

The analytic cofactor has coefficients controlled at a radius strictly larger
than the dominant pole.  This file begins the final transfer step by showing
that convolution with one geometric pole moves that bound to the dominant
radius without losing an exponential factor.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

theorem sum_range_pow_le_inv_one_sub
    {ratio : ℝ} (hRatioNonneg : 0 ≤ ratio) (hRatioOne : ratio < 1)
    (count : ℕ) :
    (∑ index ∈ Finset.range count, ratio ^ index) ≤
      (1 - ratio)⁻¹ := by
  calc
    (∑ index ∈ Finset.range count, ratio ^ index) ≤
        ∑' index : ℕ, ratio ^ index :=
      (summable_geometric_of_lt_one hRatioNonneg hRatioOne).sum_le_tsum
        (Finset.range count)
        (fun index _ => pow_nonneg hRatioNonneg index)
    _ = (1 - ratio)⁻¹ :=
      tsum_geometric_of_lt_one hRatioNonneg hRatioOne

theorem inv_pow_mul_div_pow_eq
    {inner outer constant : ℝ} {index n : ℕ}
    (hInner : inner ≠ 0) (hOuter : outer ≠ 0)
    (hIndex : index ≤ n) :
    inner⁻¹ ^ index * (constant / outer ^ (n - index)) =
      constant / inner ^ n *
        (inner / outer) ^ (n - index) := by
  have hpow :
      inner ^ n = inner ^ index * inner ^ (n - index) := by
    rw [← pow_add, Nat.add_sub_of_le hIndex]
  rw [inv_pow, div_eq_mul_inv, div_pow, hpow]
  field_simp [hInner, hOuter]

/-- Convolution with `(1-X/inner)⁻¹` preserves a pure exponential bound when
the other factor is controlled at a strictly larger radius. -/
theorem geometric_convolution_bound_of_radius_lt
    (sequence : ℕ → ℝ)
    {inner outer constant : ℝ}
    (hInner : 0 < inner) (hInnerOuter : inner < outer)
    (hConstant : 0 < constant)
    (hSequence :
      ∀ n : ℕ, |sequence n| ≤ constant / outer ^ n) :
    ∀ n : ℕ,
      |∑ index ∈ Finset.range (n + 1),
          inner⁻¹ ^ index * sequence (n - index)| ≤
        (constant * (1 - inner / outer)⁻¹) / inner ^ n := by
  have hOuter : 0 < outer := hInner.trans hInnerOuter
  have hRatioNonneg : 0 ≤ inner / outer :=
    (div_pos hInner hOuter).le
  have hRatioOne : inner / outer < 1 :=
    (div_lt_one hOuter).2 hInnerOuter
  intro n
  calc
    |∑ index ∈ Finset.range (n + 1),
        inner⁻¹ ^ index * sequence (n - index)| ≤
        ∑ index ∈ Finset.range (n + 1),
          |inner⁻¹ ^ index * sequence (n - index)| :=
      Finset.abs_sum_le_sum_abs _ _
    _ ≤ ∑ index ∈ Finset.range (n + 1),
          constant / inner ^ n *
            (inner / outer) ^ (n - index) := by
      apply Finset.sum_le_sum
      intro index hindex
      have hIndex : index ≤ n := by
        simpa only [Finset.mem_range] using
          Nat.le_of_lt_succ (Finset.mem_range.mp hindex)
      rw [abs_mul, abs_pow, abs_of_pos (inv_pos.mpr hInner)]
      exact mul_le_mul_of_nonneg_left
        (hSequence (n - index))
        (pow_nonneg (inv_pos.mpr hInner).le index)
        |>.trans_eq
          (inv_pow_mul_div_pow_eq hInner.ne' hOuter.ne' hIndex)
    _ = constant / inner ^ n *
        (∑ index ∈ Finset.range (n + 1),
          (inner / outer) ^ (n - index)) := by
      rw [Finset.mul_sum]
    _ = constant / inner ^ n *
        (∑ index ∈ Finset.range (n + 1),
          (inner / outer) ^ index) := by
      congr 1
      simpa using
        (Finset.sum_range_reflect
          (fun index => (inner / outer) ^ index) (n + 1))
    _ ≤ constant / inner ^ n *
        (1 - inner / outer)⁻¹ := by
      exact mul_le_mul_of_nonneg_left
        (sum_range_pow_le_inv_one_sub
          hRatioNonneg hRatioOne (n + 1))
        (div_nonneg hConstant.le (pow_nonneg hInner.le n))
    _ = (constant * (1 - inner / outer)⁻¹) /
        inner ^ n := by ring

/-- Convolution with one additional dominant geometric pole raises the
polynomial degree in the coefficient bound by one. -/
theorem geometric_convolution_polynomial_bound
    (sequence : ℕ → ℝ) (degree : ℕ)
    {radius constant : ℝ}
    (hRadius : 0 < radius) (hConstant : 0 < constant)
    (hSequence :
      ∀ n : ℕ,
        |sequence n| ≤
          constant * (n + 1 : ℕ) ^ degree / radius ^ n) :
    ∀ n : ℕ,
      |∑ index ∈ Finset.range (n + 1),
          radius⁻¹ ^ index * sequence (n - index)| ≤
        constant * (n + 1 : ℕ) ^ (degree + 1) /
          radius ^ n := by
  intro n
  calc
    |∑ index ∈ Finset.range (n + 1),
        radius⁻¹ ^ index * sequence (n - index)| ≤
        ∑ index ∈ Finset.range (n + 1),
          |radius⁻¹ ^ index * sequence (n - index)| :=
      Finset.abs_sum_le_sum_abs _ _
    _ ≤ ∑ index ∈ Finset.range (n + 1),
          constant * (n + 1 : ℕ) ^ degree / radius ^ n := by
      apply Finset.sum_le_sum
      intro index hindex
      have hIndex : index ≤ n := by
        simpa only [Finset.mem_range] using
          Nat.le_of_lt_succ (Finset.mem_range.mp hindex)
      have hpow :
          radius ^ n =
            radius ^ index * radius ^ (n - index) := by
        rw [← pow_add, Nat.add_sub_of_le hIndex]
      rw [abs_mul, abs_pow, abs_of_pos (inv_pos.mpr hRadius)]
      calc
        radius⁻¹ ^ index * |sequence (n - index)| ≤
            radius⁻¹ ^ index *
              (constant * (n - index + 1 : ℕ) ^ degree /
                radius ^ (n - index)) :=
          mul_le_mul_of_nonneg_left
            (hSequence (n - index))
            (pow_nonneg (inv_pos.mpr hRadius).le index)
        _ = constant * (n - index + 1 : ℕ) ^ degree /
              radius ^ n := by
          rw [inv_pow, hpow]
          field_simp [hRadius.ne']
        _ ≤ constant * (n + 1 : ℕ) ^ degree /
              radius ^ n := by
          apply div_le_div_of_nonneg_right _ (pow_nonneg hRadius.le n)
          apply mul_le_mul_of_nonneg_left _ hConstant.le
          have hnat :
              (n - index + 1) ^ degree ≤ (n + 1) ^ degree :=
            Nat.pow_le_pow_left (by omega) degree
          exact_mod_cast hnat
    _ = constant * (n + 1 : ℕ) ^ (degree + 1) /
          radius ^ n := by
      rw [Finset.sum_const, Finset.card_range]
      push_cast
      rw [pow_succ]
      ring

/-- Power-series form of the larger-radius geometric convolution estimate. -/
theorem coeff_geometricPole_mul_bound_of_radius_lt
    (series : PowerSeries ℝ)
    {inner outer constant : ℝ}
    (hInner : 0 < inner) (hInnerOuter : inner < outer)
    (hConstant : 0 < constant)
    (hSeries :
      ∀ n : ℕ,
        |PowerSeries.coeff n series| ≤
          constant / outer ^ n) :
    ∀ n : ℕ,
      |PowerSeries.coeff n
          (purePoleSeries 0 inner * series)| ≤
        (constant * (1 - inner / outer)⁻¹) /
          inner ^ n := by
  intro n
  rw [PowerSeries.coeff_mul]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ
    (fun first second =>
      PowerSeries.coeff first (purePoleSeries 0 inner) *
        PowerSeries.coeff second series) n]
  simp only [coeff_purePoleSeries, Nat.add_zero,
    Nat.choose_zero_right, Nat.cast_one, one_mul]
  exact geometric_convolution_bound_of_radius_lt
    (fun index => PowerSeries.coeff index series)
    hInner hInnerOuter hConstant hSeries n

theorem purePoleSeries_succ
    (degree : ℕ) (radius : ℝ) :
    purePoleSeries (degree + 1) radius =
      purePoleSeries 0 radius *
        purePoleSeries degree radius := by
  unfold purePoleSeries
  rw [show degree + 1 + 1 = 1 + (degree + 1) by omega]
  rw [PowerSeries.invOneSubPow_add]
  simp only [Units.val_mul]
  rw [map_mul]

theorem coeff_geometricPole_mul_polynomial_bound
    (series : PowerSeries ℝ) (degree : ℕ)
    {radius constant : ℝ}
    (hRadius : 0 < radius) (hConstant : 0 < constant)
    (hSeries :
      ∀ n : ℕ,
        |PowerSeries.coeff n series| ≤
          constant * (n + 1 : ℕ) ^ degree /
            radius ^ n) :
    ∀ n : ℕ,
      |PowerSeries.coeff n
          (purePoleSeries 0 radius * series)| ≤
        constant * (n + 1 : ℕ) ^ (degree + 1) /
          radius ^ n := by
  intro n
  rw [PowerSeries.coeff_mul]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ
    (fun first second =>
      PowerSeries.coeff first (purePoleSeries 0 radius) *
        PowerSeries.coeff second series) n]
  simp only [coeff_purePoleSeries, Nat.add_zero,
    Nat.choose_zero_right, Nat.cast_one, one_mul]
  exact geometric_convolution_polynomial_bound
    (fun index => PowerSeries.coeff index series)
    degree hRadius hConstant hSeries n

/-- A pole of order `degree + 1` convolved with a series analytic at a
strictly larger radius has the expected `n^degree inner⁻ⁿ` bound. -/
theorem exists_coeff_purePole_mul_bound_of_radius_lt
    (series : PowerSeries ℝ) (degree : ℕ)
    {inner outer constant : ℝ}
    (hInner : 0 < inner) (hInnerOuter : inner < outer)
    (hConstant : 0 < constant)
    (hSeries :
      ∀ n : ℕ,
        |PowerSeries.coeff n series| ≤
          constant / outer ^ n) :
    ∃ boundConstant : ℝ, 0 < boundConstant ∧
      ∀ n : ℕ,
        |PowerSeries.coeff n
            (purePoleSeries degree inner * series)| ≤
          boundConstant * (n + 1 : ℕ) ^ degree /
            inner ^ n := by
  induction degree with
  | zero =>
      let boundConstant :=
        constant * (1 - inner / outer)⁻¹
      have hratio : inner / outer < 1 := by
        exact (div_lt_one (hInner.trans hInnerOuter)).2 hInnerOuter
      have hboundConstant : 0 < boundConstant := by
        dsimp [boundConstant]
        exact mul_pos hConstant
          (inv_pos.mpr (sub_pos.mpr hratio))
      refine ⟨boundConstant, hboundConstant, ?_⟩
      intro n
      simpa [boundConstant] using
        coeff_geometricPole_mul_bound_of_radius_lt
          series hInner hInnerOuter hConstant hSeries n
  | succ degree ih =>
      rcases ih with
        ⟨boundConstant, hboundConstant, hbound⟩
      refine ⟨boundConstant, hboundConstant, ?_⟩
      intro n
      rw [purePoleSeries_succ, mul_assoc]
      exact coeff_geometricPole_mul_polynomial_bound
        (purePoleSeries degree inner * series)
        degree hInner hboundConstant hbound n

/-- Convert the convenient pointwise `(n+1)^d` estimate into the library's
`coefficientModel`, which uses `n^d`. -/
theorem exists_isBigO_coefficientModel_of_shifted_bound
    (sequence : ℕ → ℝ) (degree : ℕ)
    {radius constant : ℝ}
    (hRadius : 0 < radius) (hConstant : 0 < constant)
    (hSequence :
      ∀ n : ℕ,
        |sequence n| ≤
          constant * (n + 1 : ℕ) ^ degree / radius ^ n) :
    ∃ modelConstant : ℝ, 0 < modelConstant ∧
      sequence =O[atTop]
        coefficientModel modelConstant degree radius := by
  let modelConstant : ℝ := constant * 2 ^ degree
  have hModelConstant : 0 < modelConstant := by
    dsimp [modelConstant]
    positivity
  refine ⟨modelConstant, hModelConstant, IsBigO.of_bound 1 ?_⟩
  filter_upwards [eventually_ge_atTop 1] with n hn
  rw [Real.norm_eq_abs, Real.norm_eq_abs]
  have hmodelNonneg :
      0 ≤ coefficientModel modelConstant degree radius n := by
    unfold coefficientModel
    positivity
  rw [abs_of_nonneg hmodelNonneg, one_mul]
  apply (hSequence n).trans
  have hnCast : (1 : ℝ) ≤ n := by exact_mod_cast hn
  have hbase : (n + 1 : ℝ) ≤ 2 * n := by linarith
  have hpow :
      (n + 1 : ℝ) ^ degree ≤ (2 * n) ^ degree :=
    pow_le_pow_left₀ (by positivity) hbase degree
  unfold coefficientModel modelConstant
  push_cast
  have hpow' :
      (n + 1 : ℝ) ^ degree ≤
        2 ^ degree * (n : ℝ) ^ degree := by
    simpa [mul_pow] using hpow
  have hscaled :
      constant * (n + 1 : ℝ) ^ degree ≤
        constant * 2 ^ degree * (n : ℝ) ^ degree := by
    simpa [mul_assoc] using
      (mul_le_mul_of_nonneg_left hpow' hConstant.le)
  exact div_le_div_of_nonneg_right hscaled
    (pow_nonneg hRadius.le n)

/-- Multiplying an exponentially bounded series by a polynomial preserves
the same radius.  The constant is enlarged by the finite weighted support of
the polynomial. -/
theorem exists_polynomial_mul_coeff_bound
    (polynomial : Polynomial ℝ) (series : PowerSeries ℝ)
    {radius constant : ℝ}
    (hRadius : 0 < radius) (hConstant : 0 < constant)
    (hSeries :
      ∀ n : ℕ,
        |PowerSeries.coeff n series| ≤
          constant / radius ^ n) :
    ∃ boundConstant : ℝ, 0 < boundConstant ∧
      ∀ n : ℕ,
        |PowerSeries.coeff n
            ((polynomial : PowerSeries ℝ) * series)| ≤
          boundConstant / radius ^ n := by
  let supportWeight : ℝ :=
    ∑ index ∈ polynomial.support,
      |polynomial.coeff index| * radius ^ index
  let boundConstant : ℝ :=
    constant * (supportWeight + 1)
  have hSupportWeight : 0 ≤ supportWeight := by
    dsimp [supportWeight]
    positivity
  have hBoundConstant : 0 < boundConstant := by
    dsimp [boundConstant]
    exact mul_pos hConstant (by linarith)
  refine ⟨boundConstant, hBoundConstant, ?_⟩
  intro n
  rw [PowerSeries.coeff_mul]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ
    (fun first second =>
      PowerSeries.coeff first
          (polynomial : PowerSeries ℝ) *
        PowerSeries.coeff second series) n]
  simp only [Polynomial.coeff_coe]
  let active :=
    (Finset.range (n + 1)).filter
      (fun index => index ∈ polynomial.support)
  have hsumActive :
      (∑ index ∈ Finset.range (n + 1),
          |polynomial.coeff index *
            PowerSeries.coeff (n - index) series|) =
        ∑ index ∈ active,
          |polynomial.coeff index *
            PowerSeries.coeff (n - index) series| := by
    rw [Finset.sum_filter]
    apply Finset.sum_congr rfl
    intro index hindex
    by_cases hsupport : index ∈ polynomial.support
    · simp [active, hsupport]
    · have hcoeff : polynomial.coeff index = 0 := by
        simpa [Polynomial.mem_support_iff] using hsupport
      simp [active, hsupport, hcoeff]
  calc
    |∑ index ∈ Finset.range (n + 1),
        polynomial.coeff index *
          PowerSeries.coeff (n - index) series| ≤
        ∑ index ∈ Finset.range (n + 1),
          |polynomial.coeff index *
            PowerSeries.coeff (n - index) series| :=
      Finset.abs_sum_le_sum_abs _ _
    _ = ∑ index ∈ active,
          |polynomial.coeff index *
            PowerSeries.coeff (n - index) series| :=
      hsumActive
    _ ≤ ∑ index ∈ active,
          constant / radius ^ n *
            (|polynomial.coeff index| * radius ^ index) := by
      apply Finset.sum_le_sum
      intro index hindex
      have hRange :
          index ∈ Finset.range (n + 1) :=
        (Finset.mem_filter.mp hindex).1
      have hIndex : index ≤ n := by
        exact Nat.le_of_lt_succ (Finset.mem_range.mp hRange)
      have hpow :
          radius ^ n =
            radius ^ index * radius ^ (n - index) := by
        rw [← pow_add, Nat.add_sub_of_le hIndex]
      rw [abs_mul]
      calc
        |polynomial.coeff index| *
            |PowerSeries.coeff (n - index) series| ≤
          |polynomial.coeff index| *
            (constant / radius ^ (n - index)) :=
          mul_le_mul_of_nonneg_left
            (hSeries (n - index)) (abs_nonneg _)
        _ = constant / radius ^ n *
            (|polynomial.coeff index| * radius ^ index) := by
          rw [hpow]
          field_simp [hRadius.ne']
    _ ≤ ∑ index ∈ polynomial.support,
          constant / radius ^ n *
            (|polynomial.coeff index| * radius ^ index) := by
      apply Finset.sum_le_sum_of_subset_of_nonneg
      · intro index hindex
        exact (Finset.mem_filter.mp hindex).2
      · intro index _ _
        positivity
    _ = constant / radius ^ n * supportWeight := by
      dsimp [supportWeight]
      rw [Finset.mul_sum]
    _ ≤ boundConstant / radius ^ n := by
      dsimp [boundConstant]
      have hdenom : 0 < radius ^ n := pow_pos hRadius n
      rw [div_eq_mul_inv, div_eq_mul_inv]
      nlinarith [inv_pos.mpr hdenom]

end FixedPerimeter
