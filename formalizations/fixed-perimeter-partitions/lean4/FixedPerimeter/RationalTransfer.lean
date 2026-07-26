import FixedPerimeter.ConvolutionBounds

/-!
# Dominant-pole transfer for the fixed-perimeter rational series

This file combines the formal dominant-factor decomposition with the analytic
cofactor bounds.  The first lemmas identify Mathlib's normalized pole
polynomial with the `purePoleSeries` used by the asymptotic layer.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial
open Asymptotics Filter

theorem coe_normalizedPoleFactor
    (radius : ℝ) :
    (normalizedPoleFactor radius : PowerSeries ℝ) =
      1 - PowerSeries.C radius⁻¹ * PowerSeries.X := by
  simp [normalizedPoleFactor]

theorem normalizedPole_pow_mul_purePoleSeries
    (degree : ℕ) (radius : ℝ) :
    (normalizedPoleFactor radius : PowerSeries ℝ) ^ (degree + 1) *
        purePoleSeries degree radius =
      1 := by
  have hinverse :=
    (PowerSeries.invOneSubPow ℝ (degree + 1)).inv_val
  have hrescaled :=
    congrArg (fun series : PowerSeries ℝ =>
      PowerSeries.rescale radius⁻¹ series) hinverse
  rw [map_mul, map_one] at hrescaled
  rw [PowerSeries.invOneSubPow_inv_eq_one_sub_pow] at hrescaled
  rw [map_pow] at hrescaled
  simpa [purePoleSeries, coe_normalizedPoleFactor] using hrescaled

theorem purePoleSeries_mul_normalizedPole_pow
    (degree : ℕ) (radius : ℝ) :
    purePoleSeries degree radius *
        (normalizedPoleFactor radius : PowerSeries ℝ) ^ (degree + 1) =
      1 := by
  rw [mul_comm]
  exact normalizedPole_pow_mul_purePoleSeries degree radius

theorem normalizedPoleFactor_coeff_zero
    (radius : ℝ) :
    (normalizedPoleFactor radius).coeff 0 = 1 := by
  rw [coeff_zero_eq_eval_zero]
  simp [normalizedPoleFactor]

/-- Split a rational series whose denominator is already factored into its
pure dominant pole and analytic cofactor. -/
theorem rationalSeries_normalizedPole_factorization
    (numerator analyticFactor : Polynomial ℝ)
    (degree : ℕ) (radius : ℝ)
    (hAnalyticZero : analyticFactor.coeff 0 ≠ 0) :
    rationalSeries numerator
        (normalizedPoleFactor radius ^ (degree + 1) *
          analyticFactor) =
      purePoleSeries degree radius *
        ((numerator : PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ)⁻¹) := by
  have hAnalyticSeries :
      PowerSeries.constantCoeff
          (analyticFactor : PowerSeries ℝ) ≠ 0 := by
    simpa using hAnalyticZero
  have hDenominator :
      PowerSeries.constantCoeff
          ((normalizedPoleFactor radius ^ (degree + 1) *
            analyticFactor : Polynomial ℝ) :
              PowerSeries ℝ) ≠ 0 := by
    simpa [normalizedPoleFactor_coeff_zero] using hAnalyticZero
  unfold rationalSeries
  symm
  apply (PowerSeries.eq_mul_inv_iff_mul_eq hDenominator).2
  rw [Polynomial.coe_mul, Polynomial.coe_pow]
  change
    (purePoleSeries degree radius *
        ((numerator : PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ)⁻¹)) *
      ((normalizedPoleFactor radius : PowerSeries ℝ) ^
          (degree + 1) *
        (analyticFactor : PowerSeries ℝ)) =
      (numerator : PowerSeries ℝ)
  calc
    _ = (numerator : PowerSeries ℝ) *
        (purePoleSeries degree radius *
          (normalizedPoleFactor radius : PowerSeries ℝ) ^
            (degree + 1)) *
        ((analyticFactor : PowerSeries ℝ)⁻¹ *
          (analyticFactor : PowerSeries ℝ)) := by ring
    _ = (numerator : PowerSeries ℝ) * 1 * 1 := by
      rw [purePoleSeries_mul_normalizedPole_pow,
        PowerSeries.inv_mul_cancel _ hAnalyticSeries]
    _ = (numerator : PowerSeries ℝ) := by simp

