import FixedPerimeter.EnumerativeFDWords

/-!
# Terminal marked words and the positive-`j` `FD` series

Reversing a terminal composition exposes its final block as a first block.
That gives a two-branch split: a terminal block in `2, …, k`, or a marked
terminal block at least `k + 1`.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

theorem blockFrequentCount_reverse
    (k : ℕ) (blocks : List ℕ) :
    blockFrequentCount k blocks.reverse =
      blockFrequentCount k blocks := by
  unfold blockFrequentCount
  induction blocks with
  | nil => simp
  | cons block blocks ih =>
      simp only [Nat.add_one_le_iff] at ih ⊢
      rw [List.reverse_cons, List.countP_append]
      simp [ih, List.countP_cons, Nat.add_comm]

/-- A terminal marked composition represented with its final block first. -/
abbrev ReversedMarkedFDTerminal
    (j k weight : ℕ) :=
  {composition : MarkedFDComposition j k weight //
    ∃ head tail,
      composition.1.blocks = head :: tail ∧
        2 ≤ head}

noncomputable instance reversedMarkedFDTerminalFintype
    (j k weight : ℕ) :
    Fintype (ReversedMarkedFDTerminal j k weight) :=
  Fintype.ofFinite _

def reverseMarkedFDTerminal
    {j k weight : ℕ}
    (terminal :
      MarkedFDTerminalComposition j k weight) :
    ReversedMarkedFDTerminal j k weight := by
  let reversedComposition : Composition weight := {
    blocks := terminal.1.1.blocks.reverse
    blocks_pos := by
      intro block hblock
      apply terminal.1.1.blocks_pos
      simpa using hblock
    blocks_sum := by
      simpa using terminal.1.1.blocks_sum
  }
  let marked :
      MarkedFDComposition j k weight :=
    ⟨reversedComposition, by
      rw [blockFrequentCount_reverse]
      rw [← card_frequentBlockPositions]
      exact terminal.2⟩
  refine ⟨marked, ?_⟩
  rcases terminal.1.2 with
    ⟨last, hlast, hlastTwo⟩
  rcases hreverse :
      terminal.1.1.blocks.reverse with
    _ | ⟨head, tail⟩
  · have hnil :
        terminal.1.1.blocks = [] := by
      have :=
        congrArg List.reverse hreverse
      simpa using this
    simp [hnil] at hlast
  · refine ⟨head, tail, ?_, ?_⟩
    · exact hreverse
    · have hblocks :
          terminal.1.1.blocks =
            (head :: tail).reverse := by
        have :=
          congrArg List.reverse hreverse
        simpa using this
      have hhead : head = last := by
        rw [hblocks] at hlast
        simpa using hlast
      omega

def unreverseMarkedFDTerminal
    {j k weight : ℕ}
    (reversed :
      ReversedMarkedFDTerminal j k weight) :
    MarkedFDTerminalComposition j k weight := by
  let composition : Composition weight := {
    blocks := reversed.1.1.blocks.reverse
    blocks_pos := by
      intro block hblock
      apply reversed.1.1.blocks_pos
      simpa using hblock
    blocks_sum := by
      simpa using reversed.1.1.blocks_sum
  }
  refine ⟨⟨composition, ?_⟩, ?_⟩
  · rcases reversed.2 with
      ⟨head, tail, hblocks, hheadTwo⟩
    refine ⟨head, ?_, hheadTwo⟩
    simp [composition, hblocks]
  · rw [card_frequentBlockPositions]
    rw [blockFrequentCount_reverse]
    exact reversed.1.2

theorem unreverse_reverseMarkedFDTerminal
    {j k weight : ℕ}
    (terminal :
      MarkedFDTerminalComposition j k weight) :
    unreverseMarkedFDTerminal
        (reverseMarkedFDTerminal terminal) =
      terminal := by
  apply Subtype.ext
  apply Subtype.ext
  apply Composition.ext
  simp [unreverseMarkedFDTerminal,
    reverseMarkedFDTerminal]

