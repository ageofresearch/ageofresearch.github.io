import FixedPerimeter.FixedJDominant
import Mathlib.Data.Finset.Max

/-!
# Spectral gaps for the analytic cofactors

Removing the unique dominant real root leaves a polynomial all of whose
complex roots have strictly larger modulus.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial

noncomputable def complexify (polynomial : Polynomial ℝ) : Polynomial ℂ :=
  polynomial.map (algebraMap ℝ ℂ)

theorem complexify_eval_real
    (polynomial : Polynomial ℝ) (x : ℝ) :
    (complexify polynomial).eval (x : ℂ) =
      ((Polynomial.eval x polynomial : ℝ) : ℂ) := by
  rw [complexify, eval_map]
  exact eval₂_at_apply (algebraMap ℝ ℂ) x

theorem complexify_ADReal_eval (k : ℕ) (z : ℂ) :
    (complexify (ADReal k)).eval z =
      eval₂ (Int.castRingHom ℂ) z (AD k) := by
  simp [complexify, ADReal, eval_map]
  rw [eval₂_map]
  congr 1

theorem complexify_AOReal_eval (k : ℕ) (z : ℂ) :
    (complexify (AOReal k)).eval z =
      eval₂ (Int.castRingHom ℂ) z (AO k) := by
  simp [complexify, AOReal, eval_map]
  rw [eval₂_map]
  congr 1

theorem adDominantCofactor_complex_root_modulus_gt
    (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz :
      (complexify (adDominantCofactor k (by omega))).eval z = 0) :
    adRoot k (by omega) < ‖z‖ := by
  have hzADReal :
      (complexify (ADReal k)).eval z = 0 := by
    unfold complexify
    rw [← ADReal_dominant_factorization k (by omega)]
    rw [Polynomial.map_mul, eval_mul]
    change
      ((normalizedPoleFactor (adRoot k (by omega))).map
          (algebraMap ℝ ℂ)).eval z *
        (complexify (adDominantCofactor k (by omega))).eval z = 0
    rw [hz, mul_zero]
  have hzAD :
      eval₂ (Int.castRingHom ℂ) z (AD k) = 0 := by
    rw [← complexify_ADReal_eval]
    exact hzADReal
  have hzNe : z ≠ (adRoot k (by omega) : ℂ) := by
    intro heq
    rw [heq] at hz
    have hnonzero :
        (complexify (adDominantCofactor k (by omega))).eval
            (adRoot k (by omega) : ℂ) ≠ 0 := by
      rw [complexify_eval_real]
      exact_mod_cast
        adDominantCofactor_eval_ne_zero k (by omega)
    exact hnonzero hz
  exact AD_other_root_modulus_gt k hk hzAD hzNe

theorem aoDominantCofactor_complex_root_modulus_gt
    (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : (complexify (aoDominantCofactor k hk)).eval z = 0) :
    aoRoot k hk < ‖z‖ := by
  have hzAOReal :
      (complexify (AOReal k)).eval z = 0 := by
    unfold complexify
    rw [← AOReal_dominant_factorization k hk]
    rw [Polynomial.map_mul, eval_mul]
    change
      ((normalizedPoleFactor (aoRoot k hk)).map
          (algebraMap ℝ ℂ)).eval z *
        (complexify (aoDominantCofactor k hk)).eval z = 0
    rw [hz, mul_zero]
  have hzAO :
      eval₂ (Int.castRingHom ℂ) z (AO k) = 0 := by
    rw [← complexify_AOReal_eval]
    exact hzAOReal
  have hzNe : z ≠ (aoRoot k hk : ℂ) := by
    intro heq
    rw [heq] at hz
    have hnonzero :
        (complexify (aoDominantCofactor k hk)).eval
            (aoRoot k hk : ℂ) ≠ 0 := by
      rw [complexify_eval_real]
      exact_mod_cast aoDominantCofactor_eval_ne_zero k hk
    exact hnonzero hz
  exact AO_other_root_modulus_gt k hk hzAO hzNe

theorem fdDominantAnalyticFactor_complex_root_modulus_gt
    (j k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz :
      (complexify
        (fdDominantAnalyticFactor j k (by omega))).eval z = 0) :
    adRoot k (by omega) < ‖z‖ := by
  have hproduct :
      (1 - z) ^ (j - 1) *
        ((complexify (adDominantCofactor k (by omega))).eval z) ^
          (j + 1) = 0 := by
    simpa [complexify, fdDominantAnalyticFactor, eval_map] using hz
  rcases mul_eq_zero.mp hproduct with hone | hcofactor
  · have hbase : (1 : ℂ) - z = 0 := eq_zero_of_pow_eq_zero hone
    have hzOne : z = 1 := by
      exact (sub_eq_zero.mp hbase).symm
    rw [hzOne, norm_one]
    exact (adRoot_mem_Ioo k hk).2
  · have hroot :
        (complexify (adDominantCofactor k (by omega))).eval z = 0 :=
      eq_zero_of_pow_eq_zero hcofactor
    exact adDominantCofactor_complex_root_modulus_gt k hk hroot