theorem normalizedPoleFactor_mul_purePoleSeries_succ
    (degree : ℕ) (radius : ℝ) :
    (normalizedPoleFactor radius : PowerSeries ℝ) *
        purePoleSeries (degree + 1) radius =
      purePoleSeries degree radius := by
  rw [purePoleSeries_succ]
  have hzero :
      (normalizedPoleFactor radius : PowerSeries ℝ) *
          purePoleSeries 0 radius =
        1 := by
    simpa using
      normalizedPole_pow_mul_purePoleSeries 0 radius
  calc
    (normalizedPoleFactor radius : PowerSeries ℝ) *
        (purePoleSeries 0 radius *
          purePoleSeries degree radius) =
      ((normalizedPoleFactor radius : PowerSeries ℝ) *
        purePoleSeries 0 radius) *
          purePoleSeries degree radius := by ring
    _ = purePoleSeries degree radius := by
      rw [hzero]
      simp

/-- The analytic numerator after subtracting the dominant value. -/
noncomputable def dominantRemainderNumerator
    (numerator analyticFactor : Polynomial ℝ)
    (radius : ℝ) : Polynomial ℝ :=
  normalizedRootCofactor
    (numerator -
      C (numerator.eval radius / analyticFactor.eval radius) *
        analyticFactor)
    radius

theorem dominant_numerator_decomposition
    (numerator analyticFactor : Polynomial ℝ)
    {radius : ℝ} (hRadius : radius ≠ 0)
    (hAnalytic : analyticFactor.eval radius ≠ 0) :
    numerator =
      C (numerator.eval radius / analyticFactor.eval radius) *
          analyticFactor +
        normalizedPoleFactor radius *
          dominantRemainderNumerator
            numerator analyticFactor radius := by
  let difference :=
    numerator -
      C (numerator.eval radius / analyticFactor.eval radius) *
        analyticFactor
  have hroot : difference.IsRoot radius := by
    unfold Polynomial.IsRoot
    dsimp [difference]
    simp only [eval_sub, eval_mul, eval_C]
    field_simp
    ring
  have hfactor :=
    normalizedPoleFactor_mul_cofactor hroot hRadius
  dsimp [dominantRemainderNumerator]
  change
    numerator =
      C (numerator.eval radius / analyticFactor.eval radius) *
          analyticFactor +
        normalizedPoleFactor radius *
          normalizedRootCofactor difference radius
  rw [hfactor]
  dsimp [difference]
  ring