theorem reverse_unreverseMarkedFDTerminal
    {j k weight : ℕ}
    (reversed :
      ReversedMarkedFDTerminal j k weight) :
    reverseMarkedFDTerminal
        (unreverseMarkedFDTerminal reversed) =
      reversed := by
  apply Subtype.ext
  apply Subtype.ext
  apply Composition.ext
  simp [unreverseMarkedFDTerminal,
    reverseMarkedFDTerminal]

noncomputable def reversedMarkedFDTerminalEquiv
    (j k weight : ℕ) :
    MarkedFDTerminalComposition j k weight ≃
      ReversedMarkedFDTerminal j k weight where
  toFun := reverseMarkedFDTerminal
  invFun := unreverseMarkedFDTerminal
  left_inv := unreverse_reverseMarkedFDTerminal
  right_inv := reverse_unreverseMarkedFDTerminal

abbrev FDTerminalSmallHead (k weight : ℕ) :=
  {head : Fin (weight + 1) //
    2 ≤ head.1 ∧ head.1 ≤ k}

abbrev FDTerminalLargeHead (j k weight : ℕ) :=
  {head : Fin (weight + 1) //
    1 ≤ j ∧ 2 ≤ head.1 ∧ k + 1 ≤ head.1}

abbrev ReversedMarkedFDTerminalSplit
    (j k weight : ℕ) :=
  (Σ head : FDTerminalSmallHead k weight,
      MarkedFDComposition j k
        (weight - head.1.1)) ⊕
    (Σ head : FDTerminalLargeHead j k weight,
      MarkedFDComposition (j - 1) k
        (weight - head.1.1))

def reversedTerminalConsSmall
    {j k weight : ℕ}
    (head : FDTerminalSmallHead k weight)
    (tail :
      MarkedFDComposition j k
        (weight - head.1.1)) :
    ReversedMarkedFDTerminal j k weight := by
  let smallHead :
      MarkedFDSmallHead k weight :=
    ⟨head.1, by omega, head.2.2⟩
  let composition :=
    markedFDCompositionConsSmall smallHead tail
  exact ⟨composition,
    ⟨head.1.1, tail.1.blocks, rfl, head.2.1⟩⟩

def reversedTerminalConsLarge
    {j k weight : ℕ}
    (head : FDTerminalLargeHead j k weight)
    (tail :
      MarkedFDComposition (j - 1) k
        (weight - head.1.1)) :
    ReversedMarkedFDTerminal j k weight := by
  let largeHead :
      MarkedFDLargeHead j k weight :=
    ⟨head.1, head.2.1, head.2.2.2⟩
  let composition :=
    markedFDCompositionConsLarge largeHead tail
  exact ⟨composition,
    ⟨head.1.1, tail.1.blocks, rfl,
      head.2.2.1⟩⟩

def joinReversedMarkedFDTerminal
    {j k weight : ℕ}
    (split :
      ReversedMarkedFDTerminalSplit j k weight) :
    ReversedMarkedFDTerminal j k weight :=
  match split with
  | Sum.inl branch =>
      reversedTerminalConsSmall branch.1 branch.2
  | Sum.inr branch =>
      reversedTerminalConsLarge branch.1 branch.2

theorem joinReversedMarkedFDTerminal_injective
    {j k weight : ℕ} :
    Function.Injective
      (joinReversedMarkedFDTerminal :
        ReversedMarkedFDTerminalSplit j k weight →
          ReversedMarkedFDTerminal j k weight) := by
  intro left right hequal
  rcases left with left | left <;>
    rcases right with right | right
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg
        (fun reversed => reversed.1.1.blocks)
        hequal
    simp only [joinReversedMarkedFDTerminal,
      reversedTerminalConsSmall,
      markedFDCompositionConsSmall] at hblocks
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
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg
        (fun reversed => reversed.1.1.blocks)
        hequal
    simp only [joinReversedMarkedFDTerminal,
      reversedTerminalConsSmall,
      reversedTerminalConsLarge,
      markedFDCompositionConsSmall,
      markedFDCompositionConsLarge] at hblocks
    have hhead :
        leftHead.1.1 = rightHead.1.1 :=
      (List.cons.inj hblocks).1
    have hsmall := leftHead.2.2
    have hlarge := rightHead.2.2.2
    omega
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg
        (fun reversed => reversed.1.1.blocks)
        hequal
    simp only [joinReversedMarkedFDTerminal,
      reversedTerminalConsSmall,
      reversedTerminalConsLarge,
      markedFDCompositionConsSmall,
      markedFDCompositionConsLarge] at hblocks
    have hhead :
        leftHead.1.1 = rightHead.1.1 :=
      (List.cons.inj hblocks).1
    have hlarge := leftHead.2.2.2
    have hsmall := rightHead.2.2
    omega
  · rcases left with ⟨leftHead, leftTail⟩
    rcases right with ⟨rightHead, rightTail⟩
    have hblocks :=
      congrArg
        (fun reversed => reversed.1.1.blocks)
        hequal
    simp only [joinReversedMarkedFDTerminal,
      reversedTerminalConsLarge,
      markedFDCompositionConsLarge] at hblocks
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

