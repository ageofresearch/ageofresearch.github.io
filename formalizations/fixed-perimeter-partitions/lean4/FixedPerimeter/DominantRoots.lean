import FixedPerimeter.Roots
import Mathlib.Analysis.Complex.Basic

/-!
# Minimum-modulus denominator roots

The positive real root must be compared with every complex root before it can
serve as the unique dominant singularity of a rational generating function.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

open Polynomial

theorem eval₂_AD_eq (k : ℕ) (z : ℂ) :
    eval₂ (Int.castRingHom ℂ) z (AD k) =
      1 - ∑ i ∈ Finset.range k, z ^ (i + 1) := by
  simp only [AD, eval₂_sub, eval₂_one, eval₂_finsetSum, eval₂_pow,
    eval₂_X]

theorem eval₂_AO_eq (k : ℕ) (z : ℂ) :
    eval₂ (Int.castRingHom ℂ) z (AO k) =
      (1 - z) ^ (k - 1) - z ^ k := by
  simp only [AO, eval₂_sub, eval₂_pow, eval₂_one, eval₂_X]

/-- Every complex root of `A_D` lies on or outside its positive real root. -/
theorem AD_root_modulus_ge (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AD k) = 0) :
    adRoot k (by omega) ≤ ‖z‖ := by
  have hzSum : (∑ i ∈ Finset.range k, z ^ (i + 1)) = 1 := by
    rw [eval₂_AD_eq] at hz
    exact (sub_eq_zero.mp hz).symm
  have htriangle :
      (1 : ℝ) ≤ ∑ i ∈ Finset.range k, ‖z‖ ^ (i + 1) := by
    calc
      (1 : ℝ) = ‖(1 : ℂ)‖ := by simp
      _ = ‖∑ i ∈ Finset.range k, z ^ (i + 1)‖ := by rw [hzSum]
      _ ≤ ∑ i ∈ Finset.range k, ‖z ^ (i + 1)‖ :=
        norm_sum_le _ _
      _ = ∑ i ∈ Finset.range k, ‖z‖ ^ (i + 1) := by
        apply Finset.sum_congr rfl
        intro i _
        exact norm_pow z (i + 1)
  have hrootZero := adRoot_eq_zero k (by omega)
  have hrootSum :
      (∑ i ∈ Finset.range k,
        (adRoot k (by omega)) ^ (i + 1)) = 1 := by
    rw [adValue_eq] at hrootZero
    linarith
  by_contra hnot
  have hlt : ‖z‖ < adRoot k (by omega) := lt_of_not_ge hnot
  have hsumLt :
      (∑ i ∈ Finset.range k, ‖z‖ ^ (i + 1)) <
        ∑ i ∈ Finset.range k, (adRoot k (by omega)) ^ (i + 1) := by
    have hpow :
        ∀ i ∈ Finset.range k,
          ‖z‖ ^ (i + 1) <
            (adRoot k (by omega)) ^ (i + 1) := by
      intro i _
      exact pow_lt_pow_left₀ hlt (norm_nonneg z) (by omega)
    have hzeroMem : 0 ∈ Finset.range k := Finset.mem_range.mpr (by omega)
    exact Finset.sum_lt_sum
      (fun i hi => (hpow i hi).le)
      ⟨0, hzeroMem, hpow 0 hzeroMem⟩
  rw [hrootSum] at hsumLt
  linarith

