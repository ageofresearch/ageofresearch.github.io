import FixedPerimeter.DominantFactorization

/-!
# Dominant factors of the fixed-`j` denominators

The fixed-`j` denominators contain `A_D^(j+1)` or `A_O^(j+1)`.  This file
extracts the normalized dominant pole to precisely that order and proves that
the remaining polynomial factor does not vanish there.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial

noncomputable def fdFixedJDenominatorReal (j k : ℕ) : Polynomial ℝ :=
  (1 - X) ^ (j - 1) * (ADReal k) ^ (j + 1)

noncomputable def foFixedJDenominatorReal (j k : ℕ) : Polynomial ℝ :=
  (1 - X) ^ (j - 1) * (AOReal k) ^ (j + 1)

noncomputable def fdDominantAnalyticFactor
    (j k : ℕ) (hk : 1 ≤ k) : Polynomial ℝ :=
  (1 - X) ^ (j - 1) * (adDominantCofactor k hk) ^ (j + 1)

noncomputable def foDominantAnalyticFactor
    (j k : ℕ) (hk : 2 ≤ k) : Polynomial ℝ :=
  (1 - X) ^ (j - 1) * (aoDominantCofactor k hk) ^ (j + 1)

theorem fdFixedJDenominatorReal_factorization
    (j k : ℕ) (hk : 1 ≤ k) :
    fdFixedJDenominatorReal j k =
      normalizedPoleFactor (adRoot k hk) ^ (j + 1) *
        fdDominantAnalyticFactor j k hk := by
  unfold fdFixedJDenominatorReal fdDominantAnalyticFactor
  rw [← ADReal_dominant_factorization k hk]
  ring

theorem foFixedJDenominatorReal_factorization
    (j k : ℕ) (hk : 2 ≤ k) :
    foFixedJDenominatorReal j k =
      normalizedPoleFactor (aoRoot k hk) ^ (j + 1) *
        foDominantAnalyticFactor j k hk := by
  unfold foFixedJDenominatorReal foDominantAnalyticFactor
  rw [← AOReal_dominant_factorization k hk]
  ring

