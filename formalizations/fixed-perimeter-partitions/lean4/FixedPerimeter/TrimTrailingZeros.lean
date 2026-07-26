import FixedPerimeter.MultiplicityBijection

/-!
# Canonical removal of trailing zero multiplicities

The executable partition representation stores all possible part sizes up to
the perimeter bound.  Canonical multiplicity lists instead stop at the largest
present part.  This file supplies the normalization operation and its basic
invariants.
-/

set_option autoImplicit false

namespace FixedPerimeter

def trimTrailingZeros : List ℕ → List ℕ
  | [] => []
  | head :: tail =>
      match trimTrailingZeros tail with
      | [] => if head = 0 then [] else [head]
      | next :: rest => head :: next :: rest

theorem sum_trimTrailingZeros (values : List ℕ) :
    (trimTrailingZeros values).sum = values.sum := by
  induction values with
  | nil => rfl
  | cons head tail ih =>
      simp only [trimTrailingZeros]
      split
      next htrim =>
        have hsumTail : tail.sum = 0 := by
          calc
            tail.sum = (trimTrailingZeros tail).sum := ih.symm
            _ = 0 := by rw [htrim]; rfl
        by_cases hhead : head = 0
        · simp [hhead, hsumTail]
        · simp [hhead, hsumTail]
      next next rest htrim =>
        simp only [List.sum_cons]
        have ih' := ih
        rw [htrim] at ih'
        simpa only [List.sum_cons] using
          congrArg (head + ·) ih'

theorem trimTrailingZeros_nil_or_canonical (values : List ℕ) :
    trimTrailingZeros values = [] ∨
      IsCanonicalMultiplicities (trimTrailingZeros values) := by
  induction values with
  | nil => exact Or.inl rfl
  | cons head tail ih =>
      simp only [trimTrailingZeros]
      split
      next htrim =>
        by_cases hhead : head = 0
        · exact Or.inl (by simp [hhead])
        · exact Or.inr (by simp [hhead, IsCanonicalMultiplicities])
      next next rest htrim =>
        have hcanonical :
            IsCanonicalMultiplicities (next :: rest) := by
          rcases ih with hempty | hcanonical
          · rw [htrim] at hempty
            contradiction
          · simpa [htrim] using hcanonical
        exact Or.inr (canonical_cons head hcanonical)

theorem mem_trimTrailingZeros_iff_of_ne_zero
    {value : ℕ} (hvalue : value ≠ 0) :
    ∀ values : List ℕ,
      value ∈ trimTrailingZeros values ↔ value ∈ values
  | [] => by simp [trimTrailingZeros]
  | head :: tail => by
      have ih :=
        mem_trimTrailingZeros_iff_of_ne_zero hvalue tail
      simp only [trimTrailingZeros]
      split
      next htrim =>
        have hnotTail : value ∉ tail := by
          intro hmem
          have : value ∈ trimTrailingZeros tail := ih.mpr hmem
          rw [htrim] at this
          simp at this
        by_cases hhead : head = 0
        · simp [hhead, hvalue, hnotTail]
        · simp [hhead, hnotTail]
      next next rest htrim =>
        simp only [List.mem_cons]
        rw [← ih]
        rw [htrim]
        simp only [List.mem_cons]

theorem length_trimTrailingZeros_le (values : List ℕ) :
    (trimTrailingZeros values).length ≤ values.length := by
  induction values with
  | nil => simp [trimTrailingZeros]
  | cons head tail ih =>
      simp only [trimTrailingZeros]
      split
      next htrim =>
        by_cases hhead : head = 0
        · simp [hhead]
        · simp [hhead]
      next next rest htrim =>
        simp only [List.length_cons]
        rw [htrim] at ih
        simp only [List.length_cons] at ih
        omega

/-- Trimming removes exactly a terminal block of zeros. -/
theorem exists_eq_trimTrailingZeros_append_replicate_zero
    (values : List ℕ) :
    ∃ count : ℕ,
      values =
        trimTrailingZeros values ++ List.replicate count 0 := by
  induction values with
  | nil => exact ⟨0, by simp [trimTrailingZeros]⟩
  | cons head tail ih =>
      rcases ih with ⟨count, htail⟩
      simp only [trimTrailingZeros]
      split
      next htrim =>
        by_cases hhead : head = 0
        · subst head
          refine ⟨count + 1, ?_⟩
          simp only [if_pos rfl]
          rw [htail, htrim]
          simp only [List.nil_append]
          rw [show count + 1 = count.succ by omega,
            List.replicate_succ]
          simp
        · refine ⟨count, ?_⟩
          simp only [if_neg hhead]
          rw [htail, htrim]
          simp
      next next rest htrim =>
        refine ⟨count, ?_⟩
        rw [htail, htrim]
        simp