/-- The positive real root is the only `A_D` root on the minimum-modulus
circle. -/
theorem AD_root_modulus_eq (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AD k) = 0)
    (hmod : ‖z‖ = adRoot k (by omega)) :
    z = (adRoot k (by omega) : ℂ) := by
  have hzSum : (∑ i ∈ Finset.range k, z ^ (i + 1)) = 1 := by
    rw [eval₂_AD_eq] at hz
    exact (sub_eq_zero.mp hz).symm
  have hreSum :
      (∑ i ∈ Finset.range k, (z ^ (i + 1)).re) = 1 := by
    have := congrArg Complex.re hzSum
    simpa using this
  have hrootZero := adRoot_eq_zero k (by omega)
  have hrootSum :
      (∑ i ∈ Finset.range k,
        (adRoot k (by omega)) ^ (i + 1)) = 1 := by
    rw [adValue_eq] at hrootZero
    linarith
  have htermLe :
      ∀ i ∈ Finset.range k,
        (z ^ (i + 1)).re ≤
          (adRoot k (by omega)) ^ (i + 1) := by
    intro i _
    calc
      (z ^ (i + 1)).re ≤ ‖z ^ (i + 1)‖ := Complex.re_le_norm _
      _ = ‖z‖ ^ (i + 1) := norm_pow _ _
      _ = (adRoot k (by omega)) ^ (i + 1) := by rw [hmod]
  have hreLe : z.re ≤ adRoot k (by omega) := by
    simpa using htermLe 0 (Finset.mem_range.mpr (by omega))
  have hre : z.re = adRoot k (by omega) := by
    by_contra hne
    have hreLt : z.re < adRoot k (by omega) :=
      lt_of_le_of_ne hreLe hne
    have hzeroMem : 0 ∈ Finset.range k := Finset.mem_range.mpr (by omega)
    have hsumLt :
        (∑ i ∈ Finset.range k, (z ^ (i + 1)).re) <
          ∑ i ∈ Finset.range k,
            (adRoot k (by omega)) ^ (i + 1) :=
      Finset.sum_lt_sum htermLe
        ⟨0, hzeroMem, by simpa using hreLt⟩
    rw [hreSum, hrootSum] at hsumLt
    exact (lt_irrefl 1) hsumLt
  have himSq : z.im * z.im = 0 := by
    have hnormSq := Complex.normSq_eq_norm_sq z
    rw [Complex.normSq_apply, hmod, ← hre] at hnormSq
    nlinarith
  have him : z.im = 0 := mul_self_eq_zero.mp himSq
  apply Complex.ext
  · simpa using hre
  · simpa using him

/-- Every complex root of `A_O` lies on or outside its positive real root. -/
theorem AO_root_modulus_ge (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AO k) = 0) :
    aoRoot k hk ≤ ‖z‖ := by
  have hzEq : (1 - z) ^ (k - 1) = z ^ k := by
    rw [eval₂_AO_eq] at hz
    exact sub_eq_zero.mp hz
  have hnormEq : ‖1 - z‖ ^ (k - 1) = ‖z‖ ^ k := by
    have := congrArg norm hzEq
    simpa only [norm_pow] using this
  by_contra hnot
  have hlt : ‖z‖ < aoRoot k hk := lt_of_not_ge hnot
  have hrootOpen := aoRoot_mem_Ioo k hk
  have hnormLtOne : ‖z‖ < 1 := lt_trans hlt hrootOpen.2
  have hbaseNonneg : 0 ≤ 1 - ‖z‖ := by linarith
  have hreverse : 1 - ‖z‖ ≤ ‖1 - z‖ := by
    simpa using norm_sub_norm_le (1 : ℂ) z
  have hpow :
      (1 - ‖z‖) ^ (k - 1) ≤ ‖z‖ ^ k := by
    calc
      (1 - ‖z‖) ^ (k - 1) ≤ ‖1 - z‖ ^ (k - 1) :=
        pow_le_pow_left₀ hbaseNonneg hreverse _
      _ = ‖z‖ ^ k := hnormEq
  have hvalueNonpos : aoValue k ‖z‖ ≤ 0 := by
    rw [aoValue_eq]
    linarith
  have hnormClosed : ‖z‖ ∈ Set.Icc 0 1 :=
    ⟨norm_nonneg z, hnormLtOne.le⟩
  have hrootClosed : aoRoot k hk ∈ Set.Icc 0 1 :=
    ⟨le_trans (by norm_num : (0 : ℝ) ≤ 1 / 2) hrootOpen.1.le,
      hrootOpen.2.le⟩
  have hstrict :=
    strictAntiOn_aoValue k hk hnormClosed hrootClosed hlt
  rw [aoRoot_eq_zero k hk] at hstrict
  linarith

