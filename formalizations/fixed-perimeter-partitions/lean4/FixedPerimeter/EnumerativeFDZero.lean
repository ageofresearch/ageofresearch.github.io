import FixedPerimeter.CompositionModel
import FixedPerimeter.FixedJSeries
import FixedPerimeter.SeriesTransport

/-!
# Exact enumeration for the zero-frequency `FD` branch

When no multiplicity reaches `k`, every block in the terminal-composition
model is at most `k`.  This file develops the first-block recurrence for those
bounded terminal compositions.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

abbrev BoundedTerminalComposition (k weight : ℕ) :=
  {terminal : TerminalComposition weight //
    ∀ block ∈ terminal.1.blocks, block ≤ k}

theorem blockFrequentCount_eq_zero_iff
    (k : ℕ) (blocks : List ℕ) :
    blockFrequentCount k blocks = 0 ↔
      ∀ block ∈ blocks, block ≤ k := by
  unfold blockFrequentCount
  induction blocks with
  | nil => simp
  | cons block blocks ih =>
      simp only [List.countP_cons]
      by_cases hlarge : k + 1 ≤ block
      · have hnotLe : ¬block ≤ k := by omega
        simp [hlarge, hnotLe]
      · have hle : block ≤ k := by omega
        simp [hlarge, hle, ih]

theorem terminalFD_zero_eq_bounded_card
    (k n : ℕ) :
    TerminalFD 0 k n =
      Fintype.card (BoundedTerminalComposition k (n + 1)) := by
  unfold TerminalFD
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun terminal => by
      exact blockFrequentCount_eq_zero_iff k terminal.1.blocks

theorem canonicalFD_zero_eq_bounded_card
    (k n : ℕ) :
    CanonicalFD 0 k n =
      Fintype.card (BoundedTerminalComposition k (n + 1)) := by
  rw [canonicalFD_eq_terminalFD]
  exact terminalFD_zero_eq_bounded_card k n