theorem length_trimTrailingZeros_add_removed
    (values : List ℕ) :
    ∃ count : ℕ,
      (trimTrailingZeros values).length + count = values.length := by
  rcases exists_eq_trimTrailingZeros_append_replicate_zero values with
    ⟨count, hvalues⟩
  refine ⟨count, ?_⟩
  have hlength := congrArg List.length hvalues
  simp only [List.length_append, List.length_replicate] at hlength
  omega

theorem getElem_eq_zero_of_trimTrailingZeros_length_le
    (values : List ℕ) (index : ℕ)
    (hindex : index < values.length)
    (htrim : (trimTrailingZeros values).length ≤ index) :
    values[index] = 0 := by
  rcases exists_eq_trimTrailingZeros_append_replicate_zero values with
    ⟨count, hvalues⟩
  have hlength := congrArg List.length hvalues
  simp only [List.length_append, List.length_replicate] at hlength
  have hremaining :
      index - (trimTrailingZeros values).length < count := by
    omega
  apply Option.some_injective
  rw [← List.getElem?_eq_getElem hindex]
  rw [hvalues]
  rw [List.getElem?_append_right htrim]
  rw [List.getElem?_replicate, if_pos hremaining]

theorem trimTrailingZeros_injective_of_length_eq
    {left right : List ℕ}
    (hLength : left.length = right.length)
    (hTrim :
      trimTrailingZeros left = trimTrailingZeros right) :
    left = right := by
  rcases exists_eq_trimTrailingZeros_append_replicate_zero left with
    ⟨leftRemoved, hleft⟩
  rcases exists_eq_trimTrailingZeros_append_replicate_zero right with
    ⟨rightRemoved, hright⟩
  have hleftLength := congrArg List.length hleft
  have hrightLength := congrArg List.length hright
  simp only [List.length_append, List.length_replicate] at hleftLength hrightLength
  rw [hLength, hTrim] at hleftLength
  have hremoved : leftRemoved = rightRemoved := by omega
  rw [hleft, hright, hTrim, hremoved]

theorem trimTrailingZeros_append_zero (values : List ℕ) :
    trimTrailingZeros (values ++ [0]) =
      trimTrailingZeros values := by
  induction values with
  | nil => simp [trimTrailingZeros]
  | cons head tail ih =>
      simp only [List.cons_append, trimTrailingZeros]
      rw [ih]

theorem trimTrailingZeros_append_replicate_zero
    (values : List ℕ) (count : ℕ) :
    trimTrailingZeros (values ++ List.replicate count 0) =
      trimTrailingZeros values := by
  induction count generalizing values with
  | zero => simp
  | succ count ih =>
      rw [List.replicate_succ]
      rw [show values ++ 0 :: List.replicate count 0 =
          (values ++ [0]) ++ List.replicate count 0 by simp]
      rw [ih, trimTrailingZeros_append_zero]

theorem trimTrailingZeros_eq_self_of_canonical
    {values : List ℕ}
    (hCanonical : IsCanonicalMultiplicities values) :
    trimTrailingZeros values = values := by
  induction values with
  | nil => contradiction
  | cons head tail ih =>
      cases tail with
      | nil =>
          have hhead : head ≠ 0 := by
            simpa [IsCanonicalMultiplicities] using hCanonical
          simp [trimTrailingZeros, hhead]
      | cons next rest =>
          have htail :
              IsCanonicalMultiplicities (next :: rest) := by
            simpa [IsCanonicalMultiplicities] using hCanonical
          have ihTail := ih htail
          change
            (match trimTrailingZeros (next :: rest) with
              | [] => if head = 0 then [] else [head]
              | first :: remaining => head :: first :: remaining) =
              head :: next :: rest
          rw [ihTail]

end FixedPerimeter
