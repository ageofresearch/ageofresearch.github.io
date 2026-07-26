import FixedPerimeter.CompositionModel
import FixedPerimeter.EnumerativeFDZero
import FixedPerimeter.FixedJSeries
import Mathlib.Data.Fintype.Fin

/-!
# Exact enumeration for the positive-frequency `FD` branch

For `j > 0`, the `FD` statistic marks precisely the composition blocks whose
size is at least `k + 1`.  This file begins the exact marked-block
decomposition used to derive the fixed-`j` rational series.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- Positions of the blocks that contribute to the `FD` statistic. -/
def frequentBlockPositions
    (k : ℕ) (blocks : List ℕ) :
    Finset (Fin blocks.length) :=
  Finset.univ.filter fun position =>
    k + 1 ≤ blocks.get position

theorem card_frequentBlockPositions
    (k : ℕ) (blocks : List ℕ) :
    (frequentBlockPositions k blocks).card =
      blockFrequentCount k blocks := by
  induction blocks with
  | nil =>
      simp [frequentBlockPositions, blockFrequentCount]
  | cons block rest ih =>
      rw [frequentBlockPositions]
      change
        (Finset.univ.filter fun position :
            Fin (rest.length + 1) =>
          k + 1 ≤ (block :: rest).get position).card =
        blockFrequentCount k (block :: rest)
      rw [Fin.card_filter_univ_succ']
      change
        (if k + 1 ≤ block then 1 else 0) +
            (frequentBlockPositions k rest).card =
          blockFrequentCount k (block :: rest)
      rw [ih]
      unfold blockFrequentCount
      rw [List.countP_cons]
      by_cases hlarge : k + 1 ≤ block
      · have hlt : k < block := by omega
        simp [hlt, Nat.add_comm]
      · have hnlt : ¬k < block := by omega
        simp [hnlt]

/-- Terminal compositions with exactly `j` marked large blocks. -/
abbrev MarkedFDTerminalComposition
    (j k weight : ℕ) :=
  {terminal : TerminalComposition weight //
    (frequentBlockPositions
      k terminal.1.blocks).card = j}

theorem terminalFD_eq_marked_card
    (j k n : ℕ) :
    TerminalFD j k n =
      Fintype.card
        (MarkedFDTerminalComposition j k (n + 1)) := by
  unfold TerminalFD
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun terminal => by
      rw [card_frequentBlockPositions]

theorem canonicalFD_eq_marked_card
    (j k n : ℕ) :
    CanonicalFD j k n =
      Fintype.card
        (MarkedFDTerminalComposition j k (n + 1)) := by
  rw [canonicalFD_eq_terminalFD]
  exact terminalFD_eq_marked_card j k n

/-- Small blocks are the unmarked positions and lie in `1, …, k`. -/
theorem unmarked_fd_block_le
    {j k weight : ℕ}
    (terminal : MarkedFDTerminalComposition j k weight)
    (position : Fin terminal.1.1.blocks.length)
    (hunmarked :
      position ∉ frequentBlockPositions
        k terminal.1.1.blocks) :
    terminal.1.1.blocks.get position ≤ k := by
  simp only [frequentBlockPositions,
    Finset.mem_filter, Finset.mem_univ, true_and,
    not_le] at hunmarked
  omega

/-- Marked blocks have a unique nonnegative excess above `k + 1`. -/
def frequentBlockExcess
    {j k weight : ℕ}
    (terminal : MarkedFDTerminalComposition j k weight)
    (position :
      {position : Fin terminal.1.1.blocks.length //
        position ∈ frequentBlockPositions
          k terminal.1.1.blocks}) : ℕ :=
  terminal.1.1.blocks.get position.1 - (k + 1)

theorem frequentBlockExcess_reconstruct
    {j k weight : ℕ}
    (terminal : MarkedFDTerminalComposition j k weight)
    (position :
      {position : Fin terminal.1.1.blocks.length //
        position ∈ frequentBlockPositions
          k terminal.1.1.blocks}) :
    terminal.1.1.blocks.get position.1 =
      k + 1 + frequentBlockExcess terminal position := by
  have hlarge :
      k + 1 ≤ terminal.1.1.blocks.get position.1 := by
    have hmembership := position.2
    change
      position.1 ∈
        Finset.univ.filter (fun blockPosition =>
          k + 1 ≤
            terminal.1.1.blocks.get blockPosition) at hmembership
    exact (Finset.mem_filter.mp hmembership).2
  unfold frequentBlockExcess
  omega

/-- The fixed-length fiber used to separate position choices from block
values. -/
abbrev MarkedFDTerminalFixedLength
    (j k weight length : ℕ) :=
  {terminal : MarkedFDTerminalComposition j k weight //
    terminal.1.1.blocks.length = length}

@[ext] structure FDTerminalVector
    (j k weight length : ℕ) where
  blocks : Fin length → ℕ
  length_pos : 0 < length
  blocks_pos : ∀ position, 0 < blocks position
  blocks_sum : ∑ position, blocks position = weight
  frequent_count :
    (Finset.univ.filter fun position =>
      k + 1 ≤ blocks position).card = j
  last_two : 2 ≤ blocks ⟨length - 1, by omega⟩

def fdTerminalVectorFrequentPositions
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :
    Finset (Fin length) :=
  Finset.univ.filter fun position =>
    k + 1 ≤ vector.blocks position

@[simp] theorem card_fdTerminalVectorFrequentPositions
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :
    (fdTerminalVectorFrequentPositions vector).card = j :=
  vector.frequent_count

abbrev FDMarkedVectorPosition
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :=
  {position : Fin length //
    position ∈ fdTerminalVectorFrequentPositions vector}

abbrev FDUnmarkedVectorPosition
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :=
  {position : Fin length //
    position ∉ fdTerminalVectorFrequentPositions vector}

theorem fdTerminalVector_unmarked_le
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length)
    (position : FDUnmarkedVectorPosition vector) :
    vector.blocks position.1 ≤ k := by
  have hunmarked := position.2
  simp only [fdTerminalVectorFrequentPositions,
    Finset.mem_filter, Finset.mem_univ, true_and,
    not_le] at hunmarked
  omega

