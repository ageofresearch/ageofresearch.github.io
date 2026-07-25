import FixedPerimeter.DominantRoots
import Mathlib.Algebra.Polynomial.Derivative
import Mathlib.Algebra.Polynomial.FieldDivision

/-!
# Simplicity of the dominant roots

The derivative is strictly negative at each positive dominant root.  Therefore
raising the corresponding denominator to the `(j+1)`st power produces exactly
the expected pole order.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

open Polynomial

theorem eval₂_derivative_AD (k : ℕ) (q : ℝ) :
    eval₂ (Int.castRingHom ℝ) q (derivative (AD k)) =
      -∑ i ∈ Finset.range k, ((i + 1 : ℕ) : ℝ) * q ^ i := by
  simp [AD, derivative_X_pow_succ]
  rw [eval₂_finsetSum]
  apply Finset.sum_congr rfl
  intro i _
  simp

theorem derivative_AD_at_root_neg (k : ℕ) (hk : 1 ≤ k) :
    eval₂ (Int.castRingHom ℝ) (adRoot k hk) (derivative (AD k)) < 0 := by
  rw [eval₂_derivative_AD]
  have hrootPos : 0 < adRoot k hk := by
    have hmem := adRoot_mem k hk
    exact lt_of_lt_of_le (by norm_num) hmem.1
  have hsumPos :
      0 < ∑ i ∈ Finset.range k,
        ((i + 1 : ℕ) : ℝ) * (adRoot k hk) ^ i := by
    have htermPos :
        ∀ i ∈ Finset.range k,
          0 < ((i + 1 : ℕ) : ℝ) * (adRoot k hk) ^ i := by
      intro i _
      exact mul_pos (by positivity) (pow_pos hrootPos _)
    have hzeroMem : 0 ∈ Finset.range k := Finset.mem_range.mpr (by omega)
    exact Finset.sum_pos' (fun i hi => (htermPos i hi).le)
      ⟨0, hzeroMem, htermPos 0 hzeroMem⟩
  linarith

theorem derivative_AD_at_root_ne_zero (k : ℕ) (hk : 1 ≤ k) :
    eval₂ (Int.castRingHom ℝ) (adRoot k hk) (derivative (AD k)) ≠ 0 :=
  ne_of_lt (derivative_AD_at_root_neg k hk)

theorem eval₂_derivative_AO (k : ℕ) (hk : 2 ≤ k) (q : ℝ) :
    eval₂ (Int.castRingHom ℝ) q (derivative (AO k)) =
      -((k - 1 : ℕ) : ℝ) * (1 - q) ^ (k - 2) -
        (k : ℝ) * q ^ (k - 1) := by
  have hExp : k - 1 - 1 = k - 2 := by omega
  have hPredNe : k - 1 ≠ 0 := by omega
  simp [AO, derivative_pow, hExp, hPredNe]
  rw [eval₂_pow, eval₂_sub, eval₂_one, eval₂_X]

theorem derivative_AO_at_root_neg (k : ℕ) (hk : 2 ≤ k) :
    eval₂ (Int.castRingHom ℝ) (aoRoot k hk) (derivative (AO k)) < 0 := by
  rw [eval₂_derivative_AO k hk]
  have hrootOpen := aoRoot_mem_Ioo k hk
  have hrootPos : 0 < aoRoot k hk :=
    lt_trans (by norm_num) hrootOpen.1
  have hbasePos : 0 < 1 - aoRoot k hk := sub_pos.mpr hrootOpen.2
  have hkPredPos : 0 < ((k - 1 : ℕ) : ℝ) := by
    exact_mod_cast (by omega : 0 < k - 1)
  have hkPos : 0 < (k : ℝ) := by
    exact_mod_cast (by omega : 0 < k)
  have hleft :
      0 < ((k - 1 : ℕ) : ℝ) * (1 - aoRoot k hk) ^ (k - 2) :=
    mul_pos hkPredPos (pow_pos hbasePos _)
  have hright :
      0 < (k : ℝ) * (aoRoot k hk) ^ (k - 1) :=
    mul_pos hkPos (pow_pos hrootPos _)
  linarith