theorem joinReversedMarkedFDTerminal_surjective
    {j k weight : ℕ} :
    Function.Surjective
      (joinReversedMarkedFDTerminal :
        ReversedMarkedFDTerminalSplit j k weight →
          ReversedMarkedFDTerminal j k weight) := by
  intro reversed
  rcases reversed.2 with
    ⟨head, tail, hblocks, hheadTwo⟩
  have hheadWeight : head ≤ weight := by
    rw [← reversed.1.1.blocks_sum, hblocks]
    simp
  have htailSum :
      tail.sum = weight - head := by
    have hsum := reversed.1.1.blocks_sum
    rw [hblocks] at hsum
    simp only [List.sum_cons] at hsum
    omega
  let headFin : Fin (weight + 1) :=
    ⟨head, by omega⟩
  let tailComposition :
      Composition (weight - head) := {
    blocks := tail
    blocks_pos := by
      intro block hblock
      apply reversed.1.1.blocks_pos
      simp [hblocks, hblock]
    blocks_sum := htailSum
  }
  by_cases hlarge : k + 1 ≤ head
  · have hj : 1 ≤ j := by
      have hcount := reversed.1.2
      unfold blockFrequentCount at hcount
      simp only [Nat.add_one_le_iff] at hcount
      rw [hblocks, List.countP_cons] at hcount
      have hklt : k < head := by omega
      simp [hklt] at hcount
      omega
    have htailCount :
        blockFrequentCount k tail = j - 1 := by
      have hcount := reversed.1.2
      unfold blockFrequentCount at hcount
      simp only [Nat.add_one_le_iff] at hcount
      rw [hblocks, List.countP_cons] at hcount
      have hklt : k < head := by omega
      simp [hklt] at hcount
      unfold blockFrequentCount
      simp only [Nat.add_one_le_iff]
      omega
    let admissibleHead :
        FDTerminalLargeHead j k weight :=
      ⟨headFin, hj, hheadTwo, hlarge⟩
    let markedTail :
        MarkedFDComposition (j - 1) k
          (weight - head) :=
      ⟨tailComposition, htailCount⟩
    refine
      ⟨Sum.inr
        ⟨admissibleHead, markedTail⟩, ?_⟩
    apply Subtype.ext
    apply Subtype.ext
    apply Composition.ext
    simp [joinReversedMarkedFDTerminal,
      reversedTerminalConsLarge,
      markedFDCompositionConsLarge,
      admissibleHead, markedTail,
      tailComposition, headFin, hblocks]
  · have hsmall : head ≤ k := by omega
    have htailCount :
        blockFrequentCount k tail = j := by
      have hcount := reversed.1.2
      unfold blockFrequentCount at hcount
      simp only [Nat.add_one_le_iff] at hcount
      rw [hblocks, List.countP_cons] at hcount
      have hnlt : ¬k < head := by omega
      unfold blockFrequentCount
      simp only [Nat.add_one_le_iff]
      simpa [hnlt] using hcount
    let admissibleHead :
        FDTerminalSmallHead k weight :=
      ⟨headFin, hheadTwo, hsmall⟩
    let markedTail :
        MarkedFDComposition j k
          (weight - head) :=
      ⟨tailComposition, htailCount⟩
    refine
      ⟨Sum.inl
        ⟨admissibleHead, markedTail⟩, ?_⟩
    apply Subtype.ext
    apply Subtype.ext
    apply Composition.ext
    simp [joinReversedMarkedFDTerminal,
      reversedTerminalConsSmall,
      markedFDCompositionConsSmall,
      admissibleHead, markedTail,
      tailComposition, headFin, hblocks]

