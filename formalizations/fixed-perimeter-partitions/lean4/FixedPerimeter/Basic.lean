import Mathlib.Algebra.Order.BigOperators.Group.Finset
import Mathlib.Data.Fin.Basic
import Mathlib.Data.Finset.Lattice.Fold
import Mathlib.Data.Fintype.Pi

/-!
# Bounded multiplicity model for fixed-perimeter partitions

For a fixed perimeter `n`, every part size and every multiplicity is at most
`n`.  We therefore represent a candidate partition by a multiplicity function

`Fin n → Fin (n + 1)`.

Index `i` represents part size `i + 1`.  The all-zero function is excluded.
This bounded representation makes the counting functions executable and avoids
having to enumerate finitely supported functions on an infinite type.
-/

set_option autoImplicit false

open scoped BigOperators

namespace FixedPerimeter

/-- Multiplicities for possible part sizes `1, …, n`. -/
abbrev Multiplicity (n : ℕ) := Fin n → Fin (n + 1)

/-- The part sizes that occur with positive multiplicity. -/
def support {n : ℕ} (m : Multiplicity n) : Finset (Fin n) :=
  Finset.univ.filter fun i => m i ≠ 0

/-- A bounded multiplicity vector represents a partition when it is nonempty. -/
def IsPartition {n : ℕ} (m : Multiplicity n) : Prop :=
  (support m).Nonempty

instance decidableIsPartition {n : ℕ} (m : Multiplicity n) :
    Decidable (IsPartition m) := by
  unfold IsPartition
  infer_instance

/-- Total number of parts, counted with multiplicity. -/
def numberOfParts {n : ℕ} (m : Multiplicity n) : ℕ :=
  ∑ i, (m i : ℕ)

/-- Largest occurring part size, or `0` for the empty multiplicity vector. -/
def largestPart {n : ℕ} (m : Multiplicity n) : ℕ :=
  (support m).sup fun i => i.val + 1

/-- Largest part plus number of parts minus one. -/
def perimeter {n : ℕ} (m : Multiplicity n) : ℕ :=
  largestPart m + numberOfParts m - 1

/-- Number of distinct occurring part sizes divisible by `k`. -/
def divisiblePresentCount {n : ℕ} (k : ℕ) (m : Multiplicity n) : ℕ :=
  ((support m).filter fun i => k ∣ i.val + 1).card

/-- Number of distinct part sizes occurring at least `k` times. -/
def frequentSizeCount {n : ℕ} (k : ℕ) (m : Multiplicity n) : ℕ :=
  ((support m).filter fun i => k ≤ (m i : ℕ)).card

/-- All nonempty bounded multiplicity vectors of perimeter `n`. -/
def fixedPerimeterPartitions (n : ℕ) : Finset (Multiplicity n) :=
  Finset.univ.filter fun m => IsPartition m ∧ perimeter m = n

/-- Fixed-perimeter partitions with exactly `j` present sizes divisible by `k`. -/
def FO (j k n : ℕ) : ℕ :=
  ((fixedPerimeterPartitions n).filter fun m =>
    divisiblePresentCount k m = j).card

/-- Fixed-perimeter partitions with exactly `j` sizes occurring at least `k` times. -/
def FD (j k n : ℕ) : ℕ :=
  ((fixedPerimeterPartitions n).filter fun m =>
    frequentSizeCount k m = j).card

@[simp] theorem mem_support_iff {n : ℕ} {m : Multiplicity n} {i : Fin n} :
    i ∈ support m ↔ m i ≠ 0 := by
  simp [support]

@[simp] theorem mem_fixedPerimeterPartitions_iff
    {n : ℕ} {m : Multiplicity n} :
    m ∈ fixedPerimeterPartitions n ↔ IsPartition m ∧ perimeter m = n := by
  simp [fixedPerimeterPartitions]

theorem numberOfParts_pos {n : ℕ} {m : Multiplicity n}
    (hm : IsPartition m) :
    0 < numberOfParts m := by
  rcases hm with ⟨i, hi⟩
  have hmi : 0 < (m i : ℕ) := by
    exact Fin.pos_iff_ne_zero.mpr (mem_support_iff.mp hi)
  have hle : (m i : ℕ) ≤ numberOfParts m := by
    simpa only [numberOfParts] using
      (Finset.single_le_sum
        (f := fun i : Fin n => (m i : ℕ))
        (fun _ _ => Nat.zero_le _)
        (Finset.mem_univ i))
  exact lt_of_lt_of_le hmi hle

theorem largestPart_pos {n : ℕ} {m : Multiplicity n}
    (hm : IsPartition m) :
    0 < largestPart m := by
  rcases hm with ⟨i, hi⟩
  have hle : i.val + 1 ≤ largestPart m := by
    exact Finset.le_sup (f := fun i : Fin n => i.val + 1) hi
  exact lt_of_lt_of_le (Nat.zero_lt_succ i.val) hle

theorem largestPart_le_indexBound {n : ℕ} (m : Multiplicity n) :
    largestPart m ≤ n := by
  apply Finset.sup_le
  intro i hi
  exact i.isLt

theorem perimeter_eq_add_sub_one {n : ℕ} {m : Multiplicity n}
    (hm : IsPartition m) :
    perimeter m + 1 = largestPart m + numberOfParts m := by
  unfold perimeter
  exact Nat.sub_add_cancel <|
    Nat.succ_le_of_lt (Nat.add_pos_right _ (numberOfParts_pos hm))

theorem fixed_perimeter_largestPart_le {n : ℕ} {m : Multiplicity n}
    (_hm : m ∈ fixedPerimeterPartitions n) :
    largestPart m ≤ n := by
  exact largestPart_le_indexBound m

theorem fixed_perimeter_numberOfParts_le {n : ℕ} {m : Multiplicity n}
    (hm : m ∈ fixedPerimeterPartitions n) :
    numberOfParts m ≤ n := by
  rw [mem_fixedPerimeterPartitions_iff] at hm
  have hadd := perimeter_eq_add_sub_one hm.1
  rw [hm.2] at hadd
  have hlargest : 1 ≤ largestPart m :=
    Nat.succ_le_of_lt (largestPart_pos hm.1)
  have hsucc : numberOfParts m + 1 ≤ n + 1 := by
    calc
      numberOfParts m + 1 ≤ numberOfParts m + largestPart m :=
        Nat.add_le_add_left hlargest _
      _ = largestPart m + numberOfParts m := Nat.add_comm _ _
      _ = n + 1 := hadd.symm
  exact Nat.le_of_succ_le_succ hsucc

end FixedPerimeter