theorem fdDominantAnalyticFactor_eval_ne_zero
    (j k : ℕ) (hk : 2 ≤ k) :
    (fdDominantAnalyticFactor j k (by omega)).eval
        (adRoot k (by omega)) ≠ 0 := by
  have hrootLt : adRoot k (by omega) < 1 :=
    (adRoot_mem_Ioo k hk).2
  unfold fdDominantAnalyticFactor
  simp only [eval_mul, eval_pow, eval_sub, eval_one, eval_X]
  exact mul_ne_zero
    (pow_ne_zero _ (sub_ne_zero.mpr hrootLt.ne'))
    (pow_ne_zero _
      (adDominantCofactor_eval_ne_zero k (by omega)))

theorem foDominantAnalyticFactor_eval_ne_zero
    (j k : ℕ) (hk : 2 ≤ k) :
    (foDominantAnalyticFactor j k hk).eval
        (aoRoot k hk) ≠ 0 := by
  have hrootLt : aoRoot k hk < 1 :=
    (aoRoot_mem_Ioo k hk).2
  unfold foDominantAnalyticFactor
  simp only [eval_mul, eval_pow, eval_sub, eval_one, eval_X]
  exact mul_ne_zero
    (pow_ne_zero _ (sub_ne_zero.mpr hrootLt.ne'))
    (pow_ne_zero _
      (aoDominantCofactor_eval_ne_zero k hk))

theorem fdDominantAnalyticFactor_eval_zero
    (j k : ℕ) (hk : 1 ≤ k) :
    (fdDominantAnalyticFactor j k hk).eval 0 = 1 := by
  simp [fdDominantAnalyticFactor,
    adDominantCofactor_eval_zero k hk]

theorem foDominantAnalyticFactor_eval_zero
    (j k : ℕ) (hk : 2 ≤ k) :
    (foDominantAnalyticFactor j k hk).eval 0 = 1 := by
  simp [foDominantAnalyticFactor,
    aoDominantCofactor_eval_zero k hk]

/-- Positive-`j` numerators transported directly to real polynomials. -/
noncomputable def fdFixedJNumeratorReal (j k : ℕ) : Polynomial ℝ :=
  X ^ ((k + 1) * j - 1)

noncomputable def RKReal (k : ℕ) : Polynomial ℝ :=
  (RK k).map (Int.castRingHom ℝ)

noncomputable def foFixedJNumeratorReal (j k : ℕ) : Polynomial ℝ :=
  X ^ ((k + 1) * j - 1) * RKReal k

theorem RKReal_eval (k : ℕ) (q : ℝ) :
    (RKReal k).eval q = rkValue k q := by
  rw [RKReal, eval_map, eval₂_RK]

theorem fdFixedJNumeratorReal_eval_pos
    (j k : ℕ) (hk : 1 ≤ k) :
    0 < (fdFixedJNumeratorReal j k).eval (adRoot k hk) := by
  simp only [fdFixedJNumeratorReal, eval_pow, eval_X]
  exact pow_pos (adRoot_pos k hk) _

theorem foFixedJNumeratorReal_eval_pos
    (j k : ℕ) (hk : 2 ≤ k) :
    0 < (foFixedJNumeratorReal j k).eval (aoRoot k hk) := by
  simp only [foFixedJNumeratorReal, eval_mul, eval_pow, eval_X,
    RKReal_eval]
  exact mul_pos
    (pow_pos (aoRoot_pos k hk) _)
    (rkValue_pos k (aoRoot_pos k hk) (aoRoot_mem_Ioo k hk).2)

theorem fdFixedJNumeratorReal_eval_ne_zero
    (j k : ℕ) (hk : 1 ≤ k) :
    (fdFixedJNumeratorReal j k).eval (adRoot k hk) ≠ 0 :=
  (fdFixedJNumeratorReal_eval_pos j k hk).ne'

theorem foFixedJNumeratorReal_eval_ne_zero
    (j k : ℕ) (hk : 2 ≤ k) :
    (foFixedJNumeratorReal j k).eval (aoRoot k hk) ≠ 0 :=
  (foFixedJNumeratorReal_eval_pos j k hk).ne'

theorem derivative_ADReal_at_root_neg (k : ℕ) (hk : 1 ≤ k) :
    (derivative (ADReal k)).eval (adRoot k hk) < 0 := by
  rw [ADReal, derivative_map, eval_map]
  exact derivative_AD_at_root_neg k hk

theorem derivative_AOReal_at_root_neg (k : ℕ) (hk : 2 ≤ k) :
    (derivative (AOReal k)).eval (aoRoot k hk) < 0 := by
  rw [AOReal, derivative_map, eval_map]
  exact derivative_AO_at_root_neg k hk

theorem adDominantCofactor_eval_pos (k : ℕ) (hk : 1 ≤ k) :
    0 < (adDominantCofactor k hk).eval (adRoot k hk) := by
  unfold adDominantCofactor normalizedRootCofactor
  rw [eval_mul, eval_C, rootCofactor_eval_eq_derivative_eval]
  exact mul_pos_of_neg_of_neg
    (neg_lt_zero.mpr (adRoot_pos k hk))
    (derivative_ADReal_at_root_neg k hk)

theorem aoDominantCofactor_eval_pos (k : ℕ) (hk : 2 ≤ k) :
    0 < (aoDominantCofactor k hk).eval (aoRoot k hk) := by
  unfold aoDominantCofactor normalizedRootCofactor
  rw [eval_mul, eval_C, rootCofactor_eval_eq_derivative_eval]
  exact mul_pos_of_neg_of_neg
    (neg_lt_zero.mpr (aoRoot_pos k hk))
    (derivative_AOReal_at_root_neg k hk)

theorem fdDominantAnalyticFactor_eval_pos
    (j k : ℕ) (hk : 2 ≤ k) :
    0 < (fdDominantAnalyticFactor j k (by omega)).eval
        (adRoot k (by omega)) := by
  unfold fdDominantAnalyticFactor
  simp only [eval_mul, eval_pow, eval_sub, eval_one, eval_X]
  exact mul_pos
    (pow_pos (sub_pos.mpr (adRoot_mem_Ioo k hk).2) _)
    (pow_pos (adDominantCofactor_eval_pos k (by omega)) _)

theorem foDominantAnalyticFactor_eval_pos
    (j k : ℕ) (hk : 2 ≤ k) :
    0 < (foDominantAnalyticFactor j k hk).eval
        (aoRoot k hk) := by
  unfold foDominantAnalyticFactor
  simp only [eval_mul, eval_pow, eval_sub, eval_one, eval_X]
  exact mul_pos
    (pow_pos (sub_pos.mpr (aoRoot_mem_Ioo k hk).2) _)
    (pow_pos (aoDominantCofactor_eval_pos k hk) _)

/-- Leading constants predicted by the dominant-pole calculation. -/
noncomputable def fdLeadingConstant
    (j k : ℕ) (hk : 2 ≤ k) : ℝ :=
  (fdFixedJNumeratorReal j k).eval (adRoot k (by omega)) /
      (fdDominantAnalyticFactor j k (by omega)).eval
        (adRoot k (by omega)) *
    (j.factorial : ℝ)⁻¹

noncomputable def foLeadingConstant
    (j k : ℕ) (hk : 2 ≤ k) : ℝ :=
  (foFixedJNumeratorReal j k).eval (aoRoot k hk) /
      (foDominantAnalyticFactor j k hk).eval (aoRoot k hk) *
    (j.factorial : ℝ)⁻¹

theorem fdLeadingConstant_pos (j k : ℕ) (hk : 2 ≤ k) :
    0 < fdLeadingConstant j k hk := by
  unfold fdLeadingConstant
  exact mul_pos
    (div_pos
      (fdFixedJNumeratorReal_eval_pos j k (by omega))
      (fdDominantAnalyticFactor_eval_pos j k hk))
    (inv_pos.mpr (Nat.cast_pos.mpr (Nat.factorial_pos j)))

theorem foLeadingConstant_pos (j k : ℕ) (hk : 2 ≤ k) :
    0 < foLeadingConstant j k hk := by
  unfold foLeadingConstant
  exact mul_pos
    (div_pos
      (foFixedJNumeratorReal_eval_pos j k hk)
      (foDominantAnalyticFactor_eval_pos j k hk))
    (inv_pos.mpr (Nat.cast_pos.mpr (Nat.factorial_pos j)))

/-! The zero-statistic branch uses different numerators, but the same simple
dominant factors. -/

noncomputable def fdZeroNumeratorReal (k : ℕ) : Polynomial ℝ :=
  ∑ index ∈ Finset.range (k - 1), X ^ (index + 1)

noncomputable def TKReal (k : ℕ) : Polynomial ℝ :=
  (TK k).map (Int.castRingHom ℝ)

noncomputable def foZeroNumeratorReal (k : ℕ) : Polynomial ℝ :=
  TKReal k

theorem fdZeroNumeratorReal_eval
    (k : ℕ) (q : ℝ) :
    (fdZeroNumeratorReal k).eval q =
      ∑ index ∈ Finset.range (k - 1), q ^ (index + 1) := by
  unfold fdZeroNumeratorReal
  rw [eval_finsetSum]
  apply Finset.sum_congr rfl
  intro index _
  simp

theorem fdZeroNumeratorReal_eval_pos
    (k : ℕ) (hk : 2 ≤ k) :
    0 < (fdZeroNumeratorReal k).eval (adRoot k (by omega)) := by
  rw [fdZeroNumeratorReal_eval]
  have hterm :
      ∀ index ∈ Finset.range (k - 1),
        0 < adRoot k (by omega) ^ (index + 1) := by
    intro index _
    exact pow_pos (adRoot_pos k (by omega)) _
  have hzero : 0 ∈ Finset.range (k - 1) := by
    simp
    omega
  exact Finset.sum_pos' (fun index hindex => (hterm index hindex).le)
    ⟨0, hzero, hterm 0 hzero⟩

theorem TKReal_eval (k : ℕ) (q : ℝ) :
    (TKReal k).eval q = tkValue k q := by
  rw [TKReal, eval_map, eval₂_TK]

theorem foZeroNumeratorReal_eval_pos
    (k : ℕ) (hk : 2 ≤ k) :
    0 < (foZeroNumeratorReal k).eval (aoRoot k hk) := by
  rw [foZeroNumeratorReal, TKReal_eval]
  exact tkValue_pos k hk
    (aoRoot_pos k hk) (aoRoot_mem_Ioo k hk).2

noncomputable def fdZeroLeadingConstant
    (k : ℕ) (hk : 2 ≤ k) : ℝ :=
  (fdZeroNumeratorReal k).eval (adRoot k (by omega)) /
    (adDominantCofactor k (by omega)).eval (adRoot k (by omega))

noncomputable def foZeroLeadingConstant
    (k : ℕ) (hk : 2 ≤ k) : ℝ :=
  (foZeroNumeratorReal k).eval (aoRoot k hk) /
    (aoDominantCofactor k hk).eval (aoRoot k hk)

theorem fdZeroLeadingConstant_pos
    (k : ℕ) (hk : 2 ≤ k) :
    0 < fdZeroLeadingConstant k hk := by
  exact div_pos
    (fdZeroNumeratorReal_eval_pos k hk)
    (adDominantCofactor_eval_pos k (by omega))

theorem foZeroLeadingConstant_pos
    (k : ℕ) (hk : 2 ≤ k) :
    0 < foZeroLeadingConstant k hk := by
  exact div_pos
    (foZeroNumeratorReal_eval_pos k hk)
    (aoDominantCofactor_eval_pos k hk)

end FixedPerimeter