noncomputable def reversedMarkedFDTerminalSplitEquiv
    (j k weight : ℕ) :
    ReversedMarkedFDTerminalSplit j k weight ≃
      ReversedMarkedFDTerminal j k weight :=
  Equiv.ofBijective joinReversedMarkedFDTerminal
    ⟨joinReversedMarkedFDTerminal_injective,
      joinReversedMarkedFDTerminal_surjective⟩

theorem markedFDTerminal_card_split
    (j k weight : ℕ) :
    Fintype.card
        (MarkedFDTerminalComposition j k weight) =
      (∑ head : FDTerminalSmallHead k weight,
        Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1))) +
      ∑ head : FDTerminalLargeHead j k weight,
        Fintype.card
          (MarkedFDComposition (j - 1) k
            (weight - head.1.1)) := by
  rw [Fintype.card_congr
    (reversedMarkedFDTerminalEquiv j k weight)]
  rw [← Fintype.card_congr
    (reversedMarkedFDTerminalSplitEquiv
      j k weight)]
  simp only [ReversedMarkedFDTerminalSplit,
    Fintype.card_sum, Fintype.card_sigma]

noncomputable def fdTerminalSmallHeadIndexEquiv
    (k weight : ℕ) :
    FDTerminalSmallHead k weight ≃
      {index : ℕ //
        index ∈ Finset.filter
          (fun index =>
            2 ≤ index + 1 ∧ index + 1 ≤ k)
          (Finset.range weight)} where
  toFun head := ⟨head.1.1 - 1, by
    simp only [Finset.mem_filter, Finset.mem_range]
    constructor
    · omega
    · constructor <;> omega⟩
  invFun index := by
    have hindex := index.2
    simp only [Finset.mem_filter,
      Finset.mem_range] at hindex
    have hlt : index.1 + 1 < weight + 1 := by
      omega
    refine ⟨⟨index.1 + 1, hlt⟩, ?_⟩
    exact ⟨hindex.2.1, hindex.2.2⟩
  left_inv head := by
    apply Subtype.ext
    apply Fin.ext
    change head.1.1 - 1 + 1 = head.1.1
    omega
  right_inv index := by
    apply Subtype.ext
    change (index.1 + 1) - 1 = index.1
    omega

theorem fdTerminal_small_sum_eq_filter
    (j k weight : ℕ) :
    (∑ head : FDTerminalSmallHead k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
      ∑ index ∈ Finset.range weight,
        if 2 ≤ index + 1 ∧ index + 1 ≤ k then
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ)
        else 0 := by
  let admissibleIndices :=
    Finset.filter
      (fun index =>
        2 ≤ index + 1 ∧ index + 1 ≤ k)
      (Finset.range weight)
  calc
    (∑ head : FDTerminalSmallHead k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
        ∑ index :
            {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index.1 + 1))) : ℚ) := by
      apply Fintype.sum_equiv
        (fdTerminalSmallHeadIndexEquiv k weight)
      intro head
      have hweight :
          weight - head.1.1 =
            weight - ((head.1.1 - 1) + 1) := by
        omega
      change
        (Fintype.card
            (MarkedFDComposition j k
              (weight - head.1.1)) : ℚ) =
          (Fintype.card
            (MarkedFDComposition j k
              (weight -
                ((head.1.1 - 1) + 1))) : ℚ)
      rw [hweight]
    _ = ∑ index ∈ admissibleIndices,
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ) := by
      exact Finset.sum_attach admissibleIndices
        (fun index =>
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ))
    _ = ∑ index ∈ Finset.range weight,
          if 2 ≤ index + 1 ∧ index + 1 ≤ k then
            (Fintype.card
              (MarkedFDComposition j k
                (weight - (index + 1))) : ℚ)
          else 0 := by
      simp [admissibleIndices, Finset.sum_filter]

