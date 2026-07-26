import Mathlib.Algebra.Polynomial.Eval.Defs
import Mathlib.Algebra.Order.BigOperators.Group.Finset
import Mathlib.Data.Real.Basic
import Mathlib.Tactic.LinearCombination
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

/-!
# Denominator and numerator polynomials

This file records the four integer polynomials that occur after extracting the
fixed-`j` generating functions.  Keeping them over `ℤ` lets us prove the
algebraic identities before choosing a real or complex interpretation.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

open Polynomial

/-- `A_D(q) = 1 - q - q² - ⋯ - qᵏ`. -/
noncomputable def AD (k : ℕ) : Polynomial ℤ :=
  1 - ∑ i ∈ Finset.range k, X ^ (i + 1)

/-- `A_O(q) = (1-q)^(k-1) - qᵏ`. -/
noncomputable def AO (k : ℕ) : Polynomial ℤ :=
  (1 - X) ^ (k - 1) - X ^ k

/-- Unfactored denominator in the bivariate `FD` generating function. -/
noncomputable def PD (k : ℕ) : Polynomial ℤ :=
  1 - 2 * X + X ^ (k + 1)

/-- Unfactored denominator in the bivariate `FO` generating function. -/
noncomputable def PO (k : ℕ) : Polynomial ℤ :=
  (1 - X) ^ k - X ^ k + X ^ (k + 1)

/-- Numerator polynomial in the positive-`j` `FO` generating function. -/
noncomputable def RK (k : ℕ) : Polynomial ℤ :=
  (1 - X) ^ (k - 2) +
    ∑ s ∈ Finset.Icc 2 (k - 1),
      X ^ s * (1 - X) ^ (k - 1 - s)

/-- Numerator polynomial in the `j = 0` `FO` generating function. -/
noncomputable def TK (k : ℕ) : Polynomial ℤ :=
  ∑ r ∈ Finset.Icc 1 (k - 1),
      X ^ r * (1 - X) ^ (k - r - 1)

/-- Polynomial whose positive evaluation separates the two dominant roots. -/
noncomputable def rootGap (k : ℕ) : Polynomial ℤ :=
  X * ∑ exponent ∈ Finset.range (k - 1),
    (X ^ exponent - (1 - X) ^ exponent)

theorem AD_two : AD 2 = 1 - X - X ^ 2 := by
  simp [AD, Finset.sum_range_succ]
  ring

theorem AO_two : AO 2 = 1 - X - X ^ 2 := by
  simp [AO]

theorem AD_two_eq_AO_two : AD 2 = AO 2 := by
  rw [AD_two, AO_two]

theorem RK_two : RK 2 = 1 := by
  simp [RK]

theorem TK_two : TK 2 = X := by
  simp [TK]

theorem AO_sub_AD_eq_rootGap (k : ℕ) (hk : 1 ≤ k) :
    AO k - AD k = rootGap k := by
  obtain ⟨m, rfl⟩ := Nat.exists_eq_add_of_le hk
  induction m with
  | zero =>
      simp [AO, AD, rootGap]
  | succ m ih =>
      have hindex : 1 + (m + 1) = (1 + m) + 1 := by omega
      have hsumX :
          (∑ x ∈ Finset.range (1 + m + 1),
              (X : Polynomial ℤ) ^ (x + 1)) =
            (∑ x ∈ Finset.range m, (X : Polynomial ℤ) ^ (x + 1)) +
              X ^ (m + 1) + X ^ (m + 2) := by
        rw [show 1 + m + 1 = (m + 1) + 1 by omega]
        simp only [Finset.sum_range_succ]
      rw [hindex]
      simp [AO, AD, rootGap, Finset.sum_range_succ, Nat.add_comm] at ih ⊢
      rw [show 1 + (m + 1) = 1 + m + 1 by omega, hsumX]
      linear_combination ih

theorem PD_factor (k : ℕ) :
    PD k = (1 - X) * AD k := by
  induction k with
  | zero =>
      simp [PD, AD]
      ring
  | succ k ih =>
      simp [PD, AD, Finset.sum_range_succ] at ih ⊢
      linear_combination ih

theorem PO_factor (k : ℕ) (hk : 1 ≤ k) :
    PO k = (1 - X) * AO k := by
  obtain ⟨m, rfl⟩ := Nat.exists_eq_add_of_le hk
  simp [PO, AO, pow_succ]
  ring

/-- Real evaluation of the polynomial that separates the two denominators. -/
noncomputable def rootGapValue (k : ℕ) (q : ℝ) : ℝ :=
  q * ∑ exponent ∈ Finset.range (k - 1),
    (q ^ exponent - (1 - q) ^ exponent)