def fdTerminalVectorMarkedExcess
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length)
    (position : FDMarkedVectorPosition vector) : ℕ :=
  vector.blocks position.1 - (k + 1)

theorem fdTerminalVectorMarkedExcess_reconstruct
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length)
    (position : FDMarkedVectorPosition vector) :
    vector.blocks position.1 =
      k + 1 +
        fdTerminalVectorMarkedExcess vector position := by
  have hmarked := position.2
  have hlarge :
      k + 1 ≤ vector.blocks position.1 := by
    change
      position.1 ∈
        Finset.univ.filter (fun blockPosition =>
          k + 1 ≤ vector.blocks blockPosition) at hmarked
    exact (Finset.mem_filter.mp hmarked).2
  unfold fdTerminalVectorMarkedExcess
  omega

theorem card_fdMarkedVectorPosition
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :
    Fintype.card (FDMarkedVectorPosition vector) = j := by
  change
    Fintype.card
      {position : Fin length //
        position ∈
          fdTerminalVectorFrequentPositions vector} = j
  rw [Fintype.card_coe]
  exact vector.frequent_count

theorem card_fdUnmarkedVectorPosition
    {j k weight length : ℕ}
    (vector : FDTerminalVector j k weight length) :
    Fintype.card (FDUnmarkedVectorPosition vector) =
      length - j := by
  rw [Fintype.card_subtype_compl
    (fun position : Fin length =>
      position ∈ fdTerminalVectorFrequentPositions vector)]
  rw [card_fdMarkedVectorPosition vector]
  simp

/-- Arbitrary (possibly empty) compositions whose blocks are all unmarked. -/
abbrev BoundedComposition (k weight : ℕ) :=
  {composition : Composition weight //
    ∀ block ∈ composition.blocks, block ≤ k}