/-- Admissible first blocks for a non-singleton bounded terminal
composition. -/
abbrev BoundedTerminalHead (k weight : ℕ) :=
  {head : ℕ // 1 ≤ head ∧ head ≤ k ∧ head < weight}

noncomputable instance boundedTerminalHeadFintype (k weight : ℕ) :
    Fintype (BoundedTerminalHead k weight) :=
  Fintype.ofInjective
    (fun head : BoundedTerminalHead k weight =>
      (⟨head.1, head.2.2.2⟩ : Fin weight))
    (by
      intro left right hequal
      apply Subtype.ext
      exact congrArg Fin.val hequal)

/-- The singleton branch exists exactly when its only block lies in
`[2,k]`. -/
abbrev BoundedTerminalSingletonCase (k weight : ℕ) :=
  {unit : Unit // 2 ≤ weight ∧ weight ≤ k}

abbrev BoundedTerminalSplit (k weight : ℕ) :=
  BoundedTerminalSingletonCase k weight ⊕
    (Σ head : BoundedTerminalHead k weight,
      BoundedTerminalComposition k (weight - head.1))

def boundedTerminalSingleton
    {k weight : ℕ} (hTwo : 2 ≤ weight) (hBound : weight ≤ k) :
    BoundedTerminalComposition k weight := by
  let composition : Composition weight :=
    Composition.single weight (by omega)
  have hblocks : composition.blocks = [weight] := by
    simp [composition]
  refine ⟨⟨composition, ?_⟩, ?_⟩
  · refine ⟨weight, ?_, hTwo⟩
    simp [hblocks]
  · intro block hblock
    simp [hblocks] at hblock
    simpa [hblock] using hBound

def boundedTerminalCons
    {k weight : ℕ}
    (head : BoundedTerminalHead k weight)
    (tail :
      BoundedTerminalComposition k (weight - head.1)) :
    BoundedTerminalComposition k weight := by
  let composition : Composition weight := {
    blocks := head.1 :: tail.1.1.blocks
    blocks_pos := by
      intro block hblock
      rcases List.mem_cons.mp hblock with hhead | htail
      · subst block
        omega
      · exact tail.1.1.blocks_pos htail
    blocks_sum := by
      simp only [List.sum_cons, tail.1.1.blocks_sum]
      omega
  }
  refine ⟨⟨composition, ?_⟩, ?_⟩
  · rcases tail.1.2 with ⟨last, hlast, hlastTwo⟩
    refine ⟨last, ?_, hlastTwo⟩
    rcases htailBlocks : tail.1.1.blocks with _ | ⟨first, rest⟩
    · simp [htailBlocks] at hlast
    · simpa [composition, htailBlocks] using hlast
  · intro block hblock
    change block ∈ head.1 :: tail.1.1.blocks at hblock
    rcases List.mem_cons.mp hblock with hhead | htail
    · simpa [hhead] using head.2.2.1
    · exact tail.2 block htail

def joinBoundedTerminal
    {k weight : ℕ}
    (split : BoundedTerminalSplit k weight) :
    BoundedTerminalComposition k weight :=
  match split with
  | Sum.inl singleton =>
      boundedTerminalSingleton singleton.2.1 singleton.2.2
  | Sum.inr branch =>
      boundedTerminalCons branch.1 branch.2

theorem terminalComposition_blocks_ne_nil
    {weight : ℕ} (terminal : TerminalComposition weight) :
    terminal.1.blocks ≠ [] := by
  intro hnil
  rcases terminal.2 with ⟨last, hlast, _⟩
  simpa [hnil] using hlast

theorem joinBoundedTerminal_injective
    {k weight : ℕ}
    : Function.Injective
        (joinBoundedTerminal :
          BoundedTerminalSplit k weight →
            BoundedTerminalComposition k weight) := by
  intro left right hequal
  rcases left with left | left <;>
    rcases right with right | right
  · congr
    apply Subtype.ext
    cases left.1
    cases right.1
    rfl
  · have hblocks :=
      congrArg (fun terminal => terminal.1.1.blocks) hequal
    have hnil : right.2.1.1.blocks = [] := by
      simpa [joinBoundedTerminal, boundedTerminalSingleton,
        boundedTerminalCons] using congrArg List.tail hblocks
    exact (terminalComposition_blocks_ne_nil right.2.1 hnil).elim
  · have hblocks :=
      congrArg (fun terminal => terminal.1.1.blocks) hequal
    have hnil : left.2.1.1.blocks = [] := by
      simpa [joinBoundedTerminal, boundedTerminalSingleton,
        boundedTerminalCons] using congrArg List.tail hblocks.symm
    exact (terminalComposition_blocks_ne_nil left.2.1 hnil).elim
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg (fun terminal => terminal.1.1.blocks) hequal
    change
      leftHead.1 :: leftTail.1.1.blocks =
        rightHead.1 :: rightTail.1.1.blocks at hblocks
    injection hblocks with hhead htail
    have hheads : leftHead = rightHead := Subtype.ext hhead
    subst rightHead
    have htails : leftTail = rightTail := by
      apply Subtype.ext
      apply Subtype.ext
      apply Composition.ext
      exact htail
    subst rightTail
    rfl

theorem joinBoundedTerminal_surjective
    {k weight : ℕ}
    : Function.Surjective
        (joinBoundedTerminal :
          BoundedTerminalSplit k weight →
            BoundedTerminalComposition k weight) := by
  intro terminal
  rcases hblocks : terminal.1.1.blocks with _ | ⟨head, tail⟩
  · have hfalse : False := by
      exact terminalComposition_blocks_ne_nil terminal.1 hblocks
    exact hfalse.elim
  · rcases htail : tail with _ | ⟨next, rest⟩
    · have hsum := terminal.1.1.blocks_sum
      simp only [hblocks, htail, List.sum_cons, List.sum_nil,
        Nat.add_zero] at hsum
      have hTwo : 2 ≤ weight := by
        rcases terminal.1.2 with ⟨last, hlast, hlastTwo⟩
        have hheadLast : head = last := by
          simpa [hblocks, htail] using hlast
        omega
      have hBound : weight ≤ k := by
        have := terminal.2 head (by simp [hblocks, htail])
        omega
      refine ⟨Sum.inl ⟨(), hTwo, hBound⟩, ?_⟩
      apply Subtype.ext
      apply Subtype.ext
      apply Composition.ext
      simp [joinBoundedTerminal, boundedTerminalSingleton,
        hblocks, htail, hsum]
    · have hheadPos : 0 < head :=
        terminal.1.1.blocks_pos (by simp [hblocks])
      have hnextPos : 0 < next :=
        terminal.1.1.blocks_pos (by simp [hblocks, htail])
      have hheadBound : head ≤ k :=
        terminal.2 head (by simp [hblocks])
      have hheadLt : head < weight := by
        have hsum := terminal.1.1.blocks_sum
        simp only [hblocks, htail, List.sum_cons] at hsum
        omega
      have htailSum : (next :: rest).sum = weight - head := by
        have hsum : head + (next :: rest).sum = weight := by
          calc
            head + (next :: rest).sum =
                (head :: next :: rest).sum := by simp
            _ = terminal.1.1.blocks.sum := by
              rw [hblocks, htail]
            _ = weight := terminal.1.1.blocks_sum
        omega
      let admissibleHead : BoundedTerminalHead k weight :=
        ⟨head, by omega, hheadBound, hheadLt⟩
      let tailComposition : Composition (weight - head) := {
        blocks := next :: rest
        blocks_pos := by
          intro block hblock
          apply terminal.1.1.blocks_pos
          simp only [hblocks, htail, List.mem_cons]
          exact Or.inr (by
            simpa only [List.mem_cons] using hblock)
        blocks_sum := htailSum
      }
      let tailTerminal : TerminalComposition (weight - head) :=
        ⟨tailComposition, by
          rcases terminal.1.2 with ⟨last, hlast, hlastTwo⟩
          refine ⟨last, ?_, hlastTwo⟩
          simpa [hblocks, htail, tailComposition] using hlast⟩
      let boundedTail :
          BoundedTerminalComposition k (weight - head) :=
        ⟨tailTerminal, by
          intro block hblock
          apply terminal.2 block
          simp only [hblocks, htail, List.mem_cons]
          exact Or.inr (by
            simpa [tailTerminal, tailComposition] using hblock)⟩
      refine ⟨Sum.inr ⟨admissibleHead, boundedTail⟩, ?_⟩
      apply Subtype.ext
      apply Subtype.ext
      apply Composition.ext
      simp [joinBoundedTerminal, boundedTerminalCons, admissibleHead,
        boundedTail, tailTerminal, tailComposition, hblocks, htail]

noncomputable def boundedTerminalSplitEquiv (k weight : ℕ) :
    BoundedTerminalSplit k weight ≃
      BoundedTerminalComposition k weight :=
  Equiv.ofBijective joinBoundedTerminal
    ⟨joinBoundedTerminal_injective,
      joinBoundedTerminal_surjective⟩

theorem boundedTerminal_card_split (k weight : ℕ) :
    Fintype.card (BoundedTerminalComposition k weight) =
      Fintype.card (BoundedTerminalSingletonCase k weight) +
        ∑ head : BoundedTerminalHead k weight,
          Fintype.card
            (BoundedTerminalComposition k (weight - head.1)) := by
  rw [← Fintype.card_congr (boundedTerminalSplitEquiv k weight)]
  simp only [BoundedTerminalSplit, Fintype.card_sum,
    Fintype.card_sigma]

theorem fdZeroDenominator_coeff_formula (k n : ℕ) :
    (fdZeroDenominator k).coeff n =
      if n = 0 then 1 else if n ≤ k then -1 else 0 := by
  classical
  simp [fdZeroDenominator, mapIntPolynomialToRat, AD]
  cases n with
  | zero => simp
  | succ n =>
      by_cases hle : n + 1 ≤ k
      · rw [if_pos hle]
        have hfilter :
            {x ∈ Finset.range k | n + 1 = x + 1} = {n} := by
          ext x
          simp
          omega
        rw [hfilter]
        simp [Polynomial.coeff_one]
      · rw [if_neg hle]
        have hfilter :
            {x ∈ Finset.range k | n + 1 = x + 1} = ∅ := by
          ext x
          simp
          omega
        rw [hfilter]
        simp [Polynomial.coeff_one]

theorem fdZeroNumerator_coeff_formula (k n : ℕ) :
    (fdZeroNumerator k).coeff n =
      if 1 ≤ n ∧ n < k then 1 else 0 := by
  classical
  simp [fdZeroNumerator]
  by_cases hn : 1 ≤ n ∧ n < k
  · simp only [if_pos hn]
    have hfilter :
        {x ∈ Finset.range (k - 1) | n = x + 1} =
          {n - 1} := by
      ext x
      simp
      omega
    rw [hfilter]
    simp
  · simp only [if_neg hn]
    have hfilter :
        {x ∈ Finset.range (k - 1) | n = x + 1} = ∅ := by
      ext x
      simp
      omega
    rw [hfilter]
    simp

noncomputable def boundedTerminalHeadIndexEquiv (k n : ℕ) :
    BoundedTerminalHead k (n + 1) ≃
      {index : ℕ //
        index ∈ Finset.filter
          (fun index => index + 1 ≤ k) (Finset.range n)} where
  toFun head := ⟨head.1 - 1, by
    simp only [Finset.mem_filter, Finset.mem_range]
    constructor <;> omega⟩
  invFun index := ⟨index.1 + 1, by
    have hindex := index.2
    simp only [Finset.mem_filter, Finset.mem_range] at hindex
    omega⟩
  left_inv head := by
    apply Subtype.ext
    change head.1 - 1 + 1 = head.1
    omega
  right_inv index := by
    apply Subtype.ext
    change (index.1 + 1) - 1 = index.1
    omega

theorem boundedTerminal_head_sum_eq_filter
    (k n : ℕ) :
    (∑ head : BoundedTerminalHead k (n + 1),
        (Fintype.card
          (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ)) =
      ∑ index ∈ Finset.range n,
        if index + 1 ≤ k then
          (Fintype.card
            (BoundedTerminalComposition k (n - index)) : ℚ)
        else 0 := by
  let admissibleIndices :=
    Finset.filter (fun index => index + 1 ≤ k) (Finset.range n)
  calc
    (∑ head : BoundedTerminalHead k (n + 1),
        (Fintype.card
          (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ)) =
        ∑ index : {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (BoundedTerminalComposition k (n - index.1)) : ℚ) := by
      apply Fintype.sum_equiv (boundedTerminalHeadIndexEquiv k n)
      intro head
      have hweight :
          (n + 1) - head.1 = n - (head.1 - 1) := by
        omega
      change
        (Fintype.card
            (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ) =
          (Fintype.card
            (BoundedTerminalComposition k (n - (head.1 - 1))) : ℚ)
      rw [hweight]
    _ = ∑ index ∈ admissibleIndices,
          (Fintype.card
            (BoundedTerminalComposition k (n - index)) : ℚ) := by
      exact Finset.sum_attach admissibleIndices
        (fun index =>
          (Fintype.card
            (BoundedTerminalComposition k (n - index)) : ℚ))
    _ = ∑ index ∈ Finset.range n,
          if index + 1 ≤ k then
            (Fintype.card
              (BoundedTerminalComposition k (n - index)) : ℚ)
          else 0 := by
      simp [admissibleIndices, Finset.sum_filter]

theorem fdZero_convolution_eq_range (k n : ℕ) :
    (∑ pair ∈ Finset.antidiagonal n,
        (fdZeroDenominator k).coeff pair.1 *
          (CanonicalFD 0 k pair.2 : ℚ)) =
      (CanonicalFD 0 k n : ℚ) -
        ∑ index ∈ Finset.range n,
          if index + 1 ≤ k then
            (CanonicalFD 0 k (n - (index + 1)) : ℚ)
          else 0 := by
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.sum_range_succ']
  simp only [fdZeroDenominator_coeff_formula]
  simp only [Nat.add_eq_zero, one_ne_zero, and_false, if_false,
    Nat.zero_le, if_true, Nat.sub_zero, one_mul]
  simp only [ite_mul, neg_one_mul, zero_mul]
  have hnegative :
      (∑ index ∈ Finset.range n,
          if index + 1 ≤ k then
            -(CanonicalFD 0 k (n - (index + 1)) : ℚ)
          else 0) =
        -(∑ index ∈ Finset.range n,
          if index + 1 ≤ k then
            (CanonicalFD 0 k (n - (index + 1)) : ℚ)
          else 0) := by
    rw [← Finset.sum_neg_distrib]
    apply Finset.sum_congr rfl
    intro index _
    by_cases hindex : index + 1 ≤ k <;> simp [hindex]
  rw [hnegative]
  ring

theorem canonicalFD_zero_filter_eq_head (k n : ℕ) :
    (∑ index ∈ Finset.range n,
        if index + 1 ≤ k then
          (CanonicalFD 0 k (n - (index + 1)) : ℚ)
        else 0) =
      ∑ head : BoundedTerminalHead k (n + 1),
        (Fintype.card
          (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ) := by
  rw [boundedTerminal_head_sum_eq_filter]
  apply Finset.sum_congr rfl
  intro index hindex
  by_cases hbound : index + 1 ≤ k
  · simp only [if_pos hbound]
    rw [canonicalFD_zero_eq_bounded_card]
    have hindexLt : index < n := Finset.mem_range.mp hindex
    have hweight :
        n - (index + 1) + 1 = n - index := by
      omega
    rw [hweight]
  · simp [hbound]

theorem boundedTerminalSingletonCase_card (k weight : ℕ) :
    Fintype.card (BoundedTerminalSingletonCase k weight) =
      if 2 ≤ weight ∧ weight ≤ k then 1 else 0 := by
  classical
  by_cases hadmissible : 2 ≤ weight ∧ weight ≤ k
  · simp [BoundedTerminalSingletonCase, hadmissible]
  · simp [BoundedTerminalSingletonCase, hadmissible]

theorem canonicalFD_zero_recurrence (k n : ℕ) :
    (∑ pair ∈ Finset.antidiagonal n,
        (fdZeroDenominator k).coeff pair.1 *
          (CanonicalFD 0 k pair.2 : ℚ)) =
      (fdZeroNumerator k).coeff n := by
  rw [fdZero_convolution_eq_range,
    canonicalFD_zero_filter_eq_head,
    canonicalFD_zero_eq_bounded_card,
    fdZeroNumerator_coeff_formula]
  have hsplit := boundedTerminal_card_split k (n + 1)
  have hcast := congrArg (fun value : ℕ => (value : ℚ)) hsplit
  simp only [Nat.cast_add, Nat.cast_sum] at hcast
  rw [hcast]
  have hcancel :
      (Fintype.card (BoundedTerminalSingletonCase k (n + 1)) : ℚ) +
          (∑ head : BoundedTerminalHead k (n + 1),
            (Fintype.card
              (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ)) -
          (∑ head : BoundedTerminalHead k (n + 1),
            (Fintype.card
              (BoundedTerminalComposition k ((n + 1) - head.1)) : ℚ)) =
        (Fintype.card
          (BoundedTerminalSingletonCase k (n + 1)) : ℚ) := by
    ring
  rw [hcancel, boundedTerminalSingletonCase_card]
  by_cases hn : 1 ≤ n ∧ n < k
  · have hadmissible : 2 ≤ n + 1 ∧ n + 1 ≤ k := by
      omega
    simp [hn, hadmissible]
  · have hnotAdmissible : ¬(2 ≤ n + 1 ∧ n + 1 ≤ k) := by
      omega
    simp [hn, hnotAdmissible]

theorem canonicalFD_zero_series (k : ℕ) :
    seriesOf (fun n => (CanonicalFD 0 k n : ℚ)) =
      rationalSeries (fdZeroNumerator k) (fdZeroDenominator k) := by
  rw [canonicalFD_zero_series_iff_recurrence]
  exact canonicalFD_zero_recurrence k

theorem canonicalFD_zero_asymptotic
    (k : ℕ) (hk : 2 ≤ k) :
    (fun n => (CanonicalFD 0 k n : ℝ)) ~[atTop]
      coefficientModel
        (fdZeroLeadingConstant k hk) 0
        (adRoot k (by omega)) :=
  canonicalFD_zero_asymptotic_of_series k hk
    (canonicalFD_zero_series k)

end FixedPerimeter