theorem eval₂_rootGap (k : ℕ) (q : ℝ) :
    eval₂ (Int.castRingHom ℝ) q (rootGap k) = rootGapValue k q := by
  unfold rootGap rootGapValue
  rw [eval₂_mul, eval₂_X]
  congr 1
  simp only [eval₂_sub, eval₂_finsetSum, eval₂_pow, eval₂_X, eval₂_one]

theorem rootGapValue_pos {k : ℕ} (hk : 3 ≤ k) {q : ℝ}
    (hqLower : (1 : ℝ) / 2 < q) (hqUpper : q < 1) :
    0 < rootGapValue k q := by
  have hqPos : 0 < q := by linarith
  have hbaseNonneg : 0 ≤ 1 - q := by linarith
  have hbaseLe : 1 - q ≤ q := by linarith
  have htermNonneg :
      ∀ exponent ∈ Finset.range (k - 1),
        0 ≤ q ^ exponent - (1 - q) ^ exponent := by
    intro exponent _
    exact sub_nonneg.mpr (pow_le_pow_left₀ hbaseNonneg hbaseLe exponent)
  have honeMem : 1 ∈ Finset.range (k - 1) := by
    simp only [Finset.mem_range]
    omega
  have honePos : 0 < q ^ 1 - (1 - q) ^ 1 := by
    simp only [pow_one]
    linarith
  have hsumPos :
      0 < ∑ exponent ∈ Finset.range (k - 1),
        (q ^ exponent - (1 - q) ^ exponent) :=
    Finset.sum_pos' htermNonneg ⟨1, honeMem, honePos⟩
  exact mul_pos hqPos hsumPos

theorem eval₂_AO_sub_AD_pos {k : ℕ} (hk : 3 ≤ k) {q : ℝ}
    (hqLower : (1 : ℝ) / 2 < q) (hqUpper : q < 1) :
    0 < eval₂ (Int.castRingHom ℝ) q (AO k - AD k) := by
  rw [AO_sub_AD_eq_rootGap k (by omega), eval₂_rootGap]
  exact rootGapValue_pos hk hqLower hqUpper

/-- Real evaluation of the positive-`j` `FO` numerator. -/
noncomputable def rkValue (k : ℕ) (q : ℝ) : ℝ :=
  (1 - q) ^ (k - 2) +
    ∑ s ∈ Finset.Icc 2 (k - 1),
      q ^ s * (1 - q) ^ (k - 1 - s)

/-- Real evaluation of the `j = 0` `FO` numerator. -/
noncomputable def tkValue (k : ℕ) (q : ℝ) : ℝ :=
  ∑ r ∈ Finset.Icc 1 (k - 1),
    q ^ r * (1 - q) ^ (k - r - 1)

theorem eval₂_RK (k : ℕ) (q : ℝ) :
    eval₂ (Int.castRingHom ℝ) q (RK k) = rkValue k q := by
  simp only [RK, rkValue, eval₂_add, eval₂_pow, eval₂_sub, eval₂_one,
    eval₂_X, eval₂_finsetSum, eval₂_mul]

theorem eval₂_TK (k : ℕ) (q : ℝ) :
    eval₂ (Int.castRingHom ℝ) q (TK k) = tkValue k q := by
  simp only [TK, tkValue, eval₂_finsetSum, eval₂_mul, eval₂_pow,
    eval₂_sub, eval₂_one, eval₂_X]

theorem rkValue_pos (k : ℕ) {q : ℝ} (hqPos : 0 < q) (hqUpper : q < 1) :
    0 < rkValue k q := by
  have hbasePos : 0 < 1 - q := by linarith
  have hsumNonneg :
      0 ≤ ∑ s ∈ Finset.Icc 2 (k - 1),
        q ^ s * (1 - q) ^ (k - 1 - s) := by
    exact Finset.sum_nonneg fun s _ =>
      mul_nonneg (pow_nonneg hqPos.le _) (pow_nonneg hbasePos.le _)
  exact add_pos_of_pos_of_nonneg (pow_pos hbasePos _) hsumNonneg

theorem tkValue_pos (k : ℕ) (hk : 2 ≤ k) {q : ℝ}
    (hqPos : 0 < q) (hqUpper : q < 1) :
    0 < tkValue k q := by
  have hbasePos : 0 < 1 - q := by linarith
  have htermPos :
      ∀ r ∈ Finset.Icc 1 (k - 1),
        0 < q ^ r * (1 - q) ^ (k - r - 1) := by
    intro r _
    exact mul_pos (pow_pos hqPos _) (pow_pos hbasePos _)
  have honeMem : 1 ∈ Finset.Icc 1 (k - 1) := by
    simp only [Finset.mem_Icc]
    omega
  exact Finset.sum_pos' (fun r hr => (htermPos r hr).le)
    ⟨1, honeMem, htermPos 1 honeMem⟩

end FixedPerimeter