/-- Formal-series version of the numerator decomposition after division by
the analytic cofactor. -/
theorem analyticQuotient_decomposition
    (numerator analyticFactor : Polynomial ℝ)
    {radius : ℝ} (hRadius : radius ≠ 0)
    (hAnalyticAtRadius : analyticFactor.eval radius ≠ 0)
    (hAnalyticZero : analyticFactor.coeff 0 ≠ 0) :
    (numerator : PowerSeries ℝ) *
        (analyticFactor : PowerSeries ℝ)⁻¹ =
      PowerSeries.C
          (numerator.eval radius / analyticFactor.eval radius) +
        (normalizedPoleFactor radius : PowerSeries ℝ) *
          ((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ)⁻¹ := by
  have hAnalyticSeries :
      PowerSeries.constantCoeff
          (analyticFactor : PowerSeries ℝ) ≠ 0 := by
    simpa using hAnalyticZero
  have hdecomposition :=
    dominant_numerator_decomposition
      numerator analyticFactor hRadius hAnalyticAtRadius
  have hcoe := congrArg
    (fun polynomial : Polynomial ℝ =>
      (polynomial : PowerSeries ℝ)) hdecomposition
  simp only [Polynomial.coe_add, Polynomial.coe_mul,
    Polynomial.coe_C] at hcoe
  calc
    (numerator : PowerSeries ℝ) *
        (analyticFactor : PowerSeries ℝ)⁻¹ =
      (((C (numerator.eval radius /
              analyticFactor.eval radius) : Polynomial ℝ) :
            PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ) +
        (normalizedPoleFactor radius : PowerSeries ℝ) *
          ((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ)) *
        (analyticFactor : PowerSeries ℝ)⁻¹ := by
      rw [Polynomial.coe_C, ← hcoe]
    _ = PowerSeries.C
          (numerator.eval radius / analyticFactor.eval radius) *
          ((analyticFactor : PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) +
        (normalizedPoleFactor radius : PowerSeries ℝ) *
          ((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ)⁻¹ := by
      simp only [Polynomial.coe_C]
      ring
    _ = _ := by
      rw [PowerSeries.mul_inv_cancel _ hAnalyticSeries]
      simp

/-- Exact principal-part decomposition for a simple dominant pole. -/
theorem rationalSeries_simplePole_decomposition
    (numerator analyticFactor : Polynomial ℝ)
    {radius : ℝ} (hRadius : radius ≠ 0)
    (hAnalyticAtRadius : analyticFactor.eval radius ≠ 0)
    (hAnalyticZero : analyticFactor.coeff 0 ≠ 0) :
    rationalSeries numerator
        (normalizedPoleFactor radius * analyticFactor) =
      polynomialPoleSeries
          (C (numerator.eval radius /
            analyticFactor.eval radius))
          0 radius +
        ((dominantRemainderNumerator
            numerator analyticFactor radius : Polynomial ℝ) :
          PowerSeries ℝ) *
          (analyticFactor : PowerSeries ℝ)⁻¹ := by
  rw [show normalizedPoleFactor radius * analyticFactor =
      normalizedPoleFactor radius ^ (0 + 1) *
        analyticFactor by simp]
  rw [rationalSeries_normalizedPole_factorization
    numerator analyticFactor 0 radius hAnalyticZero]
  rw [analyticQuotient_decomposition
    numerator analyticFactor hRadius
      hAnalyticAtRadius hAnalyticZero]
  unfold polynomialPoleSeries
  simp only [Polynomial.coe_C]
  have hcancel :=
    normalizedPole_pow_mul_purePoleSeries 0 radius
  calc
    purePoleSeries 0 radius *
        (PowerSeries.C
            (numerator.eval radius / analyticFactor.eval radius) +
          (normalizedPoleFactor radius : PowerSeries ℝ) *
            ((dominantRemainderNumerator
                numerator analyticFactor radius : Polynomial ℝ) :
              PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) =
      PowerSeries.C
          (numerator.eval radius / analyticFactor.eval radius) *
          purePoleSeries 0 radius +
        ((normalizedPoleFactor radius : PowerSeries ℝ) *
          purePoleSeries 0 radius) *
          (((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) := by ring
    _ = _ := by
      rw [show
        (normalizedPoleFactor radius : PowerSeries ℝ) *
            purePoleSeries 0 radius = 1 by
          simpa using hcancel]
      simp

/-- Exact principal-part decomposition for pole order at least two. -/
theorem rationalSeries_higherPole_decomposition
    (numerator analyticFactor : Polynomial ℝ)
    (degree : ℕ) {radius : ℝ} (hRadius : radius ≠ 0)
    (hAnalyticAtRadius : analyticFactor.eval radius ≠ 0)
    (hAnalyticZero : analyticFactor.coeff 0 ≠ 0) :
    rationalSeries numerator
        (normalizedPoleFactor radius ^ (degree + 2) *
          analyticFactor) =
      polynomialPoleSeries
          (C (numerator.eval radius /
            analyticFactor.eval radius))
          (degree + 1) radius +
        purePoleSeries degree radius *
          (((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) := by
  rw [show degree + 2 = degree + 1 + 1 by omega]
  rw [rationalSeries_normalizedPole_factorization
    numerator analyticFactor (degree + 1) radius hAnalyticZero]
  rw [analyticQuotient_decomposition
    numerator analyticFactor hRadius
      hAnalyticAtRadius hAnalyticZero]
  unfold polynomialPoleSeries
  simp only [Polynomial.coe_C]
  calc
    purePoleSeries (degree + 1) radius *
        (PowerSeries.C
            (numerator.eval radius / analyticFactor.eval radius) +
          (normalizedPoleFactor radius : PowerSeries ℝ) *
            ((dominantRemainderNumerator
                numerator analyticFactor radius : Polynomial ℝ) :
              PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) =
      PowerSeries.C
          (numerator.eval radius / analyticFactor.eval radius) *
          purePoleSeries (degree + 1) radius +
        ((normalizedPoleFactor radius : PowerSeries ℝ) *
          purePoleSeries (degree + 1) radius) *
          (((dominantRemainderNumerator
              numerator analyticFactor radius : Polynomial ℝ) :
            PowerSeries ℝ) *
            (analyticFactor : PowerSeries ℝ)⁻¹) := by ring
    _ = _ := by
      rw [normalizedPoleFactor_mul_purePoleSeries_succ]

/-- Complete coefficient transfer for a rational series with one positive
dominant pole and an analytic cofactor controlled at a larger radius. -/
theorem rationalSeries_coeff_isEquivalent_of_analyticFactor_bound
    (numerator analyticFactor : Polynomial ℝ)
    (degree : ℕ)
    {dominantRadius largerRadius inverseConstant : ℝ}
    (hDominantRadius : 0 < dominantRadius)
    (hRadius : dominantRadius < largerRadius)
    (hInverseConstant : 0 < inverseConstant)
    (hInverse :
      ∀ n : ℕ,
        |PowerSeries.coeff n
            (analyticFactor : PowerSeries ℝ)⁻¹| ≤
          inverseConstant / largerRadius ^ n)
    (hAnalyticZero : analyticFactor.coeff 0 ≠ 0)
    (hAnalyticAtRadius :
      analyticFactor.eval dominantRadius ≠ 0)
    (hNumeratorAtRadius :
      numerator.eval dominantRadius ≠ 0) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (rationalSeries numerator
          (normalizedPoleFactor dominantRadius ^ (degree + 1) *
            analyticFactor))) ~[atTop]
      coefficientModel
        (numerator.eval dominantRadius /
            analyticFactor.eval dominantRadius *
          (degree.factorial : ℝ)⁻¹)
        degree dominantRadius := by
  let principal : Polynomial ℝ :=
    C (numerator.eval dominantRadius /
      analyticFactor.eval dominantRadius)
  let quotient : PowerSeries ℝ :=
    ((dominantRemainderNumerator
        numerator analyticFactor dominantRadius : Polynomial ℝ) :
      PowerSeries ℝ) *
      (analyticFactor : PowerSeries ℝ)⁻¹
  have hPrincipalEval :
      principal.eval dominantRadius =
        numerator.eval dominantRadius /
          analyticFactor.eval dominantRadius := by
    simp [principal]
  have hPrincipalNe :
      principal.eval dominantRadius ≠ 0 := by
    rw [hPrincipalEval]
    exact div_ne_zero hNumeratorAtRadius hAnalyticAtRadius
  rcases exists_polynomial_mul_coeff_bound
      (dominantRemainderNumerator
        numerator analyticFactor dominantRadius)
      (analyticFactor : PowerSeries ℝ)⁻¹
      (hDominantRadius.trans hRadius)
      hInverseConstant hInverse with
    ⟨quotientConstant, hQuotientConstant, hQuotientBound⟩
  have hQuotientBound' :
      ∀ n : ℕ,
        |PowerSeries.coeff n quotient| ≤
          quotientConstant / largerRadius ^ n := by
    exact hQuotientBound
  cases degree with
  | zero =>
      have hdecomposition :
          rationalSeries numerator
              (normalizedPoleFactor dominantRadius ^ (0 + 1) *
                analyticFactor) =
            polynomialPoleSeries principal 0 dominantRadius +
              quotient := by
        simpa [principal, quotient] using
          rationalSeries_simplePole_decomposition
            numerator analyticFactor
            hDominantRadius.ne'
            hAnalyticAtRadius hAnalyticZero
      rcases
          exists_isBigO_coefficientModel_of_shifted_bound
            (fun n => PowerSeries.coeff n quotient)
            0 (hDominantRadius.trans hRadius)
            hQuotientConstant (by
              intro n
              simpa using hQuotientBound' n) with
        ⟨remainderConstant, _hRemainderConstant,
          hRemainder⟩
      have htransfer :=
        coeff_isEquivalent_of_principal_part_and_larger_radius_bound
          (rationalSeries numerator
            (normalizedPoleFactor dominantRadius ^ (0 + 1) *
              analyticFactor))
          principal 0 0 quotient
          hDominantRadius hRadius hPrincipalNe
          hdecomposition hRemainder
      simpa [hPrincipalEval] using htransfer
  | succ degree =>
      have hdecomposition :
          rationalSeries numerator
              (normalizedPoleFactor dominantRadius ^
                  (degree + 1 + 1) *
                analyticFactor) =
            polynomialPoleSeries principal (degree + 1)
                dominantRadius +
              purePoleSeries degree dominantRadius * quotient := by
        simpa [principal, quotient, Nat.add_assoc] using
          rationalSeries_higherPole_decomposition
            numerator analyticFactor degree
            hDominantRadius.ne'
            hAnalyticAtRadius hAnalyticZero
      rcases exists_coeff_purePole_mul_bound_of_radius_lt
          quotient degree hDominantRadius hRadius
          hQuotientConstant hQuotientBound' with
        ⟨poleConstant, hPoleConstant, hPoleBound⟩
      rcases
          exists_isBigO_coefficientModel_of_shifted_bound
            (fun n =>
              PowerSeries.coeff n
                (purePoleSeries degree dominantRadius * quotient))
            degree hDominantRadius hPoleConstant hPoleBound with
        ⟨remainderConstant, _hRemainderConstant,
          hRemainder⟩
      have htransfer :=
        coeff_isEquivalent_of_principal_part_and_lower_degree_bound
          (rationalSeries numerator
            (normalizedPoleFactor dominantRadius ^
                (degree + 1 + 1) *
              analyticFactor))
          principal (degree + 1) degree
          (purePoleSeries degree dominantRadius * quotient)
          hDominantRadius (by omega)
          hPrincipalNe hdecomposition hRemainder
      simpa [hPrincipalEval] using htransfer

end FixedPerimeter