noncomputable def fdTerminalLargeHeadSuccIndexEquiv
    (j k weight : ℕ) (hk : 1 ≤ k) :
    FDTerminalLargeHead (j + 1) k weight ≃
      {index : ℕ //
        index ∈ Finset.filter
          (fun index => k + 1 ≤ index + 1)
          (Finset.range weight)} where
  toFun head := ⟨head.1.1 - 1, by
    simp only [Finset.mem_filter, Finset.mem_range]
    constructor <;> omega⟩
  invFun index := by
    have hindex := index.2
    simp only [Finset.mem_filter,
      Finset.mem_range] at hindex
    have hlt : index.1 + 1 < weight + 1 := by
      omega
    refine
      ⟨⟨index.1 + 1, hlt⟩,
        Nat.succ_pos j, ?_, hindex.2⟩
    change 2 ≤ index.1 + 1
    omega
  left_inv head := by
    apply Subtype.ext
    apply Fin.ext
    change head.1.1 - 1 + 1 = head.1.1
    omega
  right_inv index := by
    apply Subtype.ext
    change (index.1 + 1) - 1 = index.1
    omega

theorem fdTerminal_large_sum_eq_filter
    (j k weight : ℕ) (hk : 1 ≤ k) :
    (∑ head : FDTerminalLargeHead (j + 1) k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
      ∑ index ∈ Finset.range weight,
        if k + 1 ≤ index + 1 then
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ)
        else 0 := by
  let admissibleIndices :=
    Finset.filter
      (fun index => k + 1 ≤ index + 1)
      (Finset.range weight)
  calc
    (∑ head : FDTerminalLargeHead (j + 1) k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
        ∑ index :
            {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index.1 + 1))) : ℚ) := by
      apply Fintype.sum_equiv
        (fdTerminalLargeHeadSuccIndexEquiv
          j k weight hk)
      intro head
      have hweight :
          weight - head.1.1 =
            weight - ((head.1.1 - 1) + 1) := by
        omega
      change
        (Fintype.card
            (MarkedFDComposition j k
              (weight - head.1.1)) : ℚ) =
          (Fintype.card
            (MarkedFDComposition j k
              (weight -
                ((head.1.1 - 1) + 1))) : ℚ)
      rw [hweight]
    _ = ∑ index ∈ admissibleIndices,
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ) := by
      exact Finset.sum_attach admissibleIndices
        (fun index =>
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ))
    _ = ∑ index ∈ Finset.range weight,
          if k + 1 ≤ index + 1 then
            (Fintype.card
              (MarkedFDComposition j k
                (weight - (index + 1))) : ℚ)
          else 0 := by
      simp [admissibleIndices, Finset.sum_filter]

noncomputable def fdTerminalSmallBlockSeries
    (k : ℕ) : PowerSeries ℚ :=
  seriesOf fun weight =>
    if 2 ≤ weight ∧ weight ≤ k then 1 else 0

noncomputable def markedFDTerminalWeightSeries
    (j k : ℕ) : PowerSeries ℚ :=
  seriesOf fun weight =>
    (Fintype.card
      (MarkedFDTerminalComposition j k weight) : ℚ)

theorem markedFDTerminalWeightSeries_succ
    (j k : ℕ) (hk : 1 ≤ k) :
    markedFDTerminalWeightSeries (j + 1) k =
      fdTerminalSmallBlockSeries k *
          markedFDCompositionSeries (j + 1) k +
        fdLargeBlockSeries k *
          markedFDCompositionSeries j k := by
  apply PowerSeries.ext
  intro weight
  simp only [markedFDTerminalWeightSeries,
    coeff_seriesOf]
  have hsplit :=
    markedFDTerminal_card_split
      (j + 1) k weight
  have hcast :=
    congrArg (fun value : ℕ => (value : ℚ)) hsplit
  simp only [Nat.cast_add, Nat.cast_sum,
    Nat.add_sub_cancel] at hcast
  rw [hcast,
    fdTerminal_small_sum_eq_filter,
    fdTerminal_large_sum_eq_filter j k weight hk]
  rw [map_add, PowerSeries.coeff_mul,
    PowerSeries.coeff_mul]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.sum_range_succ',
    Finset.sum_range_succ']
  simp only [fdTerminalSmallBlockSeries,
    fdLargeBlockSeries,
    markedFDCompositionSeries,
    coeff_seriesOf]
  simp

