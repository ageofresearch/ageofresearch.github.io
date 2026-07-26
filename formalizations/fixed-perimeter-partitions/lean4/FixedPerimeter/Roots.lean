import FixedPerimeter.Polynomials
import Mathlib.Topology.Algebra.Polynomial
import Mathlib.Topology.Order.IntermediateValue
import Mathlib.Tactic.Positivity

/-!
# Real roots of the denominator polynomials

This file isolates the analytic part of the comparison: both denominator
polynomials have roots between `1/2` and `1`, and later lemmas will show that
those roots are unique.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

open Polynomial Set

/-- Evaluation of an integer polynomial at a real argument. -/
noncomputable def realValue (p : Polynomial ℤ) (q : ℝ) : ℝ :=
  eval₂ (Int.castRingHom ℝ) q p

noncomputable def adValue (k : ℕ) (q : ℝ) : ℝ :=
  realValue (AD k) q

noncomputable def aoValue (k : ℕ) (q : ℝ) : ℝ :=
  realValue (AO k) q

theorem continuous_realValue (p : Polynomial ℤ) :
    Continuous (realValue p) :=
  p.continuous_eval₂ (Int.castRingHom ℝ)

theorem adValue_eq (k : ℕ) (q : ℝ) :
    adValue k q = 1 - ∑ i ∈ Finset.range k, q ^ (i + 1) := by
  simp only [adValue, realValue, AD, eval₂_sub, eval₂_one,
    eval₂_finsetSum, eval₂_pow, eval₂_X]

theorem aoValue_eq (k : ℕ) (q : ℝ) :
    aoValue k q = (1 - q) ^ (k - 1) - q ^ k := by
  simp only [aoValue, realValue, AO, eval₂_sub, eval₂_pow, eval₂_one,
    eval₂_X]

theorem half_geometric_sum (k : ℕ) :
    (∑ i ∈ Finset.range k, ((1 : ℝ) / 2) ^ (i + 1)) =
      1 - ((1 : ℝ) / 2) ^ k := by
  induction k with
  | zero => simp
  | succ k ih =>
      simp only [Finset.sum_range_succ, ih]
      ring

theorem adValue_half_pos (k : ℕ) :
    0 < adValue k ((1 : ℝ) / 2) := by
  rw [adValue_eq, half_geometric_sum]
  have hp : 0 < ((1 : ℝ) / 2) ^ k := pow_pos (by norm_num) k
  linarith

theorem adValue_one_nonpos (k : ℕ) (hk : 1 ≤ k) :
    adValue k 1 ≤ 0 := by
  rw [adValue_eq]
  simp
  exact_mod_cast hk

theorem adValue_one_neg (k : ℕ) (hk : 2 ≤ k) :
    adValue k 1 < 0 := by
  rw [adValue_eq]
  simp
  exact_mod_cast hk

theorem aoValue_half_pos (k : ℕ) (hk : 2 ≤ k) :
    0 < aoValue k ((1 : ℝ) / 2) := by
  obtain ⟨m, rfl⟩ := Nat.exists_eq_add_of_le hk
  rw [aoValue_eq]
  norm_num [pow_succ]
  rw [show 2 + m = (1 + m) + 1 by omega, pow_succ]
  have hp : 0 < ((1 : ℝ) / 2) ^ (1 + m) := pow_pos (by norm_num) _
  nlinarith

theorem aoValue_one_neg (k : ℕ) (hk : 2 ≤ k) :
    aoValue k 1 < 0 := by
  rw [aoValue_eq]
  have hkPred : k - 1 ≠ 0 := by omega
  simp [hkPred]

theorem exists_ad_root (k : ℕ) (hk : 1 ≤ k) :
    ∃ q ∈ Set.Icc ((1 : ℝ) / 2) 1, adValue k q = 0 := by
  have hzero :
      (0 : ℝ) ∈ Set.Icc (adValue k 1) (adValue k ((1 : ℝ) / 2)) :=
    ⟨adValue_one_nonpos k hk, (adValue_half_pos k).le⟩
  rcases intermediate_value_Icc' (show ((1 : ℝ) / 2) ≤ 1 by norm_num)
      (continuous_realValue (AD k)).continuousOn hzero with
    ⟨q, hq, hqZero⟩
  exact ⟨q, hq, hqZero⟩