abbrev BoundedCompositionEmptyCase (weight : ℕ) :=
  {unit : Unit // weight = 0}

abbrev BoundedCompositionHead (k weight : ℕ) :=
  {head : Fin (weight + 1) //
    1 ≤ head.1 ∧ head.1 ≤ k}

abbrev BoundedCompositionSplit (k weight : ℕ) :=
  BoundedCompositionEmptyCase weight ⊕
    (Σ head : BoundedCompositionHead k weight,
      BoundedComposition k (weight - head.1))

def boundedCompositionEmpty
    {weight : ℕ} (hzero : weight = 0) :
    BoundedComposition 0 weight := by
  subst weight
  exact ⟨⟨[], by simp, by simp⟩, by simp⟩

def boundedCompositionEmptyFor
    (k : ℕ) {weight : ℕ} (hzero : weight = 0) :
    BoundedComposition k weight := by
  subst weight
  exact ⟨⟨[], by simp, by simp⟩, by simp⟩

def boundedCompositionCons
    {k weight : ℕ}
    (head : BoundedCompositionHead k weight)
    (tail : BoundedComposition k (weight - head.1)) :
    BoundedComposition k weight := by
  let composition : Composition weight := {
    blocks := head.1 :: tail.1.blocks
    blocks_pos := by
      intro block hblock
      rcases List.mem_cons.mp hblock with hhead | htail
      · subst block
        exact head.2.1
      · exact tail.1.blocks_pos htail
    blocks_sum := by
      simp only [List.sum_cons, tail.1.blocks_sum]
      omega
  }
  exact ⟨composition, by
    intro block hblock
    rcases List.mem_cons.mp hblock with hhead | htail
    · simpa [hhead] using head.2.2
    · exact tail.2 block htail⟩

def joinBoundedComposition
    {k weight : ℕ}
    (split : BoundedCompositionSplit k weight) :
    BoundedComposition k weight :=
  match split with
  | Sum.inl empty =>
      boundedCompositionEmptyFor k empty.2
  | Sum.inr branch =>
      boundedCompositionCons branch.1 branch.2

theorem joinBoundedComposition_injective
    {k weight : ℕ} :
    Function.Injective
      (joinBoundedComposition :
        BoundedCompositionSplit k weight →
          BoundedComposition k weight) := by
  intro left right hequal
  rcases left with left | left <;>
    rcases right with right | right
  · congr
    apply Subtype.ext
    cases left.1
    cases right.1
    rfl
  · have hblocks :=
      congrArg (fun composition => composition.1.blocks) hequal
    rcases left with ⟨⟨⟩, hzero⟩
    subst weight
    simp [joinBoundedComposition,
      boundedCompositionEmptyFor,
      boundedCompositionCons] at hblocks
  · have hblocks :=
      congrArg (fun composition => composition.1.blocks) hequal
    rcases right with ⟨⟨⟩, hzero⟩
    subst weight
    simp [joinBoundedComposition,
      boundedCompositionEmptyFor,
      boundedCompositionCons] at hblocks
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg (fun composition => composition.1.blocks) hequal
    change
      leftHead.1.1 :: leftTail.1.blocks =
        rightHead.1.1 :: rightTail.1.blocks at hblocks
    injection hblocks with hhead htail
    have hheads : leftHead = rightHead := by
      apply Subtype.ext
      apply Fin.ext
      exact hhead
    subst rightHead
    have htails : leftTail = rightTail := by
      apply Subtype.ext
      apply Composition.ext
      exact htail
    subst rightTail
    rfl

theorem joinBoundedComposition_surjective
    {k weight : ℕ} :
    Function.Surjective
      (joinBoundedComposition :
        BoundedCompositionSplit k weight →
          BoundedComposition k weight) := by
  intro composition
  rcases hblocks : composition.1.blocks with _ | ⟨head, tail⟩
  · have hzero : weight = 0 := by
      have hsum := composition.1.blocks_sum
      simpa [hblocks] using hsum.symm
    refine ⟨Sum.inl ⟨(), hzero⟩, ?_⟩
    subst weight
    apply Subtype.ext
    apply Composition.ext
    simp [joinBoundedComposition,
      boundedCompositionEmptyFor, hblocks]
  · have hheadPos : 1 ≤ head :=
      composition.1.one_le_blocks (by simp [hblocks])
    have hheadBound : head ≤ k :=
      composition.2 head (by simp [hblocks])
    have hheadWeight : head ≤ weight := by
      rw [← composition.1.blocks_sum, hblocks]
      simp
    have htailSum : tail.sum = weight - head := by
      have hsum := composition.1.blocks_sum
      rw [hblocks] at hsum
      simp only [List.sum_cons] at hsum
      omega
    let admissibleHead :
        BoundedCompositionHead k weight :=
      ⟨⟨head, by omega⟩, hheadPos, hheadBound⟩
    let tailComposition : Composition (weight - head) := {
      blocks := tail
      blocks_pos := by
        intro block hblock
        apply composition.1.blocks_pos
        simp [hblocks, hblock]
      blocks_sum := htailSum
    }
    let boundedTail :
        BoundedComposition k (weight - head) :=
      ⟨tailComposition, by
        intro block hblock
        apply composition.2 block
        simp [hblocks, tailComposition, hblock]⟩
    refine
      ⟨Sum.inr ⟨admissibleHead, boundedTail⟩, ?_⟩
    apply Subtype.ext
    apply Composition.ext
    simp [joinBoundedComposition,
      boundedCompositionCons, admissibleHead,
      boundedTail, tailComposition, hblocks]

noncomputable def boundedCompositionSplitEquiv
    (k weight : ℕ) :
    BoundedCompositionSplit k weight ≃
      BoundedComposition k weight :=
  Equiv.ofBijective joinBoundedComposition
    ⟨joinBoundedComposition_injective,
      joinBoundedComposition_surjective⟩

theorem boundedComposition_card_split
    (k weight : ℕ) :
    Fintype.card (BoundedComposition k weight) =
      Fintype.card (BoundedCompositionEmptyCase weight) +
        ∑ head : BoundedCompositionHead k weight,
          Fintype.card
            (BoundedComposition k (weight - head.1)) := by
  rw [← Fintype.card_congr
    (boundedCompositionSplitEquiv k weight)]
  simp only [BoundedCompositionSplit,
    Fintype.card_sum, Fintype.card_sigma]

noncomputable def boundedCompositionHeadIndexEquiv
    (k weight : ℕ) :
    BoundedCompositionHead k weight ≃
      {index : ℕ //
        index ∈ Finset.filter
          (fun index => index + 1 ≤ k)
          (Finset.range weight)} where
  toFun head := ⟨head.1.1 - 1, by
    simp only [Finset.mem_filter, Finset.mem_range]
    constructor <;> omega⟩
  invFun index := by
    have hindex := index.2
    simp only [Finset.mem_filter, Finset.mem_range] at hindex
    have hlt : index.1 + 1 < weight + 1 := by
      omega
    refine ⟨⟨index.1 + 1, hlt⟩, ?_⟩
    exact ⟨Nat.succ_pos index.1, hindex.2⟩
  left_inv head := by
    apply Subtype.ext
    apply Fin.ext
    change head.1.1 - 1 + 1 = head.1.1
    omega
  right_inv index := by
    apply Subtype.ext
    change (index.1 + 1) - 1 = index.1
    omega

theorem boundedComposition_head_sum_eq_filter
    (k weight : ℕ) :
    (∑ head : BoundedCompositionHead k weight,
        (Fintype.card
          (BoundedComposition k
            (weight - head.1.1)) : ℚ)) =
      ∑ index ∈ Finset.range weight,
        if index + 1 ≤ k then
          (Fintype.card
            (BoundedComposition k
              (weight - (index + 1))) : ℚ)
        else 0 := by
  let admissibleIndices :=
    Finset.filter
      (fun index => index + 1 ≤ k)
      (Finset.range weight)
  calc
    (∑ head : BoundedCompositionHead k weight,
        (Fintype.card
          (BoundedComposition k
            (weight - head.1.1)) : ℚ)) =
        ∑ index :
            {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (BoundedComposition k
              (weight - (index.1 + 1))) : ℚ) := by
      apply Fintype.sum_equiv
        (boundedCompositionHeadIndexEquiv k weight)
      intro head
      have hweight :
          weight - head.1.1 =
            weight - ((head.1.1 - 1) + 1) := by
        have hpos := head.2.1
        omega
      change
        (Fintype.card
            (BoundedComposition k
              (weight - head.1.1)) : ℚ) =
          (Fintype.card
            (BoundedComposition k
              (weight -
                ((head.1.1 - 1) + 1))) : ℚ)
      rw [hweight]
    _ = ∑ index ∈ admissibleIndices,
          (Fintype.card
            (BoundedComposition k
              (weight - (index + 1))) : ℚ) := by
      exact Finset.sum_attach admissibleIndices
        (fun index =>
          (Fintype.card
            (BoundedComposition k
              (weight - (index + 1))) : ℚ))
    _ = ∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            (Fintype.card
              (BoundedComposition k
                (weight - (index + 1))) : ℚ)
          else 0 := by
      simp [admissibleIndices, Finset.sum_filter]

theorem boundedComposition_convolution_eq_range
    (k weight : ℕ) :
    (∑ pair ∈ Finset.antidiagonal weight,
        (fdZeroDenominator k).coeff pair.1 *
          (Fintype.card
            (BoundedComposition k pair.2) : ℚ)) =
      (Fintype.card
          (BoundedComposition k weight) : ℚ) -
        ∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            (Fintype.card
              (BoundedComposition k
                (weight - (index + 1))) : ℚ)
          else 0 := by
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.sum_range_succ']
  simp only [fdZeroDenominator_coeff_formula]
  simp only [Nat.add_eq_zero, one_ne_zero, and_false,
    if_false, Nat.zero_le, if_true, Nat.sub_zero,
    one_mul]
  simp only [ite_mul, neg_one_mul, zero_mul]
  have hnegative :
      (∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            -(Fintype.card
              (BoundedComposition k
                (weight - (index + 1))) : ℚ)
          else 0) =
        -(∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            (Fintype.card
              (BoundedComposition k
                (weight - (index + 1))) : ℚ)
          else 0) := by
    rw [← Finset.sum_neg_distrib]
    apply Finset.sum_congr rfl
    intro index _
    by_cases hindex : index + 1 ≤ k <;>
      simp [hindex]
  rw [hnegative]
  ring

theorem boundedCompositionEmptyCase_card
    (weight : ℕ) :
    Fintype.card (BoundedCompositionEmptyCase weight) =
      if weight = 0 then 1 else 0 := by
  classical
  by_cases hzero : weight = 0
  · simp [BoundedCompositionEmptyCase, hzero]
  · simp [BoundedCompositionEmptyCase, hzero]

theorem boundedComposition_recurrence
    (k weight : ℕ) :
    (∑ pair ∈ Finset.antidiagonal weight,
        (fdZeroDenominator k).coeff pair.1 *
          (Fintype.card
            (BoundedComposition k pair.2) : ℚ)) =
      (1 : Polynomial ℚ).coeff weight := by
  rw [boundedComposition_convolution_eq_range,
    ← boundedComposition_head_sum_eq_filter]
  have hsplit := boundedComposition_card_split k weight
  have hcast :=
    congrArg (fun value : ℕ => (value : ℚ)) hsplit
  simp only [Nat.cast_add, Nat.cast_sum] at hcast
  rw [hcast]
  have hcancel :
      (Fintype.card
          (BoundedCompositionEmptyCase weight) : ℚ) +
          (∑ head : BoundedCompositionHead k weight,
            (Fintype.card
              (BoundedComposition k
                (weight - head.1.1)) : ℚ)) -
          (∑ head : BoundedCompositionHead k weight,
            (Fintype.card
              (BoundedComposition k
                (weight - head.1.1)) : ℚ)) =
        (Fintype.card
          (BoundedCompositionEmptyCase weight) : ℚ) := by
    ring
  rw [hcancel, boundedCompositionEmptyCase_card]
  by_cases hzero : weight = 0
  · subst weight
    simp
  · simp [hzero, Polynomial.coeff_one]

theorem boundedComposition_series (k : ℕ) :
    seriesOf
        (fun weight =>
          (Fintype.card
            (BoundedComposition k weight) : ℚ)) =
      rationalSeries 1 (fdZeroDenominator k) := by
  apply
    (seriesOf_eq_rationalSeries_iff
      1 (fdZeroDenominator k)
      (fun weight =>
        (Fintype.card
          (BoundedComposition k weight) : ℚ))
      (by
        rw [fdZeroDenominator_coeff_zero]
        exact one_ne_zero)).2
  exact boundedComposition_recurrence k

end FixedPerimeter