theorem fdTerminalSmall_plus_denominator
    (k : ℕ) (hk : 1 ≤ k) :
    fdTerminalSmallBlockSeries k +
        (((fdZeroDenominator k :
            Polynomial ℚ) : PowerSeries ℚ)) =
      1 - PowerSeries.X := by
  apply PowerSeries.ext
  intro weight
  rw [map_add, map_sub]
  simp only [fdTerminalSmallBlockSeries,
    coeff_seriesOf, Polynomial.coeff_coe,
    fdZeroDenominator_coeff_formula,
    PowerSeries.coeff_one,
    PowerSeries.coeff_X]
  by_cases hzero : weight = 0
  · subst weight
    simp
  · by_cases hone : weight = 1
    · subst weight
      have hkNe : k ≠ 0 := by omega
      simp [hkNe]
    · by_cases hle : weight ≤ k
      · have htwo : 2 ≤ weight := by omega
        simp [hzero, hone, hle, htwo]
      · have hnsmall :
            ¬(2 ≤ weight ∧ weight ≤ k) := by
          omega
        simp [hzero, hone, hle, hnsmall]

theorem powerSeries_inv_pow
    (series : PowerSeries ℚ) (exponent : ℕ) :
    (series ^ exponent)⁻¹ =
      series⁻¹ ^ exponent := by
  induction exponent with
  | zero => simp
  | succ exponent ih =>
      rw [pow_succ, PowerSeries.mul_inv_rev, ih]
      rw [pow_succ]
      ring