theorem exists_ao_root (k : ℕ) (hk : 2 ≤ k) :
    ∃ q ∈ Set.Icc ((1 : ℝ) / 2) 1, aoValue k q = 0 := by
  have hzero :
      (0 : ℝ) ∈ Set.Icc (aoValue k 1) (aoValue k ((1 : ℝ) / 2)) :=
    ⟨(aoValue_one_neg k hk).le, (aoValue_half_pos k hk).le⟩
  rcases intermediate_value_Icc' (show ((1 : ℝ) / 2) ≤ 1 by norm_num)
      (continuous_realValue (AO k)).continuousOn hzero with
    ⟨q, hq, hqZero⟩
  exact ⟨q, hq, hqZero⟩

theorem strictAntiOn_adValue (k : ℕ) (hk : 1 ≤ k) :
    StrictAntiOn (adValue k) (Set.Ici 0) := by
  intro x hx y _ hxy
  rw [adValue_eq, adValue_eq]
  have hpow :
      ∀ i ∈ Finset.range k, x ^ (i + 1) < y ^ (i + 1) := by
    intro i _
    exact pow_lt_pow_left₀ hxy hx (by omega)
  have hzeroMem : 0 ∈ Finset.range k := Finset.mem_range.mpr (by omega)
  have hsum :
      (∑ i ∈ Finset.range k, x ^ (i + 1)) <
        ∑ i ∈ Finset.range k, y ^ (i + 1) :=
    Finset.sum_lt_sum
      (fun i hi => (hpow i hi).le)
      ⟨0, hzeroMem, hpow 0 hzeroMem⟩
  linarith

theorem strictAntiOn_aoValue (k : ℕ) (hk : 2 ≤ k) :
    StrictAntiOn (aoValue k) (Set.Icc 0 1) := by
  intro x hx y hy hxy
  rw [aoValue_eq, aoValue_eq]
  have hbaseNonneg : 0 ≤ 1 - y := by linarith [hy.2]
  have hbaseLe : 1 - y ≤ 1 - x := by linarith
  have hfirst :
      (1 - y) ^ (k - 1) ≤ (1 - x) ^ (k - 1) :=
    pow_le_pow_left₀ hbaseNonneg hbaseLe _
  have hsecond : x ^ k < y ^ k :=
    pow_lt_pow_left₀ hxy hx.1 (by omega)
  linarith

theorem ad_root_unique (k : ℕ) (hk : 1 ≤ k) {x y : ℝ}
    (hx : x ∈ Set.Icc ((1 : ℝ) / 2) 1)
    (hy : y ∈ Set.Icc ((1 : ℝ) / 2) 1)
    (hxZero : adValue k x = 0) (hyZero : adValue k y = 0) :
    x = y := by
  apply (strictAntiOn_adValue k hk).injOn
  · exact le_trans (by norm_num) hx.1
  · exact le_trans (by norm_num) hy.1
  · rw [hxZero, hyZero]

theorem ao_root_unique (k : ℕ) (hk : 2 ≤ k) {x y : ℝ}
    (hx : x ∈ Set.Icc ((1 : ℝ) / 2) 1)
    (hy : y ∈ Set.Icc ((1 : ℝ) / 2) 1)
    (hxZero : aoValue k x = 0) (hyZero : aoValue k y = 0) :
    x = y := by
  apply (strictAntiOn_aoValue k hk).injOn
  · exact ⟨le_trans (by norm_num) hx.1, hx.2⟩
  · exact ⟨le_trans (by norm_num) hy.1, hy.2⟩
  · rw [hxZero, hyZero]

/-- The unique `A_D` root in `[1/2, 1]`. -/
noncomputable def adRoot (k : ℕ) (hk : 1 ≤ k) : ℝ :=
  Classical.choose (exists_ad_root k hk)

theorem adRoot_mem (k : ℕ) (hk : 1 ≤ k) :
    adRoot k hk ∈ Set.Icc ((1 : ℝ) / 2) 1 :=
  (Classical.choose_spec (exists_ad_root k hk)).1

