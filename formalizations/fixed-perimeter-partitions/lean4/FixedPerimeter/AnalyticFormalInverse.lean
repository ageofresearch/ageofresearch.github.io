import FixedPerimeter.PolynomialInverseAnalytic
import FixedPerimeter.FormalSeries
import Mathlib.Analysis.Calculus.IteratedDeriv.Lemmas

/-!
# Identifying analytic reciprocal coefficients with the formal inverse

This file supplies the algebraic uniqueness bridge between Cauchy's analytic
expansion and `PowerSeries.inv`.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial
open Filter
open scoped ENNReal NNReal Topology

theorem iteratedDeriv_polynomial_eval_zero
    (polynomial : Polynomial ℂ) (n : ℕ) :
    iteratedDeriv n (fun z : ℂ => polynomial.eval z) 0 =
      (n.factorial : ℂ) * polynomial.coeff n := by
  induction n generalizing polynomial with
  | zero =>
      simp only [iteratedDeriv_zero, Nat.factorial_zero,
        Nat.cast_one, one_mul]
      exact (coeff_zero_eq_eval_zero polynomial).symm
  | succ n ih =>
      rw [iteratedDeriv_succ']
      have hderiv :
          deriv (fun z : ℂ => polynomial.eval z) =
            fun z : ℂ => polynomial.derivative.eval z := by
        funext z
        exact polynomial.deriv
      rw [hderiv, ih]
      rw [Polynomial.coeff_derivative]
      rw [Nat.factorial_succ]
      push_cast
      ring

theorem hasFPowerSeriesOnBall_coeff_eq_iteratedDeriv_div_factorial
    {function : ℂ → ℂ}
    {expansion : FormalMultilinearSeries ℂ ℂ ℂ}
    {center : ℂ} {radius : ℝ≥0∞}
    (hexpansion :
      HasFPowerSeriesOnBall function expansion center radius)
    (n : ℕ) :
    expansion.coeff n =
      iteratedDeriv n function center / n.factorial := by
  have hfactorial :=
    hexpansion.factorial_smul (1 : ℂ) n
  simp only [FormalMultilinearSeries.apply_eq_prod_smul_coeff,
    Finset.prod_const, Finset.card_univ, Fintype.card_fin,
    one_pow, one_smul, nsmul_eq_mul] at hfactorial
  have hfactorialNe : (n.factorial : ℂ) ≠ 0 := by
    exact_mod_cast Nat.factorial_ne_zero n
  apply (eq_div_iff hfactorialNe).2
  rw [mul_comm, hfactorial]
  rw [iteratedFDeriv_apply_eq_iteratedDeriv_mul_prod]
  simp

theorem polynomial_mul_analyticReciprocalSeries_eq_one
    (polynomial : Polynomial ℂ)
    (expansion : FormalMultilinearSeries ℂ ℂ ℂ)
    {radius : ℝ≥0∞}
    (hconstant : polynomial.eval 0 ≠ 0)
    (hexpansion :
      HasFPowerSeriesOnBall
        (fun z : ℂ => (polynomial.eval z)⁻¹)
        expansion 0 radius) :
    (polynomial : PowerSeries ℂ) *
        seriesOf (fun n => expansion.coeff n) = 1 := by
  let polynomialFunction : ℂ → ℂ :=
    fun z => polynomial.eval z
  let reciprocalFunction : ℂ → ℂ :=
    fun z => (polynomial.eval z)⁻¹
  have hpolynomialContDiff :
      ∀ n : ℕ, ContDiffAt ℂ n polynomialFunction 0 := by
    intro n
    exact polynomial.differentiable.contDiff.contDiffAt
  have hreciprocalContDiff :
      ∀ n : ℕ, ContDiffAt ℂ n reciprocalFunction 0 := by
    intro n
    exact hexpansion.analyticAt.contDiffAt
  have hnonzero :
      ∀ᶠ z in 𝓝 (0 : ℂ), polynomial.eval z ≠ 0 :=
    polynomial.differentiable.continuous.continuousAt.eventually_ne
      hconstant
  have hproduct :
      polynomialFunction * reciprocalFunction =ᶠ[𝓝 (0 : ℂ)]
        (fun _ => 1) := by
    filter_upwards [hnonzero] with z hz
    simp [polynomialFunction, reciprocalFunction, hz]
  apply PowerSeries.ext
  intro n
  rw [PowerSeries.coeff_mul]
  simp only [Polynomial.coeff_coe, coeff_seriesOf,
    PowerSeries.coeff_one]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ
    (fun first second =>
      polynomial.coeff first * expansion.coeff second) n]
  have hderivativeProduct :
      iteratedDeriv n (polynomialFunction * reciprocalFunction) 0 =
        if n = 0 then 1 else 0 := by
    rw [hproduct.iteratedDeriv_eq n]
    simp [iteratedDeriv_const]
  have hleibniz :=
    iteratedDeriv_mul
      (hpolynomialContDiff n)
      (hreciprocalContDiff n)
  have hreciprocalDerivative :
      ∀ m : ℕ,
        iteratedDeriv m reciprocalFunction 0 =
          (m.factorial : ℂ) * expansion.coeff m := by
    intro m
    have hcoeff :=
      hasFPowerSeriesOnBall_coeff_eq_iteratedDeriv_div_factorial
        hexpansion m
    have hfactorialNe : (m.factorial : ℂ) ≠ 0 := by
      exact_mod_cast Nat.factorial_ne_zero m
    simpa [mul_comm] using
      ((eq_div_iff hfactorialNe).mp hcoeff).symm
  have hscaled :
      (n.factorial : ℂ) *
          (∑ index ∈ Finset.range (n + 1),
            polynomial.coeff index *
              expansion.coeff (n - index)) =
        if n = 0 then 1 else 0 := by
    rw [← hderivativeProduct, hleibniz]
    rw [Finset.mul_sum]
    apply Finset.sum_congr rfl
    intro index hindex
    have hindexLe : index ≤ n := by
      simpa only [Finset.mem_range] using
        Nat.le_of_lt_succ (Finset.mem_range.mp hindex)
    rw [iteratedDeriv_polynomial_eval_zero,
      hreciprocalDerivative]
    change
      (n.factorial : ℂ) *
          (polynomial.coeff index *
            expansion.coeff (n - index)) =
        (n.choose index : ℂ) *
          ((index.factorial : ℂ) * polynomial.coeff index) *
          ((Nat.factorial (n - index) : ℂ) *
            expansion.coeff (n - index))
    have hfactorial :=
      Nat.choose_mul_factorial_mul_factorial hindexLe
    rw [← hfactorial]
    push_cast
    ring
  by_cases hn : n = 0
  · subst n
    simpa using hscaled
  · have hfactorialNe : (n.factorial : ℂ) ≠ 0 := by
      exact_mod_cast Nat.factorial_ne_zero n
    rw [if_neg hn] at hscaled ⊢
    exact (mul_eq_zero.mp hscaled).resolve_left hfactorialNe