theorem derivative_AO_at_root_ne_zero (k : ℕ) (hk : 2 ≤ k) :
    eval₂ (Int.castRingHom ℝ) (aoRoot k hk) (derivative (AO k)) ≠ 0 :=
  ne_of_lt (derivative_AO_at_root_neg k hk)

/-- `A_D` with its integer coefficients transported to `ℝ`. -/
noncomputable def ADReal (k : ℕ) : Polynomial ℝ :=
  (AD k).map (Int.castRingHom ℝ)

/-- `A_O` with its integer coefficients transported to `ℝ`. -/
noncomputable def AOReal (k : ℕ) : Polynomial ℝ :=
  (AO k).map (Int.castRingHom ℝ)

theorem ADReal_isRoot (k : ℕ) (hk : 1 ≤ k) :
    (ADReal k).IsRoot (adRoot k hk) := by
  rw [Polynomial.IsRoot, ADReal, eval_map]
  exact adRoot_eq_zero k hk

theorem AOReal_isRoot (k : ℕ) (hk : 2 ≤ k) :
    (AOReal k).IsRoot (aoRoot k hk) := by
  rw [Polynomial.IsRoot, AOReal, eval_map]
  exact aoRoot_eq_zero k hk

theorem derivative_ADReal_at_root_ne_zero (k : ℕ) (hk : 1 ≤ k) :
    (derivative (ADReal k)).eval (adRoot k hk) ≠ 0 := by
  rw [ADReal, derivative_map, eval_map]
  exact derivative_AD_at_root_ne_zero k hk

theorem derivative_AOReal_at_root_ne_zero (k : ℕ) (hk : 2 ≤ k) :
    (derivative (AOReal k)).eval (aoRoot k hk) ≠ 0 := by
  rw [AOReal, derivative_map, eval_map]
  exact derivative_AO_at_root_ne_zero k hk

theorem ADReal_rootMultiplicity (k : ℕ) (hk : 1 ≤ k) :
    (ADReal k).rootMultiplicity (adRoot k hk) = 1 := by
  have hderiv := derivative_ADReal_at_root_ne_zero k hk
  have hpNe : ADReal k ≠ 0 := by
    intro hp
    rw [hp, derivative_zero, eval_zero] at hderiv
    exact hderiv rfl
  have hpos :
      0 < (ADReal k).rootMultiplicity (adRoot k hk) :=
    (rootMultiplicity_pos hpNe).2 (ADReal_isRoot k hk)
  have hnotTwo :
      ¬1 < (ADReal k).rootMultiplicity (adRoot k hk) := by
    rw [one_lt_rootMultiplicity_iff_isRoot hpNe]
    intro hmultiple
    exact hderiv hmultiple.2
  omega

theorem AOReal_rootMultiplicity (k : ℕ) (hk : 2 ≤ k) :
    (AOReal k).rootMultiplicity (aoRoot k hk) = 1 := by
  have hderiv := derivative_AOReal_at_root_ne_zero k hk
  have hpNe : AOReal k ≠ 0 := by
    intro hp
    rw [hp, derivative_zero, eval_zero] at hderiv
    exact hderiv rfl
  have hpos :
      0 < (AOReal k).rootMultiplicity (aoRoot k hk) :=
    (rootMultiplicity_pos hpNe).2 (AOReal_isRoot k hk)
  have hnotTwo :
      ¬1 < (AOReal k).rootMultiplicity (aoRoot k hk) := by
    rw [one_lt_rootMultiplicity_iff_isRoot hpNe]
    intro hmultiple
    exact hderiv hmultiple.2
  omega

end FixedPerimeter