theorem foDominantAnalyticFactor_complex_root_modulus_gt
    (j k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz :
      (complexify (foDominantAnalyticFactor j k hk)).eval z = 0) :
    aoRoot k hk < ‖z‖ := by
  have hproduct :
      (1 - z) ^ (j - 1) *
        ((complexify (aoDominantCofactor k hk)).eval z) ^
          (j + 1) = 0 := by
    simpa [complexify, foDominantAnalyticFactor, eval_map] using hz
  rcases mul_eq_zero.mp hproduct with hone | hcofactor
  · have hbase : (1 : ℂ) - z = 0 := eq_zero_of_pow_eq_zero hone
    have hzOne : z = 1 := by
      exact (sub_eq_zero.mp hbase).symm
    rw [hzOne, norm_one]
    exact (aoRoot_mem_Ioo k hk).2
  · have hroot :
        (complexify (aoDominantCofactor k hk)).eval z = 0 :=
      eq_zero_of_pow_eq_zero hcofactor
    exact aoDominantCofactor_complex_root_modulus_gt k hk hroot

/-- Norms of the distinct complex roots of a polynomial. -/
noncomputable def complexRootNorms (polynomial : Polynomial ℂ) :
    Finset ℝ :=
  polynomial.roots.toFinset.image norm

/-- A strict pointwise gap from all roots of a nonzero polynomial can be
shrunk to one uniform radius still lying below every root modulus. -/
theorem exists_uniform_radius_below_complex_roots
    {polynomial : Polynomial ℂ} {radius : ℝ}
    (hPolynomial : polynomial ≠ 0)
    (hGap : ∀ {z : ℂ}, polynomial.IsRoot z → radius < ‖z‖) :
    ∃ largerRadius : ℝ,
      radius < largerRadius ∧
        ∀ {z : ℂ}, polynomial.IsRoot z →
          largerRadius ≤ ‖z‖ := by
  classical
  let norms := complexRootNorms polynomial
  have hrootMem :
      ∀ {z : ℂ}, polynomial.IsRoot z → ‖z‖ ∈ norms := by
    intro z hz
    unfold norms complexRootNorms
    apply Finset.mem_image.mpr
    refine ⟨z, ?_, rfl⟩
    exact Multiset.mem_toFinset.mpr
      ((Polynomial.mem_roots hPolynomial).mpr hz)
  by_cases hnorms : norms.Nonempty
  · let minimum := norms.min' hnorms
    have hRadiusMinimum : radius < minimum := by
      rw [Finset.lt_min'_iff]
      intro value hvalue
      rcases Finset.mem_image.mp hvalue with
        ⟨z, hzRoots, rfl⟩
      exact hGap
        ((Polynomial.mem_roots hPolynomial).mp
          (Multiset.mem_toFinset.mp hzRoots))
    refine ⟨(radius + minimum) / 2, by linarith, ?_⟩
    intro z hz
    have hminimum : minimum ≤ ‖z‖ :=
      Finset.min'_le norms ‖z‖ (hrootMem hz)
    linarith
  · refine ⟨radius + 1, by linarith, ?_⟩
    intro z hz
    exact False.elim (hnorms ⟨‖z‖, hrootMem hz⟩)

theorem complexify_ne_zero_of_eval_ne_zero
    {polynomial : Polynomial ℝ} {x : ℝ}
    (hEval : polynomial.eval x ≠ 0) :
    complexify polynomial ≠ 0 := by
  intro hzero
  have hvalue :=
    congrArg (Polynomial.eval (x : ℂ)) hzero
  rw [complexify_eval_real, eval_zero] at hvalue
  exact hEval (Complex.ofReal_injective hvalue)

theorem exists_fd_analytic_larger_radius
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ largerRadius : ℝ,
      adRoot k (by omega) < largerRadius ∧
        ∀ {z : ℂ},
          (complexify
            (fdDominantAnalyticFactor j k (by omega))).IsRoot z →
          largerRadius ≤ ‖z‖ := by
  apply exists_uniform_radius_below_complex_roots
  · exact complexify_ne_zero_of_eval_ne_zero
      (fdDominantAnalyticFactor_eval_ne_zero j k hk)
  · intro z hz
    exact fdDominantAnalyticFactor_complex_root_modulus_gt
      j k hk hz

theorem exists_fo_analytic_larger_radius
    (j k : ℕ) (hk : 2 ≤ k) :
    ∃ largerRadius : ℝ,
      aoRoot k hk < largerRadius ∧
        ∀ {z : ℂ},
          (complexify
            (foDominantAnalyticFactor j k hk)).IsRoot z →
          largerRadius ≤ ‖z‖ := by
  apply exists_uniform_radius_below_complex_roots
  · exact complexify_ne_zero_of_eval_ne_zero
      (foDominantAnalyticFactor_eval_ne_zero j k hk)
  · intro z hz
    exact foDominantAnalyticFactor_complex_root_modulus_gt
      j k hk hz

end FixedPerimeter