theorem analyticReciprocalSeries_eq_powerSeriesInverse
    (polynomial : Polynomial ℂ)
    (expansion : FormalMultilinearSeries ℂ ℂ ℂ)
    {radius : ℝ≥0∞}
    (hconstant : polynomial.eval 0 ≠ 0)
    (hexpansion :
      HasFPowerSeriesOnBall
        (fun z : ℂ => (polynomial.eval z)⁻¹)
        expansion 0 radius) :
    seriesOf (fun n => expansion.coeff n) =
      (polynomial : PowerSeries ℂ)⁻¹ := by
  have hconstantSeries :
      PowerSeries.constantCoeff (polynomial : PowerSeries ℂ) ≠ 0 := by
    rw [← PowerSeries.coeff_zero_eq_constantCoeff_apply,
      Polynomial.coeff_coe, coeff_zero_eq_eval_zero]
    exact hconstant
  apply (PowerSeries.eq_inv_iff_mul_eq_one hconstantSeries).2
  rw [mul_comm]
  exact polynomial_mul_analyticReciprocalSeries_eq_one
    polynomial expansion hconstant hexpansion

theorem powerSeriesInverse_coeff_norm_isBigO_of_root_gap
    (polynomial : Polynomial ℂ)
    (innerRadius outerRadius rootBound : ℝ≥0)
    (hInnerPos : 0 < innerRadius)
    (hInnerOuter : innerRadius < outerRadius)
    (hOuterRoot : outerRadius < rootBound)
    (hconstant : polynomial.eval 0 ≠ 0)
    (hRoots :
      ∀ {z : ℂ}, polynomial.IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ constant : ℝ, 0 < constant ∧
      (fun n =>
        ‖PowerSeries.coeff n
          (polynomial : PowerSeries ℂ)⁻¹‖) =O[atTop]
        coefficientModel constant 0 (innerRadius : ℝ) := by
  rcases polynomialInverse_expansion_coeff_bound
      polynomial innerRadius outerRadius rootBound
      hInnerPos hInnerOuter hOuterRoot hRoots with
    ⟨expansion, constant, hexpansion, hconstantPos, hbound⟩
  have hseries :=
    analyticReciprocalSeries_eq_powerSeriesInverse
      polynomial expansion hconstant hexpansion
  have hcoefficients :
      (fun n => ‖expansion.coeff n‖) =
        (fun n =>
          ‖PowerSeries.coeff n
            (polynomial : PowerSeries ℂ)⁻¹‖) := by
    funext n
    have hcoefficient :=
      congrArg (PowerSeries.coeff n) hseries
    simpa using congrArg norm hcoefficient
  refine ⟨constant, hconstantPos, ?_⟩
  rw [← hcoefficients]
  exact hbound

/-- Pointwise form of the reciprocal coefficient estimate.  Unlike the
asymptotic wrapper above, this keeps Cauchy's bound for every coefficient;
that stronger form is convenient when estimating a full convolution. -/
theorem powerSeriesInverse_coeff_norm_le_of_root_gap
    (polynomial : Polynomial ℂ)
    (innerRadius outerRadius rootBound : ℝ≥0)
    (hInnerPos : 0 < innerRadius)
    (hInnerOuter : innerRadius < outerRadius)
    (hOuterRoot : outerRadius < rootBound)
    (hconstant : polynomial.eval 0 ≠ 0)
    (hRoots :
      ∀ {z : ℂ}, polynomial.IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ constant : ℝ, 0 < constant ∧
      ∀ n : ℕ,
        ‖PowerSeries.coeff n
          (polynomial : PowerSeries ℂ)⁻¹‖ ≤
            constant / (innerRadius : ℝ) ^ n := by
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
  rcases
      (FormalMultilinearSeries.norm_le_div_pow_of_pos_of_lt_radius
        (FormalMultilinearSeries.ofScalars ℂ
          (fun n => expansion.coeff n))
        hInnerPos (by simpa [← hscalar] using hinner)) with
    ⟨constant, hconstantPos, hbound⟩
  have hseries :=
    analyticReciprocalSeries_eq_powerSeriesInverse
      polynomial expansion hconstant hexpansion
  refine ⟨constant, hconstantPos, ?_⟩
  intro n
  have hn := hbound n
  rw [FormalMultilinearSeries.ofScalars_norm] at hn
  have hcoefficient :=
    congrArg (PowerSeries.coeff n) hseries
  have heq :
      PowerSeries.coeff n
          (polynomial : PowerSeries ℂ)⁻¹ =
        expansion.coeff n := by
    simpa using hcoefficient.symm
  rw [heq]
  exact hn

/-- Extension of scalars commutes with formal inversion when the constant
coefficient stays nonzero. -/
theorem map_powerSeries_inv_of_injective
    {K L : Type*} [Field K] [Field L]
    (hom : K →+* L) (hinjective : Function.Injective hom)
    (series : PowerSeries K)
    (hconstant : PowerSeries.constantCoeff series ≠ 0) :
    PowerSeries.map hom series⁻¹ =
      (PowerSeries.map hom series)⁻¹ := by
  have hmapConstant :
      PowerSeries.constantCoeff (PowerSeries.map hom series) ≠ 0 := by
    rw [← PowerSeries.coeff_zero_eq_constantCoeff_apply,
      PowerSeries.coeff_map,
      PowerSeries.coeff_zero_eq_constantCoeff_apply]
    exact fun hzero => hconstant (hinjective (by simpa using hzero))
  apply (PowerSeries.eq_inv_iff_mul_eq_one hmapConstant).2
  rw [← map_mul]
  rw [PowerSeries.inv_mul_cancel series hconstant]
  simp

/-- A complex root gap for a real polynomial yields an all-coefficients
bound for its real formal reciprocal. -/
theorem realPowerSeriesInverse_coeff_abs_le_of_complex_root_gap
    (polynomial : Polynomial ℝ)
    (innerRadius outerRadius rootBound : ℝ≥0)
    (hInnerPos : 0 < innerRadius)
    (hInnerOuter : innerRadius < outerRadius)
    (hOuterRoot : outerRadius < rootBound)
    (hconstant : polynomial.eval 0 ≠ 0)
    (hRoots :
      ∀ {z : ℂ}, (complexify polynomial).IsRoot z →
        (rootBound : ℝ) ≤ ‖z‖) :
    ∃ constant : ℝ, 0 < constant ∧
      ∀ n : ℕ,
        |PowerSeries.coeff n
          (polynomial : PowerSeries ℝ)⁻¹| ≤
            constant / (innerRadius : ℝ) ^ n := by
  have hcomplexConstant :
      (complexify polynomial).eval 0 ≠ 0 := by
    change (complexify polynomial).eval ((0 : ℝ) : ℂ) ≠ 0
    rw [complexify_eval_real]
    exact_mod_cast hconstant
  rcases powerSeriesInverse_coeff_norm_le_of_root_gap
      (complexify polynomial)
      innerRadius outerRadius rootBound
      hInnerPos hInnerOuter hOuterRoot
      hcomplexConstant hRoots with
    ⟨constant, hconstantPos, hbound⟩
  have hmapPolynomial :
      PowerSeries.map Complex.ofRealHom
          (polynomial : PowerSeries ℝ) =
        (complexify polynomial : PowerSeries ℂ) := by
    ext n
    simp [complexify]
  have hmapInverse :
      PowerSeries.map Complex.ofRealHom
          (polynomial : PowerSeries ℝ)⁻¹ =
        (complexify polynomial : PowerSeries ℂ)⁻¹ := by
    rw [map_powerSeries_inv_of_injective
      Complex.ofRealHom Complex.ofReal_injective]
    · rw [hmapPolynomial]
    · rw [← PowerSeries.coeff_zero_eq_constantCoeff_apply,
        Polynomial.coeff_coe, coeff_zero_eq_eval_zero]
      exact hconstant
  refine ⟨constant, hconstantPos, ?_⟩
  intro n
  have hn := hbound n
  have hcoeff :=
    congrArg (PowerSeries.coeff n) hmapInverse
  rw [PowerSeries.coeff_map] at hcoeff
  rw [← hcoeff] at hn
  simpa using hn

theorem exists_fd_analyticFactor_inverse_coeff_bound
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ radius constant : ℝ,
      adRoot k (by omega) < radius ∧
        0 < constant ∧
        (fun n =>
          ‖PowerSeries.coeff n
            ((complexify
              (fdDominantAnalyticFactor j k (by omega)) :
                PowerSeries ℂ)⁻¹)‖) =O[atTop]
          coefficientModel constant 0 radius := by
  rcases exists_fd_analytic_larger_radius j k hk with
    ⟨rootBound, hRootBound, hroots⟩
  have hrootPos : 0 < adRoot k (by omega) :=
    adRoot_pos k (by omega)
  have hrootBoundPos : 0 < rootBound :=
    hrootPos.trans hRootBound
  let inner : ℝ≥0 :=
    ⟨(3 * adRoot k (by omega) + rootBound) / 4, by
      linarith⟩
  let outer : ℝ≥0 :=
    ⟨(adRoot k (by omega) + rootBound) / 2, by
      linarith⟩
  let bound : ℝ≥0 :=
    ⟨rootBound, (adRoot_pos k (by omega)).le.trans
      hRootBound.le⟩
  have hInnerPos : 0 < inner := by
    change 0 < (3 * adRoot k (by omega) + rootBound) / 4
    linarith
  have hInnerOuter : inner < outer := by
    change
      (3 * adRoot k (by omega) + rootBound) / 4 <
        (adRoot k (by omega) + rootBound) / 2
    linarith
  have hOuterBound : outer < bound := by
    change
      (adRoot k (by omega) + rootBound) / 2 < rootBound
    linarith
  have hconstant :
      (complexify
        (fdDominantAnalyticFactor j k (by omega))).eval 0 ≠ 0 := by
    change
      (complexify
        (fdDominantAnalyticFactor j k (by omega))).eval
          ((0 : ℝ) : ℂ) ≠ 0
    rw [complexify_eval_real,
      fdDominantAnalyticFactor_eval_zero j k (by omega)]
    norm_num
  rcases powerSeriesInverse_coeff_norm_isBigO_of_root_gap
      (complexify
        (fdDominantAnalyticFactor j k (by omega)))
      inner outer bound hInnerPos hInnerOuter hOuterBound
      hconstant (by
        intro z hz
        exact hroots hz) with
    ⟨constant, hconstantPos, hbound⟩
  refine ⟨(inner : ℝ), constant, ?_, hconstantPos, hbound⟩
  change
    adRoot k (by omega) <
      (3 * adRoot k (by omega) + rootBound) / 4
  linarith

theorem exists_fo_analyticFactor_inverse_coeff_bound
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ radius constant : ℝ,
      aoRoot k hk < radius ∧
        0 < constant ∧
        (fun n =>
          ‖PowerSeries.coeff n
            ((complexify
              (foDominantAnalyticFactor j k hk) :
                PowerSeries ℂ)⁻¹)‖) =O[atTop]
          coefficientModel constant 0 radius := by
  rcases exists_fo_analytic_larger_radius j k hk with
    ⟨rootBound, hRootBound, hroots⟩
  have hrootPos : 0 < aoRoot k hk :=
    aoRoot_pos k hk
  have hrootBoundPos : 0 < rootBound :=
    hrootPos.trans hRootBound
  let inner : ℝ≥0 :=
    ⟨(3 * aoRoot k hk + rootBound) / 4, by
      linarith⟩
  let outer : ℝ≥0 :=
    ⟨(aoRoot k hk + rootBound) / 2, by
      linarith⟩
  let bound : ℝ≥0 :=
    ⟨rootBound, (aoRoot_pos k hk).le.trans hRootBound.le⟩
  have hInnerPos : 0 < inner := by
    change 0 < (3 * aoRoot k hk + rootBound) / 4
    linarith
  have hInnerOuter : inner < outer := by
    change
      (3 * aoRoot k hk + rootBound) / 4 <
        (aoRoot k hk + rootBound) / 2
    linarith
  have hOuterBound : outer < bound := by
    change (aoRoot k hk + rootBound) / 2 < rootBound
    linarith
  have hconstant :
      (complexify
        (foDominantAnalyticFactor j k hk)).eval 0 ≠ 0 := by
    change
      (complexify
        (foDominantAnalyticFactor j k hk)).eval
          ((0 : ℝ) : ℂ) ≠ 0
    rw [complexify_eval_real,
      foDominantAnalyticFactor_eval_zero j k hk]
    norm_num
  rcases powerSeriesInverse_coeff_norm_isBigO_of_root_gap
      (complexify (foDominantAnalyticFactor j k hk))
      inner outer bound hInnerPos hInnerOuter hOuterBound
      hconstant (by
        intro z hz
        exact hroots hz) with
    ⟨constant, hconstantPos, hbound⟩
  refine ⟨(inner : ℝ), constant, ?_, hconstantPos, hbound⟩
  change
    aoRoot k hk < (3 * aoRoot k hk + rootBound) / 4
  linarith

/-- Pointwise larger-radius reciprocal bound for the concrete `FD` analytic
factor. -/
theorem exists_fd_analyticFactor_inverse_coeff_pointwise_bound
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ radius constant : ℝ,
      adRoot k (by omega) < radius ∧
        0 < constant ∧
        ∀ n : ℕ,
          |PowerSeries.coeff n
            (fdDominantAnalyticFactor j k (by omega) :
              PowerSeries ℝ)⁻¹| ≤
            constant / radius ^ n := by
  rcases exists_fd_analytic_larger_radius j k hk with
    ⟨rootBound, hRootBound, hroots⟩
  have hrootPos : 0 < adRoot k (by omega) :=
    adRoot_pos k (by omega)
  have hrootBoundPos : 0 < rootBound :=
    hrootPos.trans hRootBound
  let inner : ℝ≥0 :=
    ⟨(3 * adRoot k (by omega) + rootBound) / 4, by
      linarith⟩
  let outer : ℝ≥0 :=
    ⟨(adRoot k (by omega) + rootBound) / 2, by
      linarith⟩
  let bound : ℝ≥0 :=
    ⟨rootBound, hrootBoundPos.le⟩
  have hInnerPos : 0 < inner := by
    change 0 < (3 * adRoot k (by omega) + rootBound) / 4
    linarith
  have hInnerOuter : inner < outer := by
    change
      (3 * adRoot k (by omega) + rootBound) / 4 <
        (adRoot k (by omega) + rootBound) / 2
    linarith
  have hOuterBound : outer < bound := by
    change
      (adRoot k (by omega) + rootBound) / 2 < rootBound
    linarith
  have hconstant :
      (fdDominantAnalyticFactor j k (by omega)).eval 0 ≠ 0 := by
    rw [fdDominantAnalyticFactor_eval_zero j k (by omega)]
    norm_num
  rcases realPowerSeriesInverse_coeff_abs_le_of_complex_root_gap
      (fdDominantAnalyticFactor j k (by omega))
      inner outer bound hInnerPos hInnerOuter hOuterBound
      hconstant (by
        intro z hz
        exact hroots hz) with
    ⟨constant, hconstantPos, hbound⟩
  refine ⟨(inner : ℝ), constant, ?_, hconstantPos, hbound⟩
  change
    adRoot k (by omega) <
      (3 * adRoot k (by omega) + rootBound) / 4
  linarith

/-- Pointwise larger-radius reciprocal bound for the concrete `FO` analytic
factor. -/
theorem exists_fo_analyticFactor_inverse_coeff_pointwise_bound
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ radius constant : ℝ,
      aoRoot k hk < radius ∧
        0 < constant ∧
        ∀ n : ℕ,
          |PowerSeries.coeff n
            (foDominantAnalyticFactor j k hk :
              PowerSeries ℝ)⁻¹| ≤
            constant / radius ^ n := by
  rcases exists_fo_analytic_larger_radius j k hk with
    ⟨rootBound, hRootBound, hroots⟩
  have hrootPos : 0 < aoRoot k hk :=
    aoRoot_pos k hk
  have hrootBoundPos : 0 < rootBound :=
    hrootPos.trans hRootBound
  let inner : ℝ≥0 :=
    ⟨(3 * aoRoot k hk + rootBound) / 4, by
      linarith⟩
  let outer : ℝ≥0 :=
    ⟨(aoRoot k hk + rootBound) / 2, by
      linarith⟩
  let bound : ℝ≥0 :=
    ⟨rootBound, hrootBoundPos.le⟩
  have hInnerPos : 0 < inner := by
    change 0 < (3 * aoRoot k hk + rootBound) / 4
    linarith
  have hInnerOuter : inner < outer := by
    change
      (3 * aoRoot k hk + rootBound) / 4 <
        (aoRoot k hk + rootBound) / 2
    linarith
  have hOuterBound : outer < bound := by
    change (aoRoot k hk + rootBound) / 2 < rootBound
    linarith
  have hconstant :
      (foDominantAnalyticFactor j k hk).eval 0 ≠ 0 := by
    rw [foDominantAnalyticFactor_eval_zero j k hk]
    norm_num
  rcases realPowerSeriesInverse_coeff_abs_le_of_complex_root_gap
      (foDominantAnalyticFactor j k hk)
      inner outer bound hInnerPos hInnerOuter hOuterBound
      hconstant (by
        intro z hz
        exact hroots hz) with
    ⟨constant, hconstantPos, hbound⟩
  refine ⟨(inner : ℝ), constant, ?_, hconstantPos, hbound⟩
  change
    aoRoot k hk < (3 * aoRoot k hk + rootBound) / 4
  linarith

end FixedPerimeter