theorem adRoot_eq_zero (k : ℕ) (hk : 1 ≤ k) :
    adValue k (adRoot k hk) = 0 :=
  (Classical.choose_spec (exists_ad_root k hk)).2

/-- The unique `A_O` root in `[1/2, 1]`. -/
noncomputable def aoRoot (k : ℕ) (hk : 2 ≤ k) : ℝ :=
  Classical.choose (exists_ao_root k hk)

theorem aoRoot_mem (k : ℕ) (hk : 2 ≤ k) :
    aoRoot k hk ∈ Set.Icc ((1 : ℝ) / 2) 1 :=
  (Classical.choose_spec (exists_ao_root k hk)).1

theorem aoRoot_eq_zero (k : ℕ) (hk : 2 ≤ k) :
    aoValue k (aoRoot k hk) = 0 :=
  (Classical.choose_spec (exists_ao_root k hk)).2

theorem adRoot_mem_Ioo (k : ℕ) (hk : 2 ≤ k) :
    adRoot k (by omega) ∈ Set.Ioo ((1 : ℝ) / 2) 1 := by
  have hmem := adRoot_mem k (by omega)
  constructor
  · apply lt_of_le_of_ne hmem.1
    intro heq
    have hzero := adRoot_eq_zero k (by omega)
    rw [← heq] at hzero
    linarith [adValue_half_pos k]
  · apply lt_of_le_of_ne hmem.2
    intro heq
    have hzero := adRoot_eq_zero k (by omega)
    rw [heq] at hzero
    linarith [adValue_one_neg k hk]

theorem aoRoot_mem_Ioo (k : ℕ) (hk : 2 ≤ k) :
    aoRoot k hk ∈ Set.Ioo ((1 : ℝ) / 2) 1 := by
  have hmem := aoRoot_mem k hk
  constructor
  · apply lt_of_le_of_ne hmem.1
    intro heq
    have hzero := aoRoot_eq_zero k hk
    rw [← heq] at hzero
    linarith [aoValue_half_pos k hk]
  · apply lt_of_le_of_ne hmem.2
    intro heq
    have hzero := aoRoot_eq_zero k hk
    rw [heq] at hzero
    linarith [aoValue_one_neg k hk]

theorem adRoot_lt_aoRoot (k : ℕ) (hk : 3 ≤ k) :
    adRoot k (by omega) < aoRoot k (by omega) := by
  let d := adRoot k (by omega)
  let o := aoRoot k (by omega)
  have hdOpen : d ∈ Set.Ioo ((1 : ℝ) / 2) 1 :=
    adRoot_mem_Ioo k (by omega)
  have hoOpen : o ∈ Set.Ioo ((1 : ℝ) / 2) 1 :=
    aoRoot_mem_Ioo k (by omega)
  have hgap :
      0 < eval₂ (Int.castRingHom ℝ) d (AO k - AD k) :=
    eval₂_AO_sub_AD_pos hk hdOpen.1 hdOpen.2
  have hdZero : adValue k d = 0 := adRoot_eq_zero k (by omega)
  have hoZero : aoValue k o = 0 := aoRoot_eq_zero k (by omega)
  have hdEvalZero : eval₂ (Int.castRingHom ℝ) d (AD k) = 0 := by
    simpa only [adValue, realValue] using hdZero
  have haoPos : 0 < aoValue k d := by
    simpa only [eval₂_sub, aoValue, realValue, hdEvalZero, sub_zero]
      using hgap
  by_contra hnot
  have hod : o ≤ d := le_of_not_gt hnot
  have hoClosed : o ∈ Set.Icc 0 1 :=
    ⟨le_trans (by norm_num : (0 : ℝ) ≤ 1 / 2) hoOpen.1.le, hoOpen.2.le⟩
  have hdClosed : d ∈ Set.Icc 0 1 :=
    ⟨le_trans (by norm_num : (0 : ℝ) ≤ 1 / 2) hdOpen.1.le, hdOpen.2.le⟩
  have hvalueLe :=
    (strictAntiOn_aoValue k (by omega)).antitoneOn hoClosed hdClosed hod
  rw [hoZero] at hvalueLe
  linarith

end FixedPerimeter
