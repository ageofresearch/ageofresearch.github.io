import FixedPerimeter.EnumerativeFDPositive

/-!
# Arbitrary marked words for the positive-frequency `FD` branch

An arbitrary composition is a word of positive blocks.  Splitting off its
first block gives the two transitions of the marked-word recurrence: a block
in `1, …, k` preserves the number of marks, while a block at least `k + 1`
uses one mark.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- Arbitrary compositions with exactly `j` blocks at least `k + 1`. -/
abbrev MarkedFDComposition (j k weight : ℕ) :=
  {composition : Composition weight //
    blockFrequentCount k composition.blocks = j}

abbrev MarkedFDCompositionEmptyCase (j weight : ℕ) :=
  {unit : Unit // j = 0 ∧ weight = 0}

abbrev MarkedFDSmallHead (k weight : ℕ) :=
  BoundedCompositionHead k weight

abbrev MarkedFDLargeHead (j k weight : ℕ) :=
  {head : Fin (weight + 1) //
    1 ≤ j ∧ k + 1 ≤ head.1}

abbrev MarkedFDCompositionSplit (j k weight : ℕ) :=
  MarkedFDCompositionEmptyCase j weight ⊕
    ((Σ head : MarkedFDSmallHead k weight,
        MarkedFDComposition j k (weight - head.1.1)) ⊕
      (Σ head : MarkedFDLargeHead j k weight,
        MarkedFDComposition (j - 1) k
          (weight - head.1.1)))

def markedFDCompositionEmpty
    {j k weight : ℕ}
    (hempty : MarkedFDCompositionEmptyCase j weight) :
    MarkedFDComposition j k weight := by
  rcases hempty with ⟨⟨⟩, hj, hw⟩
  subst j
  subst weight
  exact ⟨⟨[], by simp, by simp⟩, by
    simp [blockFrequentCount]⟩

def markedFDCompositionConsSmall
    {j k weight : ℕ}
    (head : MarkedFDSmallHead k weight)
    (tail :
      MarkedFDComposition j k
        (weight - head.1.1)) :
    MarkedFDComposition j k weight := by
  let composition : Composition weight := {
    blocks := head.1.1 :: tail.1.blocks
    blocks_pos := by
      intro block hblock
      rcases List.mem_cons.mp hblock with hhead | htail
      · subst block
        exact head.2.1
      · exact tail.1.blocks_pos htail
    blocks_sum := by
      simp only [List.sum_cons, tail.1.blocks_sum]
      have hle : head.1.1 ≤ weight :=
        Nat.le_of_lt_succ head.1.2
      omega
  }
  refine ⟨composition, ?_⟩
  have hsmall : ¬k < head.1.1 := by
    omega
  change
    List.countP (fun block => k < block)
        (head.1.1 :: tail.1.blocks) = j
  have htailCount :
      List.countP (fun block => k < block)
          tail.1.blocks = j := by
    simpa only [blockFrequentCount,
      Nat.add_one_le_iff] using tail.2
  rw [List.countP_cons, htailCount]
  simp [hsmall]

def markedFDCompositionConsLarge
    {j k weight : ℕ}
    (head : MarkedFDLargeHead j k weight)
    (tail :
      MarkedFDComposition (j - 1) k
        (weight - head.1.1)) :
    MarkedFDComposition j k weight := by
  let composition : Composition weight := {
    blocks := head.1.1 :: tail.1.blocks
    blocks_pos := by
      intro block hblock
      rcases List.mem_cons.mp hblock with hhead | htail
      · subst block
        omega
      · exact tail.1.blocks_pos htail
    blocks_sum := by
      simp only [List.sum_cons, tail.1.blocks_sum]
      have hle : head.1.1 ≤ weight :=
        Nat.le_of_lt_succ head.1.2
      omega
  }
  refine ⟨composition, ?_⟩
  have hlarge : k < head.1.1 := by
    omega
  change
    List.countP (fun block => k < block)
        (head.1.1 :: tail.1.blocks) = j
  have htailCount :
      List.countP (fun block => k < block)
          tail.1.blocks = j - 1 := by
    simpa only [blockFrequentCount,
      Nat.add_one_le_iff] using tail.2
  rw [List.countP_cons, htailCount]
  simp [hlarge]
  omega

def joinMarkedFDComposition
    {j k weight : ℕ}
    (split : MarkedFDCompositionSplit j k weight) :
    MarkedFDComposition j k weight :=
  match split with
  | Sum.inl empty =>
      markedFDCompositionEmpty empty
  | Sum.inr (Sum.inl branch) =>
      markedFDCompositionConsSmall branch.1 branch.2
  | Sum.inr (Sum.inr branch) =>
      markedFDCompositionConsLarge branch.1 branch.2

theorem joinMarkedFDComposition_injective
    {j k weight : ℕ} :
    Function.Injective
      (joinMarkedFDComposition :
        MarkedFDCompositionSplit j k weight →
          MarkedFDComposition j k weight) := by
  intro left right hequal
  rcases left with left | left
  · rcases right with right | right
    · congr
      apply Subtype.ext
      cases left.1
      cases right.1
      rfl
    · rcases right with right | right
      · rcases left with ⟨⟨⟩, hj, hw⟩
        subst j
        subst weight
        have hpos := right.1.2.1
        have hlt := right.1.1.2
        omega
      · rcases left with ⟨⟨⟩, hj, hw⟩
        subst j
        subst weight
        have hjpos := right.1.2.1
        omega
  · rcases left with left | left
    · rcases right with right | right
      · rcases right with ⟨⟨⟩, hj, hw⟩
        subst j
        subst weight
        have hpos := left.1.2.1
        have hlt := left.1.1.2
        omega
      · rcases right with right | right
        · rcases left with ⟨leftHead, leftTail⟩
          rcases right with ⟨rightHead, rightTail⟩
          have hblocks :=
            congrArg
              (fun composition => composition.1.blocks)
              hequal
          simp only [joinMarkedFDComposition,
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
              (fun composition => composition.1.blocks)
              hequal
          simp only [joinMarkedFDComposition,
            markedFDCompositionConsSmall,
            markedFDCompositionConsLarge] at hblocks
          have hhead :
              leftHead.1.1 = rightHead.1.1 :=
            List.cons.inj hblocks |>.1
          have hsmall := leftHead.2.2
          have hlarge := rightHead.2.2
          omega
    · rcases right with right | right
      · rcases right with ⟨⟨⟩, hj, hw⟩
        subst j
        subst weight
        have hjpos := left.1.2.1
        omega
      · rcases right with right | right
        · rcases left with ⟨leftHead, leftTail⟩
          rcases right with ⟨rightHead, rightTail⟩
          have hblocks :=
            congrArg
              (fun composition => composition.1.blocks)
              hequal
          simp only [joinMarkedFDComposition,
            markedFDCompositionConsSmall,
            markedFDCompositionConsLarge] at hblocks
          have hhead :
              leftHead.1.1 = rightHead.1.1 :=
            List.cons.inj hblocks |>.1
          have hlarge := leftHead.2.2
          have hsmall := rightHead.2.2
          omega
        · rcases left with ⟨leftHead, leftTail⟩
          rcases right with ⟨rightHead, rightTail⟩
          have hblocks :=
            congrArg
              (fun composition => composition.1.blocks)
              hequal
          simp only [joinMarkedFDComposition,
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

theorem joinMarkedFDComposition_surjective
    {j k weight : ℕ} :
    Function.Surjective
      (joinMarkedFDComposition :
        MarkedFDCompositionSplit j k weight →
          MarkedFDComposition j k weight) := by
  intro composition
  rcases hblocks : composition.1.blocks with
    _ | ⟨head, tail⟩
  · have hweight : weight = 0 := by
      have hsum := composition.1.blocks_sum
      simpa [hblocks] using hsum.symm
    have hj : j = 0 := by
      have hcount := composition.2
      simpa [blockFrequentCount, hblocks] using
        hcount.symm
    refine
      ⟨Sum.inl ⟨(), hj, hweight⟩, ?_⟩
    subst j
    subst weight
    apply Subtype.ext
    apply Composition.ext
    simp [joinMarkedFDComposition,
      markedFDCompositionEmpty, hblocks]
  · have hheadPos : 1 ≤ head :=
      composition.1.one_le_blocks
        (by simp [hblocks])
    have hheadWeight : head ≤ weight := by
      rw [← composition.1.blocks_sum, hblocks]
      simp
    have htailSum :
        tail.sum = weight - head := by
      have hsum := composition.1.blocks_sum
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
        apply composition.1.blocks_pos
        simp [hblocks, hblock]
      blocks_sum := htailSum
    }
    by_cases hlarge : k + 1 ≤ head
    · have hj : 1 ≤ j := by
        have hcount := composition.2
        unfold blockFrequentCount at hcount
        simp only [Nat.add_one_le_iff] at hcount
        rw [hblocks] at hcount
        rw [List.countP_cons] at hcount
        have hklt : k < head := by omega
        simp [hklt] at hcount
        omega
      have htailCount :
          blockFrequentCount k tail = j - 1 := by
        have hcount := composition.2
        unfold blockFrequentCount at hcount
        simp only [Nat.add_one_le_iff] at hcount
        rw [hblocks] at hcount
        rw [List.countP_cons] at hcount
        have hklt : k < head := by omega
        simp [hklt] at hcount
        unfold blockFrequentCount
        simp only [Nat.add_one_le_iff]
        omega
      let admissibleHead :
          MarkedFDLargeHead j k weight :=
        ⟨headFin, hj, hlarge⟩
      let markedTail :
          MarkedFDComposition (j - 1) k
            (weight - head) :=
        ⟨tailComposition, htailCount⟩
      refine
        ⟨Sum.inr (Sum.inr
          ⟨admissibleHead, markedTail⟩), ?_⟩
      apply Subtype.ext
      apply Composition.ext
      simp [joinMarkedFDComposition,
        markedFDCompositionConsLarge,
        admissibleHead, markedTail,
        tailComposition, headFin, hblocks]
    · have hsmall : head ≤ k := by omega
      have htailCount :
          blockFrequentCount k tail = j := by
        have hcount := composition.2
        unfold blockFrequentCount at hcount
        simp only [Nat.add_one_le_iff] at hcount
        rw [hblocks] at hcount
        rw [List.countP_cons] at hcount
        have hnlt : ¬k < head := by omega
        unfold blockFrequentCount
        simp only [Nat.add_one_le_iff]
        simpa [hnlt] using hcount
      let admissibleHead :
          MarkedFDSmallHead k weight :=
        ⟨headFin, hheadPos, hsmall⟩
      let markedTail :
          MarkedFDComposition j k
            (weight - head) :=
        ⟨tailComposition, htailCount⟩
      refine
        ⟨Sum.inr (Sum.inl
          ⟨admissibleHead, markedTail⟩), ?_⟩
      apply Subtype.ext
      apply Composition.ext
      simp [joinMarkedFDComposition,
        markedFDCompositionConsSmall,
        admissibleHead, markedTail,
        tailComposition, headFin, hblocks]

noncomputable def markedFDCompositionSplitEquiv
    (j k weight : ℕ) :
    MarkedFDCompositionSplit j k weight ≃
      MarkedFDComposition j k weight :=
  Equiv.ofBijective joinMarkedFDComposition
    ⟨joinMarkedFDComposition_injective,
      joinMarkedFDComposition_surjective⟩

theorem markedFDComposition_card_split
    (j k weight : ℕ) :
    Fintype.card
        (MarkedFDComposition j k weight) =
      Fintype.card
          (MarkedFDCompositionEmptyCase j weight) +
        (∑ head : MarkedFDSmallHead k weight,
          Fintype.card
            (MarkedFDComposition j k
              (weight - head.1.1))) +
        ∑ head : MarkedFDLargeHead j k weight,
          Fintype.card
            (MarkedFDComposition (j - 1) k
              (weight - head.1.1)) := by
  rw [← Fintype.card_congr
    (markedFDCompositionSplitEquiv j k weight)]
  simp only [MarkedFDCompositionSplit,
    Fintype.card_sum, Fintype.card_sigma]
  omega

theorem markedFDComposition_zero_eq_bounded_card
    (k weight : ℕ) :
    Fintype.card (MarkedFDComposition 0 k weight) =
      Fintype.card (BoundedComposition k weight) := by
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun composition =>
      blockFrequentCount_eq_zero_iff
        k composition.blocks

theorem markedFDCompositionEmptyCase_succ_card
    (j weight : ℕ) :
    Fintype.card
        (MarkedFDCompositionEmptyCase (j + 1) weight) =
      0 := by
  classical
  simp [MarkedFDCompositionEmptyCase]

theorem markedFDComposition_small_sum_eq_filter
    (j k weight : ℕ) :
    (∑ head : MarkedFDSmallHead k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
      ∑ index ∈ Finset.range weight,
        if index + 1 ≤ k then
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ)
        else 0 := by
  let admissibleIndices :=
    Finset.filter
      (fun index => index + 1 ≤ k)
      (Finset.range weight)
  calc
    (∑ head : MarkedFDSmallHead k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
        ∑ index :
            {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (MarkedFDComposition j k
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
          if index + 1 ≤ k then
            (Fintype.card
              (MarkedFDComposition j k
                (weight - (index + 1))) : ℚ)
          else 0 := by
      simp [admissibleIndices, Finset.sum_filter]

noncomputable def markedFDLargeHeadSuccIndexEquiv
    (j k weight : ℕ) :
    MarkedFDLargeHead (j + 1) k weight ≃
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
        Nat.succ_pos j, ?_⟩
    exact hindex.2
  left_inv head := by
    apply Subtype.ext
    apply Fin.ext
    change head.1.1 - 1 + 1 = head.1.1
    omega
  right_inv index := by
    apply Subtype.ext
    change (index.1 + 1) - 1 = index.1
    omega

theorem markedFDComposition_large_sum_eq_filter
    (j k weight : ℕ) :
    (∑ head : MarkedFDLargeHead (j + 1) k weight,
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
    (∑ head : MarkedFDLargeHead (j + 1) k weight,
        (Fintype.card
          (MarkedFDComposition j k
            (weight - head.1.1)) : ℚ)) =
        ∑ index :
            {index : ℕ // index ∈ admissibleIndices},
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index.1 + 1))) : ℚ) := by
      apply Fintype.sum_equiv
        (markedFDLargeHeadSuccIndexEquiv
          j k weight)
      intro head
      have hweight :
          weight - head.1.1 =
            weight - ((head.1.1 - 1) + 1) := by
        have hpos : 1 ≤ head.1.1 := by
          omega
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

theorem markedFDComposition_AD_convolution
    (j k weight : ℕ) :
    (∑ pair ∈ Finset.antidiagonal weight,
        (fdZeroDenominator k).coeff pair.1 *
          (Fintype.card
            (MarkedFDComposition (j + 1) k
              pair.2) : ℚ)) =
      ∑ index ∈ Finset.range weight,
        if k + 1 ≤ index + 1 then
          (Fintype.card
            (MarkedFDComposition j k
              (weight - (index + 1))) : ℚ)
        else 0 := by
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.sum_range_succ']
  simp only [fdZeroDenominator_coeff_formula]
  simp only [Nat.add_eq_zero, one_ne_zero,
    and_false, if_false, Nat.zero_le, if_true,
    Nat.sub_zero, one_mul]
  simp only [ite_mul, neg_one_mul, zero_mul]
  have hnegative :
      (∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            -(Fintype.card
              (MarkedFDComposition (j + 1) k
                (weight - (index + 1))) : ℚ)
          else 0) =
        -(∑ index ∈ Finset.range weight,
          if index + 1 ≤ k then
            (Fintype.card
              (MarkedFDComposition (j + 1) k
                (weight - (index + 1))) : ℚ)
          else 0) := by
    rw [← Finset.sum_neg_distrib]
    apply Finset.sum_congr rfl
    intro index _
    by_cases hindex : index + 1 ≤ k <;>
      simp [hindex]
  rw [hnegative]
  rw [← markedFDComposition_small_sum_eq_filter]
  rw [← markedFDComposition_large_sum_eq_filter]
  have hsplit :=
    markedFDComposition_card_split
      (j + 1) k weight
  have hcast :=
    congrArg (fun value : ℕ => (value : ℚ)) hsplit
  simp only [Nat.cast_add, Nat.cast_sum] at hcast
  rw [hcast,
    markedFDCompositionEmptyCase_succ_card]
  simp only [Nat.cast_zero, zero_add]
  simp only [Nat.add_sub_cancel]
  ring

noncomputable def markedFDCompositionSeries
    (j k : ℕ) : PowerSeries ℚ :=
  seriesOf fun weight =>
    (Fintype.card
      (MarkedFDComposition j k weight) : ℚ)

noncomputable def fdLargeBlockSeries
    (k : ℕ) : PowerSeries ℚ :=
  seriesOf fun weight =>
    if k + 1 ≤ weight then 1 else 0

theorem fdLargeBlockSeries_coeff
    (k weight : ℕ) :
    PowerSeries.coeff weight
        (fdLargeBlockSeries k) =
      if k + 1 ≤ weight then 1 else 0 := by
  simp [fdLargeBlockSeries]

theorem markedFDCompositionSeries_recurrence
    (j k : ℕ) :
    ((fdZeroDenominator k : Polynomial ℚ) :
        PowerSeries ℚ) *
        markedFDCompositionSeries (j + 1) k =
      fdLargeBlockSeries k *
        markedFDCompositionSeries j k := by
  apply PowerSeries.ext
  intro weight
  simp only [markedFDCompositionSeries]
  rw [coeff_polynomial_mul_seriesOf]
  change
    (∑ pair ∈ Finset.antidiagonal weight,
        (fdZeroDenominator k).coeff pair.1 *
          (Fintype.card
            (MarkedFDComposition (j + 1) k
              pair.2) : ℚ)) =
      PowerSeries.coeff weight
        (fdLargeBlockSeries k *
          markedFDCompositionSeries j k)
  rw [markedFDComposition_AD_convolution]
  rw [PowerSeries.coeff_mul]
  rw [Finset.Nat.sum_antidiagonal_eq_sum_range_succ_mk]
  rw [Finset.sum_range_succ']
  simp only [fdLargeBlockSeries_coeff,
    markedFDCompositionSeries, coeff_seriesOf]
  simp

theorem markedFDCompositionSeries_zero
    (k : ℕ) :
    markedFDCompositionSeries 0 k =
      rationalSeries 1 (fdZeroDenominator k) := by
  rw [← boundedComposition_series k]
  apply PowerSeries.ext
  intro weight
  simp only [markedFDCompositionSeries,
    coeff_seriesOf]
  exact_mod_cast
    markedFDComposition_zero_eq_bounded_card
      k weight

theorem markedFDCompositionSeries_closed
    (j k : ℕ) :
    markedFDCompositionSeries j k =
      (fdLargeBlockSeries k) ^ j *
        ((((fdZeroDenominator k :
              Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
          (j + 1)) := by
  induction j with
  | zero =>
      rw [markedFDCompositionSeries_zero]
      simp [rationalSeries]
  | succ j ih =>
      have hconstant :
          PowerSeries.constantCoeff
              (((fdZeroDenominator k :
                  Polynomial ℚ) : PowerSeries ℚ)) ≠
            0 := by
        simpa using
          (show
            (fdZeroDenominator k).coeff 0 ≠ 0 by
              rw [fdZeroDenominator_coeff_zero]
              exact one_ne_zero)
      have hsolve :
          markedFDCompositionSeries (j + 1) k =
            (fdLargeBlockSeries k *
                markedFDCompositionSeries j k) *
              (((fdZeroDenominator k :
                  Polynomial ℚ) : PowerSeries ℚ)⁻¹) := by
        apply
          (PowerSeries.eq_mul_inv_iff_mul_eq
            hconstant).2
        simpa [mul_comm] using
          markedFDCompositionSeries_recurrence j k
      rw [hsolve, ih]
      ring

theorem one_sub_X_mul_fdLargeBlockSeries
    (k : ℕ) :
    (((1 - Polynomial.X : Polynomial ℚ) :
        PowerSeries ℚ) *
        fdLargeBlockSeries k) =
      ((Polynomial.X ^ (k + 1) :
          Polynomial ℚ) : PowerSeries ℚ) := by
  rw [Polynomial.coe_sub, Polynomial.coe_one,
    Polynomial.coe_X]
  rw [sub_mul, one_mul]
  apply PowerSeries.ext
  intro weight
  cases weight with
  | zero =>
      rw [map_sub]
      rw [fdLargeBlockSeries_coeff]
      simp
  | succ weight =>
      rw [map_sub,
        PowerSeries.coeff_succ_X_mul]
      simp only [fdLargeBlockSeries_coeff,
        Polynomial.coeff_coe,
        Polynomial.coeff_X_pow]
      by_cases heq : weight + 1 = k + 1
      · have hcurrent : k + 1 ≤ weight + 1 := by
          omega
        have hprevious : ¬k + 1 ≤ weight := by
          omega
        have hweight : weight = k := by omega
        simp [hweight, hcurrent, hprevious]
      · by_cases hcurrent : k + 1 ≤ weight + 1
        · have hprevious : k + 1 ≤ weight := by
            omega
          have hweight : weight ≠ k := by omega
          simp [hweight, hcurrent, hprevious]
        · have hprevious : ¬k + 1 ≤ weight := by
            omega
          have hweight : weight ≠ k := by omega
          simp [hweight, hcurrent, hprevious]

theorem fdLargeBlockSeries_eq_rational
    (k : ℕ) :
    fdLargeBlockSeries k =
      rationalSeries
        (Polynomial.X ^ (k + 1))
        (1 - Polynomial.X) := by
  unfold rationalSeries
  apply
    (PowerSeries.eq_mul_inv_iff_mul_eq
      (by simp :
        PowerSeries.constantCoeff
          (((1 - Polynomial.X :
              Polynomial ℚ) : PowerSeries ℚ)) ≠ 0)).2
  simpa [mul_comm] using
    one_sub_X_mul_fdLargeBlockSeries k

end FixedPerimeter