/-- The positive real root is the only `A_O` root on the minimum-modulus
circle. -/
theorem AO_root_modulus_eq (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AO k) = 0)
    (hmod : ‖z‖ = aoRoot k hk) :
    z = (aoRoot k hk : ℂ) := by
  let r := aoRoot k hk
  have hmodR : ‖z‖ = r := hmod
  have hrOpen : r ∈ Set.Ioo ((1 : ℝ) / 2) 1 := aoRoot_mem_Ioo k hk
  have hzEq : (1 - z) ^ (k - 1) = z ^ k := by
    rw [eval₂_AO_eq] at hz
    exact sub_eq_zero.mp hz
  have hnormEq : ‖1 - z‖ ^ (k - 1) = ‖z‖ ^ k := by
    have := congrArg norm hzEq
    simpa only [norm_pow] using this
  have hrZero : aoValue k r = 0 := aoRoot_eq_zero k hk
  have hrEq : (1 - r) ^ (k - 1) = r ^ k := by
    rw [aoValue_eq] at hrZero
    exact sub_eq_zero.mp hrZero
  have hpowEq : ‖1 - z‖ ^ (k - 1) = (1 - r) ^ (k - 1) := by
    rw [hnormEq, hmodR, hrEq]
  have hrLtOne : r < 1 := hrOpen.2
  have hbaseNonneg : 0 ≤ 1 - r := by linarith
  have hreverse : 1 - r ≤ ‖1 - z‖ := by
    have hreverseZ := norm_sub_norm_le (1 : ℂ) z
    rw [hmodR] at hreverseZ
    simpa using hreverseZ
  have hbaseEq : ‖1 - z‖ = 1 - r := by
    apply le_antisymm
    · by_contra hnot
      have hgt : 1 - r < ‖1 - z‖ := lt_of_not_ge hnot
      have hp :=
        pow_lt_pow_left₀ hgt hbaseNonneg (by omega : k - 1 ≠ 0)
      rw [hpowEq] at hp
      exact (lt_irrefl _) hp
    · exact hreverse
  have hnormSqZ := Complex.normSq_eq_norm_sq z
  have hnormSqSub := Complex.normSq_eq_norm_sq (1 - z)
  rw [Complex.normSq_apply, hmodR] at hnormSqZ
  rw [Complex.normSq_apply] at hnormSqSub
  simp only [Complex.sub_re, Complex.one_re, Complex.sub_im,
    Complex.one_im, zero_sub] at hnormSqSub
  have hre : z.re = r := by
    rw [hbaseEq] at hnormSqSub
    nlinarith
  have himSq : z.im * z.im = 0 := by
    rw [← hre] at hnormSqZ
    nlinarith
  have him : z.im = 0 := mul_self_eq_zero.mp himSq
  apply Complex.ext
  · simpa using hre
  · simpa using him

theorem AD_other_root_modulus_gt (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AD k) = 0)
    (hzNe : z ≠ (adRoot k (by omega) : ℂ)) :
    adRoot k (by omega) < ‖z‖ := by
  apply lt_of_le_of_ne (AD_root_modulus_ge k hk hz)
  intro heq
  exact hzNe (AD_root_modulus_eq k hk hz heq.symm)

theorem AO_other_root_modulus_gt (k : ℕ) (hk : 2 ≤ k) {z : ℂ}
    (hz : eval₂ (Int.castRingHom ℂ) z (AO k) = 0)
    (hzNe : z ≠ (aoRoot k hk : ℂ)) :
    aoRoot k hk < ‖z‖ := by
  apply lt_of_le_of_ne (AO_root_modulus_ge k hk hz)
  intro heq
  exact hzNe (AO_root_modulus_eq k hk hz heq.symm)

end FixedPerimeter