theorem markedFDTerminalWeightSeries_closed
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    markedFDTerminalWeightSeries j k =
      (fdLargeBlockSeries k) ^ j *
        ((((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
          (j + 1)) *
        (1 - PowerSeries.X) := by
  cases j with
  | zero => omega
  | succ j =>
      rw [markedFDTerminalWeightSeries_succ
        j k hk]
      rw [markedFDCompositionSeries_closed,
        markedFDCompositionSeries_closed]
      have hconstant :
          PowerSeries.constantCoeff
              (((fdZeroDenominator k :
                  Polynomial ℚ) :
                PowerSeries ℚ)) ≠ 0 := by
        simpa using
          (show
            (fdZeroDenominator k).coeff 0 ≠ 0 by
              rw [fdZeroDenominator_coeff_zero]
              exact one_ne_zero)
      have hinv :
          (((fdZeroDenominator k :
                Polynomial ℚ) :
              PowerSeries ℚ)⁻¹) *
              (((fdZeroDenominator k :
                Polynomial ℚ) :
              PowerSeries ℚ)) =
            1 :=
        PowerSeries.inv_mul_cancel _ hconstant
      have hcollapse :
          ((((fdZeroDenominator k :
                Polynomial ℚ) :
              PowerSeries ℚ)⁻¹) ^
              (j + 2)) *
              (((fdZeroDenominator k :
                Polynomial ℚ) :
              PowerSeries ℚ)) =
            (((fdZeroDenominator k :
                Polynomial ℚ) :
              PowerSeries ℚ)⁻¹) ^
              (j + 1) := by
        calc
          ((((fdZeroDenominator k :
                  Polynomial ℚ) :
                PowerSeries ℚ)⁻¹) ^
                (j + 2)) *
                (((fdZeroDenominator k :
                  Polynomial ℚ) :
                PowerSeries ℚ)) =
              ((((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹) ^
                  (j + 1)) *
                (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹ *
                  (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ))) := by
            ring
          _ = _ := by rw [hinv, mul_one]
      calc
        fdTerminalSmallBlockSeries k *
              (fdLargeBlockSeries k ^ (j + 1) *
                (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹) ^ (j + 2)) +
            fdLargeBlockSeries k *
              (fdLargeBlockSeries k ^ j *
                (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹) ^ (j + 1)) =
            fdLargeBlockSeries k ^ (j + 1) *
              (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹) ^ (j + 2) *
              (fdTerminalSmallBlockSeries k +
                (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ))) := by
            rw [mul_add]
            congr 1
            · ring
            · symm
              calc
                fdLargeBlockSeries k ^ (j + 1) *
                      (((fdZeroDenominator k :
                          Polynomial ℚ) :
                        PowerSeries ℚ)⁻¹) ^ (j + 2) *
                      (((fdZeroDenominator k :
                          Polynomial ℚ) :
                        PowerSeries ℚ)) =
                    fdLargeBlockSeries k ^ (j + 1) *
                      (((((fdZeroDenominator k :
                            Polynomial ℚ) :
                          PowerSeries ℚ)⁻¹) ^ (j + 2)) *
                        (((fdZeroDenominator k :
                            Polynomial ℚ) :
                          PowerSeries ℚ))) := by
                      ring
                _ = fdLargeBlockSeries k ^ (j + 1) *
                      (((fdZeroDenominator k :
                          Polynomial ℚ) :
                        PowerSeries ℚ)⁻¹) ^ (j + 1) := by
                      rw [hcollapse]
                _ = fdLargeBlockSeries k *
                      (fdLargeBlockSeries k ^ j *
                        (((fdZeroDenominator k :
                            Polynomial ℚ) :
                          PowerSeries ℚ)⁻¹) ^ (j + 1)) := by
                      ring
        _ = fdLargeBlockSeries k ^ (j + 1) *
              (((fdZeroDenominator k :
                    Polynomial ℚ) :
                  PowerSeries ℚ)⁻¹) ^ (j + 2) *
              (1 - PowerSeries.X) := by
            rw [fdTerminalSmall_plus_denominator k hk]

theorem markedFDTerminalComposition_zero_weight_card
    (j k : ℕ) (hj : 1 ≤ j) :
    Fintype.card
        (MarkedFDTerminalComposition j k 0) = 0 := by
  rw [markedFDTerminal_card_split]
  simp [FDTerminalSmallHead, FDTerminalLargeHead]

theorem X_mul_canonicalFD_series
    (j k : ℕ) (hj : 1 ≤ j) :
    PowerSeries.X *
        seriesOf (fun n =>
          (CanonicalFD j k n : ℚ)) =
      markedFDTerminalWeightSeries j k := by
  apply PowerSeries.ext
  intro weight
  cases weight with
  | zero =>
      rw [PowerSeries.coeff_zero_X_mul]
      simp [markedFDTerminalWeightSeries,
        markedFDTerminalComposition_zero_weight_card
          j k hj]
  | succ n =>
      rw [PowerSeries.coeff_succ_X_mul]
      simp only [markedFDTerminalWeightSeries,
        coeff_seriesOf]
      exact_mod_cast canonicalFD_eq_marked_card
        j k n

theorem fdLargeBlockSeries_eq_monomial
    (k : ℕ) :
    fdLargeBlockSeries k =
      PowerSeries.X ^ (k + 1) *
        (1 - PowerSeries.X)⁻¹ := by
  rw [fdLargeBlockSeries_eq_rational]
  unfold rationalSeries
  rw [Polynomial.coe_pow, Polynomial.coe_X,
    Polynomial.coe_sub, Polynomial.coe_one,
    Polynomial.coe_X]

theorem canonicalFD_series_explicit
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    seriesOf (fun n =>
        (CanonicalFD j k n : ℚ)) =
      PowerSeries.X ^ ((k + 1) * j - 1) *
        (1 - PowerSeries.X)⁻¹ ^ (j - 1) *
        ((((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
          (j + 1)) := by
  apply PowerSeries.X_mul_cancel
  rw [X_mul_canonicalFD_series j k hj]
  rw [markedFDTerminalWeightSeries_closed
    j k hj hk]
  rw [fdLargeBlockSeries_eq_monomial]
  rw [mul_pow]
  rw [← pow_mul]
  have hAconstant :
      PowerSeries.constantCoeff
          (1 - PowerSeries.X :
            PowerSeries ℚ) ≠ 0 := by
    simp
  have hAinv :
      (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ *
          (1 - PowerSeries.X) = 1 :=
    PowerSeries.inv_mul_cancel _ hAconstant
  have hAcollapse :
      (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^ j *
          (1 - PowerSeries.X) =
        (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^
          (j - 1) := by
    obtain ⟨m, rfl⟩ := Nat.exists_eq_succ_of_ne_zero
      (by omega : j ≠ 0)
    change
      (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^ (m + 1) *
          (1 - PowerSeries.X) =
        (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^ m
    calc
      (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^ (m + 1) *
            (1 - PowerSeries.X) =
          (1 - PowerSeries.X : PowerSeries ℚ)⁻¹ ^ m *
            ((1 - PowerSeries.X : PowerSeries ℚ)⁻¹ *
              (1 - PowerSeries.X)) := by
        ring
      _ = _ := by rw [hAinv, mul_one]
  calc
    PowerSeries.X ^ ((k + 1) * j) *
          (1 - PowerSeries.X)⁻¹ ^ j *
          (((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
            (j + 1) *
          (1 - PowerSeries.X) =
        PowerSeries.X ^ ((k + 1) * j) *
          (((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
            (j + 1) *
          ((1 - PowerSeries.X)⁻¹ ^ j *
            (1 - PowerSeries.X)) := by
      ring
    _ = PowerSeries.X ^ ((k + 1) * j) *
          (((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
            (j + 1) *
          (1 - PowerSeries.X)⁻¹ ^ (j - 1) := by
      rw [hAcollapse]
    _ = PowerSeries.X *
          (PowerSeries.X ^ ((k + 1) * j - 1) *
            (1 - PowerSeries.X)⁻¹ ^ (j - 1)) *
          (((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
            (j + 1) := by
      have hexponent :
          1 + ((k + 1) * j - 1) =
            (k + 1) * j := by
        have hproduct :
            1 ≤ (k + 1) * j :=
          Nat.one_le_iff_ne_zero.mpr
            (Nat.mul_ne_zero (by omega) (by omega))
        omega
      have hx :
          (PowerSeries.X : PowerSeries ℚ) ^
                ((k + 1) * j) =
            (PowerSeries.X : PowerSeries ℚ) *
              (PowerSeries.X : PowerSeries ℚ) ^
                ((k + 1) * j - 1) := by
        calc
          (PowerSeries.X : PowerSeries ℚ) ^
                ((k + 1) * j) =
              (PowerSeries.X : PowerSeries ℚ) ^
                (((k + 1) * j - 1) + 1) := by
            congr
            omega
          _ = PowerSeries.X ^
                ((k + 1) * j - 1) *
              PowerSeries.X := by
            rw [pow_succ]
          _ = _ := by ac_rfl
      rw [hx]
      ac_rfl
    _ = PowerSeries.X *
          (PowerSeries.X ^ ((k + 1) * j - 1) *
            (1 - PowerSeries.X)⁻¹ ^ (j - 1) *
            (((fdZeroDenominator k :
                Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
              (j + 1)) := by
      rw [mul_assoc]

theorem canonicalFD_series
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    seriesOf (fun n =>
        (CanonicalFD j k n : ℚ)) =
      rationalSeries
        (fdFixedJNumerator j k)
        (fdFixedJDenominator j k) := by
  rw [canonicalFD_series_explicit j k hj hk]
  unfold rationalSeries fdFixedJNumerator
    fdFixedJDenominator
  unfold fdZeroDenominator
  simp only [Polynomial.coe_mul,
    Polynomial.coe_pow, Polynomial.coe_sub,
    Polynomial.coe_one, Polynomial.coe_X]
  rw [PowerSeries.mul_inv_rev,
    powerSeries_inv_pow,
    powerSeries_inv_pow]
  ring

theorem canonicalFD_asymptotic
    (j k : ℕ) (hj : 1 ≤ j) (hk : 2 ≤ k) :
    (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
      coefficientModel
        (fdLeadingConstant j k hk) j
        (adRoot k (by omega)) :=
  canonicalFD_asymptotic_of_series j k hk
    (canonicalFD_series j k hj (by omega))

end FixedPerimeter
