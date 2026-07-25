import FixedPerimeter.RationalTransfer

/-!
# Coefficient asymptotics for the four concrete rational series

This file discharges the analytic transfer obligation for the fixed-`j`
series.  The remaining bridge is purely enumerative: identify the actual
counting series with these rational series.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial
open Asymptotics Filter

theorem fdFixedJ_rational_coeff_isEquivalent
    (j k : ℕ) (hk : 2 ≤ k) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (rationalSeries
          (fdFixedJNumeratorReal j k)
          (fdFixedJDenominatorReal j k))) ~[atTop]
      coefficientModel
        (fdLeadingConstant j k hk) j
        (adRoot k (by omega)) := by
  rcases exists_fd_analyticFactor_inverse_coeff_pointwise_bound
      j k hk with
    ⟨largerRadius, inverseConstant, hRadius,
      hInverseConstant, hInverse⟩
  have htransfer :=
    rationalSeries_coeff_isEquivalent_of_analyticFactor_bound
      (fdFixedJNumeratorReal j k)
      (fdDominantAnalyticFactor j k (by omega))
      j
      (adRoot_pos k (by omega))
      hRadius hInverseConstant hInverse
      (by
        rw [coeff_zero_eq_eval_zero,
          fdDominantAnalyticFactor_eval_zero j k (by omega)]
        norm_num)
      (fdDominantAnalyticFactor_eval_ne_zero j k hk)
      (fdFixedJNumeratorReal_eval_ne_zero j k (by omega))
  rw [← fdFixedJDenominatorReal_factorization
    j k (by omega)] at htransfer
  simpa [fdLeadingConstant] using htransfer

theorem foFixedJ_rational_coeff_isEquivalent
    (j k : ℕ) (hk : 2 ≤ k) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (rationalSeries
          (foFixedJNumeratorReal j k)
          (foFixedJDenominatorReal j k))) ~[atTop]
      coefficientModel
        (foLeadingConstant j k hk) j
        (aoRoot k hk) := by
  rcases exists_fo_analyticFactor_inverse_coeff_pointwise_bound
      j k hk with
    ⟨largerRadius, inverseConstant, hRadius,
      hInverseConstant, hInverse⟩
  have htransfer :=
    rationalSeries_coeff_isEquivalent_of_analyticFactor_bound
      (foFixedJNumeratorReal j k)
      (foDominantAnalyticFactor j k hk)
      j
      (aoRoot_pos k hk)
      hRadius hInverseConstant hInverse
      (by
        rw [coeff_zero_eq_eval_zero,
          foDominantAnalyticFactor_eval_zero j k hk]
        norm_num)
      (foDominantAnalyticFactor_eval_ne_zero j k hk)
      (foFixedJNumeratorReal_eval_ne_zero j k hk)
  rw [← foFixedJDenominatorReal_factorization j k hk] at htransfer
  simpa [foLeadingConstant] using htransfer

theorem fdZero_rational_coeff_isEquivalent
    (k : ℕ) (hk : 2 ≤ k) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (rationalSeries
          (fdZeroNumeratorReal k) (ADReal k))) ~[atTop]
      coefficientModel
        (fdZeroLeadingConstant k hk) 0
        (adRoot k (by omega)) := by
  rcases exists_fd_analyticFactor_inverse_coeff_pointwise_bound
      0 k hk with
    ⟨largerRadius, inverseConstant, hRadius,
      hInverseConstant, hInverse⟩
  have hfactor :
      fdDominantAnalyticFactor 0 k (by omega) =
        adDominantCofactor k (by omega) := by
    simp [fdDominantAnalyticFactor]
  rw [hfactor] at hInverse
  have htransfer :=
    rationalSeries_coeff_isEquivalent_of_analyticFactor_bound
      (fdZeroNumeratorReal k)
      (adDominantCofactor k (by omega))
      0
      (adRoot_pos k (by omega))
      hRadius hInverseConstant hInverse
      (by
        rw [coeff_zero_eq_eval_zero,
          adDominantCofactor_eval_zero k (by omega)]
        norm_num)
      (adDominantCofactor_eval_ne_zero k (by omega))
      (fdZeroNumeratorReal_eval_pos k hk).ne'
  have hdenominator :
      normalizedPoleFactor (adRoot k (by omega)) ^ (0 + 1) *
          adDominantCofactor k (by omega) =
        ADReal k := by
    simpa using ADReal_dominant_factorization k (by omega)
  rw [hdenominator] at htransfer
  simpa [fdZeroLeadingConstant] using htransfer

theorem foZero_rational_coeff_isEquivalent
    (k : ℕ) (hk : 2 ≤ k) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (rationalSeries
          (foZeroNumeratorReal k) (AOReal k))) ~[atTop]
      coefficientModel
        (foZeroLeadingConstant k hk) 0
        (aoRoot k hk) := by
  rcases exists_fo_analyticFactor_inverse_coeff_pointwise_bound
      0 k hk with
    ⟨largerRadius, inverseConstant, hRadius,
      hInverseConstant, hInverse⟩
  have hfactor :
      foDominantAnalyticFactor 0 k hk =
        aoDominantCofactor k hk := by
    simp [foDominantAnalyticFactor]
  rw [hfactor] at hInverse
  have htransfer :=
    rationalSeries_coeff_isEquivalent_of_analyticFactor_bound
      (foZeroNumeratorReal k)
      (aoDominantCofactor k hk)
      0
      (aoRoot_pos k hk)
      hRadius hInverseConstant hInverse
      (by
        rw [coeff_zero_eq_eval_zero,
          aoDominantCofactor_eval_zero k hk]
        norm_num)
      (aoDominantCofactor_eval_ne_zero k hk)
      (foZeroNumeratorReal_eval_pos k hk).ne'
  have hdenominator :
      normalizedPoleFactor (aoRoot k hk) ^ (0 + 1) *
          aoDominantCofactor k hk =
        AOReal k := by
    simpa using AOReal_dominant_factorization k hk
  rw [hdenominator] at htransfer
  simpa [foZeroLeadingConstant] using htransfer

end FixedPerimeter
