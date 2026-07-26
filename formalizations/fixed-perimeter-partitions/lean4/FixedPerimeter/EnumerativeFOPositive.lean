import FixedPerimeter.EnumerativeFOZero
import FixedPerimeter.EnumerativeFDTerminal

/-!
# Exact enumeration for the positive-frequency `FO` branch

The positive `FO` statistic marks the one-based positions divisible by `k`
whose composition block is at least two.  This file packages the corresponding
fixed-length vector model before extracting its rational series.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

def divisiblePresentPositionsAux
    (k size : ℕ) (blocks : List ℕ) :
    Finset (Fin blocks.length) :=
  Finset.univ.filter fun position =>
    k ∣ size + position.1 ∧
      2 ≤ blocks.get position

theorem card_divisiblePresentPositionsAux
    (k size : ℕ) (blocks : List ℕ) :
    (divisiblePresentPositionsAux
        k size blocks).card =
      blockDivisiblePresentCountAux
        k size blocks := by
  induction blocks generalizing size with
  | nil =>
      simp [divisiblePresentPositionsAux,
        blockDivisiblePresentCountAux]
  | cons block rest ih =>
      unfold divisiblePresentPositionsAux
      change
        (Finset.univ.filter fun position :
            Fin (rest.length + 1) =>
          k ∣ size + position.1 ∧
            2 ≤ (block :: rest).get position).card =
          blockDivisiblePresentCountAux
            k size (block :: rest)
      rw [Fin.card_filter_univ_succ']
      unfold blockDivisiblePresentCountAux
      rw [← ih (size := size + 1)]
      unfold divisiblePresentPositionsAux
      congr 1
      · simp [and_comm]
      · apply congrArg Finset.card
        ext position
        simp [Nat.add_assoc, Nat.add_comm,
          Nat.add_left_comm]

def divisiblePresentPositions
    (k : ℕ) (blocks : List ℕ) :
    Finset (Fin blocks.length) :=
  divisiblePresentPositionsAux k 1 blocks

theorem card_divisiblePresentPositions
    (k : ℕ) (blocks : List ℕ) :
    (divisiblePresentPositions k blocks).card =
      blockDivisiblePresentCount k blocks :=
  card_divisiblePresentPositionsAux k 1 blocks

abbrev MarkedFOTerminalComposition
    (j k weight : ℕ) :=
  {terminal : TerminalComposition weight //
    (divisiblePresentPositions
      k terminal.1.blocks).card = j}

theorem canonicalFO_eq_marked_card
    (j k n : ℕ) :
    CanonicalFO j k n =
      Fintype.card
        (MarkedFOTerminalComposition
          j k (n + 1)) := by
  rw [canonicalFO_eq_terminalFO]
  unfold TerminalFO
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun terminal => by
      rw [card_divisiblePresentPositions]

abbrev MarkedFOTerminalFixedLength
    (j k weight length : ℕ) :=
  {terminal :
      MarkedFOTerminalComposition j k weight //
    terminal.1.1.blocks.length = length}

@[ext] structure PeriodicMarkedTerminalVector
    (j k weight length : ℕ) where
  blocks : Fin length → ℕ
  length_pos : 0 < length
  blocks_pos : ∀ index, 0 < blocks index
  blocks_sum : ∑ index, blocks index = weight
  event_count :
    (Finset.univ.filter fun index =>
      k ∣ index.1 + 1 ∧
        2 ≤ blocks index).card = j
  last_two : 2 ≤ blocks ⟨length - 1, by omega⟩

def markedFOTerminalFixedLengthToVector
    {j k weight length : ℕ}
    (terminal :
      MarkedFOTerminalFixedLength
        j k weight length) :
    PeriodicMarkedTerminalVector
      j k weight length := by
  let indexEquiv :
      Fin length ≃
        Fin terminal.1.1.1.blocks.length :=
    finCongr terminal.2.symm
  let blocks : Fin length → ℕ :=
    fun index =>
      terminal.1.1.1.blocksFun
        (indexEquiv index)
  have hblocksNe :
      terminal.1.1.1.blocks ≠ [] := by
    intro hnil
    rcases terminal.1.1.2 with
      ⟨last, hlast, _⟩
    simpa [hnil] using hlast
  have hlengthPos : 0 < length := by
    rw [← terminal.2]
    exact List.length_pos_iff_ne_nil.mpr hblocksNe
  refine {
    blocks := blocks
    length_pos := hlengthPos
    blocks_pos := ?_
    blocks_sum := ?_
    event_count := ?_
    last_two := ?_
  }
  · intro index
    exact terminal.1.1.1.one_le_blocksFun
      (indexEquiv index)
  · exact indexEquiv.sum_comp
      (fun index =>
        terminal.1.1.1.blocksFun index) |>.trans
      terminal.1.1.1.sum_blocksFun
  · have hmarked := terminal.1.2
    change
      (Finset.univ.filter fun index : Fin length =>
        k ∣ index.1 + 1 ∧
          2 ≤
            terminal.1.1.1.blocksFun
              (indexEquiv index)).card = j
    calc
      (Finset.univ.filter fun index : Fin length =>
          k ∣ index.1 + 1 ∧
            2 ≤
              terminal.1.1.1.blocksFun
                (indexEquiv index)).card =
          (divisiblePresentPositions
            k terminal.1.1.1.blocks).card := by
        apply Finset.card_bij
          (fun index _ => indexEquiv index)
        · intro index hindex
          simp only [Finset.mem_filter,
            Finset.mem_univ, true_and] at hindex ⊢
          simpa [divisiblePresentPositions,
            divisiblePresentPositionsAux,
            indexEquiv, Composition.blocksFun,
            Nat.add_comm]
            using hindex
        · intro left hleft right hright hequal
          exact indexEquiv.injective hequal
        · intro target htarget
          refine
            ⟨indexEquiv.symm target, ?_, ?_⟩
          · simp only [Finset.mem_filter,
              Finset.mem_univ, true_and] at htarget ⊢
            simpa [divisiblePresentPositions,
              divisiblePresentPositionsAux,
              indexEquiv, Composition.blocksFun,
              Nat.add_comm]
              using htarget
          · simp
      _ = j := hmarked
  · rcases terminal.1.1.2 with
      ⟨last, hlast, hlastTwo⟩
    have hlastValue :
        terminal.1.1.1.blocks[
            terminal.1.1.1.blocks.length - 1] =
          last := by
      have hlastGet :=
        List.getLast_of_getLast?_eq_some hlast
      simpa [List.getLast_eq_getElem] using hlastGet
    have hcastLast :
        (indexEquiv
          ⟨length - 1, by omega⟩).1 =
            terminal.1.1.1.blocks.length - 1 := by
      simp [indexEquiv]
      omega
    have hfinLast :
        indexEquiv ⟨length - 1, by omega⟩ =
          ⟨terminal.1.1.1.blocks.length - 1,
            by omega⟩ :=
      Fin.ext hcastLast
    change
      2 ≤ terminal.1.1.1.blocksFun
        (indexEquiv
          ⟨length - 1, by omega⟩)
    rw [hfinLast, Composition.blocksFun]
    change
      2 ≤ terminal.1.1.1.blocks[
        terminal.1.1.1.blocks.length - 1]
    rw [hlastValue]
    exact hlastTwo

def periodicMarkedTerminalVectorToTerminal
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    MarkedFOTerminalFixedLength
      j k weight length := by
  cases length with
  | zero =>
      exact
        (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length =>
      let blocks : List ℕ :=
        List.ofFn vector.blocks
      let composition : Composition weight := {
        blocks := blocks
        blocks_pos := by
          rw [List.forall_mem_ofFn_iff]
          exact vector.blocks_pos
        blocks_sum := by
          change
            (List.ofFn vector.blocks).sum = weight
          rw [List.sum_ofFn]
          exact vector.blocks_sum
      }
      let terminal : TerminalComposition weight :=
        ⟨composition, by
          refine
            ⟨vector.blocks (Fin.last length),
              ?_, ?_⟩
          · rw [List.getLast?_eq_getLast_of_ne_nil
              (by simp [composition, blocks])]
            congr 1
            simpa [composition, blocks] using
              (List.getLast_ofFn_succ
                vector.blocks)
          · have hlastIndex :
                (Fin.last length :
                  Fin (length + 1)) =
                  ⟨length + 1 - 1, by omega⟩ := by
              apply Fin.ext
              simp
            simpa [hlastIndex] using
              vector.last_two⟩
      let marked :
          MarkedFOTerminalComposition
            j k weight :=
        ⟨terminal, by
          change
            (divisiblePresentPositions
              k (List.ofFn vector.blocks)).card = j
          let indexEquiv :
              Fin (List.ofFn vector.blocks).length ≃
                Fin (length + 1) :=
            finCongr (by simp)
          calc
            (divisiblePresentPositions
                k (List.ofFn vector.blocks)).card =
                (Finset.univ.filter fun index :
                    Fin (length + 1) =>
                  k ∣ index.1 + 1 ∧
                    2 ≤ vector.blocks index).card := by
              apply Finset.card_bij
                (fun index _ => indexEquiv index)
              · intro index hindex
                simp only [divisiblePresentPositions,
                  divisiblePresentPositionsAux,
                  Finset.mem_filter,
                  Finset.mem_univ, true_and] at hindex ⊢
                rw [List.get_ofFn] at hindex
                simpa [indexEquiv, Nat.add_comm]
                  using hindex
              · intro left hleft right hright hequal
                exact indexEquiv.injective hequal
              · intro target htarget
                refine
                  ⟨indexEquiv.symm target, ?_, ?_⟩
                · simp only [divisiblePresentPositions,
                    divisiblePresentPositionsAux,
                    Finset.mem_filter,
                    Finset.mem_univ, true_and] at htarget ⊢
                  rw [List.get_ofFn]
                  simpa [indexEquiv, Nat.add_comm]
                    using htarget
                · simp
            _ = j := vector.event_count⟩
      exact ⟨marked, by
        simp [marked, terminal, composition, blocks]⟩

@[simp] theorem
    periodicMarkedTerminalVectorToTerminal_blocks
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    (periodicMarkedTerminalVectorToTerminal
      vector).1.1.1.blocks =
        List.ofFn vector.blocks := by
  cases length with
  | zero =>
      exact
        (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length => rfl

theorem
    markedFOTerminalFixedLengthToVector_toTerminal
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    markedFOTerminalFixedLengthToVector
        (periodicMarkedTerminalVectorToTerminal
          vector) =
      vector := by
  apply PeriodicMarkedTerminalVector.ext
  funext index
  cases length with
  | zero =>
      exact
        (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length =>
      change
        (List.ofFn vector.blocks)[index.1] =
          vector.blocks index
      rw [List.getElem_ofFn]

theorem
    periodicMarkedTerminalVectorToTerminal_toVector
    {j k weight length : ℕ}
    (terminal :
      MarkedFOTerminalFixedLength
        j k weight length) :
    periodicMarkedTerminalVectorToTerminal
        (markedFOTerminalFixedLengthToVector
          terminal) =
      terminal := by
  rcases terminal with ⟨terminal, hlength⟩
  subst length
  apply Subtype.ext
  apply Subtype.ext
  apply Subtype.ext
  apply Composition.ext
  rw [periodicMarkedTerminalVectorToTerminal_blocks]
  change
    List.ofFn terminal.1.1.blocksFun =
      terminal.1.1.blocks
  exact terminal.1.1.ofFn_blocksFun

noncomputable def
    markedFOTerminalFixedLengthEquiv
    (j k weight length : ℕ) :
    MarkedFOTerminalFixedLength
        j k weight length ≃
      PeriodicMarkedTerminalVector
        j k weight length where
  toFun := markedFOTerminalFixedLengthToVector
  invFun := periodicMarkedTerminalVectorToTerminal
  left_inv :=
    periodicMarkedTerminalVectorToTerminal_toVector
  right_inv :=
    markedFOTerminalFixedLengthToVector_toTerminal

def lastDivisiblePosition
    (k length : ℕ) (hlength : 0 < length)
    (hdivides : k ∣ length) :
    DivisibleBlockPosition k length :=
  ⟨⟨length - 1, by omega⟩, by
    simpa [Nat.sub_add_cancel
      (by omega : 1 ≤ length)] using hdivides⟩

abbrev FOEventChoice
    (j k length : ℕ) :=
  {events : Finset
      (DivisibleBlockPosition k length) //
    events.card = j ∧
      ∀ (hlength : 0 < length)
        (hdivides : k ∣ length),
        lastDivisiblePosition
          k length hlength hdivides ∈ events}

abbrev FOExtraPosition
    {j k length : ℕ}
    (choice : FOEventChoice j k length) :=
  VariableBlockPosition k length ⊕
    {position : DivisibleBlockPosition k length //
      position ∈ choice.1}

def foTerminalBonus (k length : ℕ) : ℕ :=
  if k ∣ length then 0 else 1

abbrev FOExtraData
    (j k weight length : ℕ)
    (choice : FOEventChoice j k length) :=
  {extras : FOExtraPosition choice → ℕ //
    ∑ position, extras position =
      weight -
        (length + j +
          foTerminalBonus k length)}

noncomputable instance foExtraDataFintype
    (j k weight length : ℕ)
    (choice : FOEventChoice j k length) :
    Fintype
      (FOExtraData j k weight length choice) :=
  Fintype.ofEquiv
    (Sym (FOExtraPosition choice)
      (weight -
        (length + j +
          foTerminalBonus k length)))
    (Sym.equivNatSumOfFintype
      (FOExtraPosition choice)
      (weight -
        (length + j +
          foTerminalBonus k length)))

def vectorEventChoice
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    FOEventChoice j k length := by
  let events :
      Finset (DivisibleBlockPosition k length) :=
    Finset.univ.filter fun position =>
      2 ≤ vector.blocks position.1
  refine ⟨events, ?_, ?_⟩
  · change events.card = j
    rw [← vector.event_count]
    apply Finset.card_bij
      (fun position _ => position.1)
    · intro position hposition
      change
        position ∈
          (Finset.univ.filter fun eventPosition :
              DivisibleBlockPosition k length =>
            2 ≤ vector.blocks eventPosition.1) at hposition
      simp only [Finset.mem_filter,
        Finset.mem_univ, true_and] at hposition ⊢
      exact ⟨position.2, hposition⟩
    · intro left hleft right hright hequal
      exact Subtype.ext hequal
    · intro target htarget
      simp only [Finset.mem_filter,
        Finset.mem_univ, true_and] at htarget
      refine ⟨⟨target, htarget.1⟩, ?_, rfl⟩
      simp [events, htarget.2]
  · intro hlength hdivides
    simp only [events, Finset.mem_filter,
      Finset.mem_univ, true_and]
    have hlast := vector.last_two
    change
      2 ≤ vector.blocks
        ⟨length - 1, by omega⟩ at hlast
    exact hlast

def vectorExtra
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length)
    (position :
      FOExtraPosition
        (vectorEventChoice vector)) : ℕ :=
  match position with
  | Sum.inl variablePosition =>
      vector.blocks variablePosition.1 - 1 -
        (if variablePosition.1.1 + 1 = length
          then 1 else 0)
  | Sum.inr event =>
      vector.blocks event.1.1 - 2

theorem vectorExtra_variable_reconstruct
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length)
    (position : VariableBlockPosition k length) :
    vector.blocks position.1 =
      1 +
        (if position.1.1 + 1 = length
          then 1 else 0) +
        vectorExtra vector
          (Sum.inl position) := by
  by_cases hlast :
      position.1.1 + 1 = length
  · have hposition :
        position.1 =
          ⟨length - 1, by omega⟩ := by
      apply Fin.ext
      change position.1.1 = length - 1
      omega
    have htwo := vector.last_two
    change
      2 ≤ vector.blocks
        ⟨length - 1, by omega⟩ at htwo
    have hlastIndex :
        length - 1 + 1 = length :=
      Nat.sub_add_cancel (by omega)
    have htwoPosition :
        2 ≤ vector.blocks position.1 := by
      rw [hposition]
      exact htwo
    simp [vectorExtra, hlast]
    omega
  · have hpos := vector.blocks_pos position.1
    simp [vectorExtra, hlast]
    omega

theorem vectorExtra_event_reconstruct
    {j k weight length : ℕ}
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length)
    (position :
      {position : DivisibleBlockPosition k length //
        position ∈ (vectorEventChoice vector).1}) :
    vector.blocks position.1.1 =
      2 + vectorExtra vector
        (Sum.inr position) := by
  have htwo : 2 ≤ vector.blocks position.1.1 := by
    have hmem := position.2
    change
      position.1 ∈
        (Finset.univ.filter fun eventPosition :
            DivisibleBlockPosition k length =>
          2 ≤ vector.blocks eventPosition.1) at hmem
    exact (Finset.mem_filter.mp hmem).2
  simp [vectorExtra]
  omega

theorem sum_last_indicator_variable_eq_bonus
    (k length : ℕ) (hlength : 0 < length) :
    (∑ position : VariableBlockPosition k length,
        if position.1.1 + 1 = length
          then 1 else 0) =
      foTerminalBonus k length := by
  by_cases hdivides : k ∣ length
  · rw [foTerminalBonus, if_pos hdivides]
    apply Finset.sum_eq_zero
    intro position _
    have hnotLast :
        position.1.1 + 1 ≠ length := by
      intro hlast
      apply position.2
      rw [hlast]
      exact hdivides
    simp [hnotLast]
  · rw [foTerminalBonus, if_neg hdivides]
    exact
      sum_last_indicator_variableBlockPosition
        k length hlength hdivides

theorem vectorExtra_total
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    (∑ position :
        FOExtraPosition
          (vectorEventChoice vector),
        vectorExtra vector position) +
      (length + j +
        foTerminalBonus k length) =
      weight := by
  let choice := vectorEventChoice vector
  have hsplit :=
    Fintype.sum_subtype_add_sum_subtype
      (fun position : Fin length =>
        k ∣ position.1 + 1)
      vector.blocks
  have hvariableCard :=
    card_variableBlockPosition
      k length hk
  have hdivisibleCard :=
    card_divisibleBlockPosition
      k length hk
  have heventCard :
      Fintype.card
          {position :
              DivisibleBlockPosition k length //
            position ∈ choice.1} = j := by
    rw [Fintype.card_coe]
    exact choice.2.1
  have hnonEventCard :
      Fintype.card
          {position :
              DivisibleBlockPosition k length //
            position ∉ choice.1} =
        length / k - j := by
    rw [Fintype.card_subtype_compl
      (fun position :
        DivisibleBlockPosition k length =>
          position ∈ choice.1)]
    rw [heventCard, hdivisibleCard]
  have hnonEvent :
      (∑ position :
          {position :
              DivisibleBlockPosition k length //
            position ∉ choice.1},
        vector.blocks position.1.1) =
        length / k - j := by
    calc
      (∑ position :
          {position :
              DivisibleBlockPosition k length //
            position ∉ choice.1},
          vector.blocks position.1.1) =
          ∑ _position :
            {position :
                DivisibleBlockPosition k length //
              position ∉ choice.1}, 1 := by
        apply Fintype.sum_congr
        intro position
        have hpos :=
          vector.blocks_pos position.1.1
        have hnotTwo :
            ¬2 ≤ vector.blocks position.1.1 := by
          intro htwo
          apply position.2
          simpa [choice, vectorEventChoice] using htwo
        omega
      _ = _ := by simp [hnonEventCard]
  have hevent :
      (∑ position :
          {position :
              DivisibleBlockPosition k length //
            position ∈ choice.1},
        vector.blocks position.1.1) =
        2 * j +
          ∑ position :
            {position :
                DivisibleBlockPosition k length //
              position ∈ choice.1},
            vectorExtra vector
              (Sum.inr position) := by
    calc
      (∑ position :
          {position :
              DivisibleBlockPosition k length //
            position ∈ choice.1},
          vector.blocks position.1.1) =
          ∑ position :
            {position :
                DivisibleBlockPosition k length //
              position ∈ choice.1},
            (2 + vectorExtra vector
              (Sum.inr position)) := by
        apply Fintype.sum_congr
        intro position
        exact
          vectorExtra_event_reconstruct
            vector position
      _ = 2 * j +
          ∑ position :
            {position :
                DivisibleBlockPosition k length //
              position ∈ choice.1},
            vectorExtra vector
              (Sum.inr position) := by
        rw [Finset.sum_add_distrib]
        simp only [Finset.sum_const, nsmul_eq_mul]
        rw [Finset.card_univ]
        change
          Fintype.card
              {position :
                  DivisibleBlockPosition k length //
                position ∈ choice.1} * 2 +
                _ =
            2 * j + _
        rw [heventCard]
        omega
  have hindicator :=
    sum_last_indicator_variable_eq_bonus
      k length vector.length_pos
  have hvariable :
      (∑ position : VariableBlockPosition k length,
        vector.blocks position.1) =
        (length - length / k) +
          foTerminalBonus k length +
          ∑ position : VariableBlockPosition k length,
            vectorExtra vector
              (Sum.inl position) := by
    calc
      (∑ position : VariableBlockPosition k length,
          vector.blocks position.1) =
          ∑ position : VariableBlockPosition k length,
            (1 +
              (if position.1.1 + 1 = length
                then 1 else 0) +
              vectorExtra vector
                (Sum.inl position)) := by
        apply Fintype.sum_congr
        intro position
        exact
          vectorExtra_variable_reconstruct
            vector position
      _ = Fintype.card
              (VariableBlockPosition k length) +
            (∑ position :
                VariableBlockPosition k length,
              if position.1.1 + 1 = length
                then 1 else 0) +
            ∑ position :
                VariableBlockPosition k length,
              vectorExtra vector
                (Sum.inl position) := by
        simp only [Finset.sum_add_distrib]
        simp
      _ = _ := by
        rw [hvariableCard, hindicator]
  have heventFin :
      (∑ position ∈ choice.1,
        vector.blocks position.1) =
        2 * j +
          ∑ position :
            {position :
                DivisibleBlockPosition k length //
              position ∈ choice.1},
            vectorExtra vector
              (Sum.inr position) := by
    calc
      (∑ position ∈ choice.1,
          vector.blocks position.1) =
          ∑ position ∈ choice.1.attach,
            vector.blocks position.1.1 := by
        exact
          (Finset.sum_attach choice.1
            (fun position =>
              vector.blocks position.1)).symm
      _ = _ := hevent
  let nonEvents :
      Finset (DivisibleBlockPosition k length) :=
    Finset.univ.filter fun position =>
      position ∉ choice.1
  have hnonEventFin :
      (∑ position ∈ nonEvents,
        vector.blocks position.1) =
        length / k - j := by
    calc
      (∑ position ∈ nonEvents,
          vector.blocks position.1) =
          ∑ _position ∈ nonEvents, 1 := by
        apply Finset.sum_congr rfl
        intro position hposition
        have hnotMem :
            position ∉ choice.1 := by
          simpa [nonEvents] using hposition
        have hpos := vector.blocks_pos position.1
        have hnotTwo :
            ¬2 ≤ vector.blocks position.1 := by
          intro htwo
          apply hnotMem
          simpa [choice, vectorEventChoice] using htwo
        omega
      _ = nonEvents.card := by simp
      _ = length / k - j := by
        rw [show nonEvents =
            Finset.univ \ choice.1 by
          ext position
          simp [nonEvents]]
        rw [Finset.card_sdiff]
        simp [hdivisibleCard, choice.2.1]
  have hdivisible :
      (∑ position :
          DivisibleBlockPosition k length,
        vector.blocks position.1) =
        2 * j +
          (∑ position :
              {position :
                  DivisibleBlockPosition k length //
                position ∈ choice.1},
            vectorExtra vector
              (Sum.inr position)) +
          (length / k - j) := by
    calc
      (∑ position :
          DivisibleBlockPosition k length,
          vector.blocks position.1) =
          (∑ position ∈
              Finset.univ.filter
                (fun position =>
                  position ∈ choice.1),
            vector.blocks position.1) +
          ∑ position ∈
              Finset.univ.filter
                (fun position =>
                  position ∉ choice.1),
            vector.blocks position.1 := by
        exact (Finset.sum_filter_add_sum_filter_not
          Finset.univ
          (fun position :
            DivisibleBlockPosition k length =>
              position ∈ choice.1)
          (fun position => vector.blocks position.1)).symm
      _ = _ := by
        have heventFilter :
            Finset.univ.filter
                (fun position =>
                  position ∈ choice.1) =
              choice.1 := by
          ext position
          simp
        have hnonEventFilter :
            Finset.univ.filter
                (fun position =>
                  position ∉ choice.1) =
              nonEvents := by
          rfl
        rw [heventFilter, hnonEventFilter,
          heventFin, hnonEventFin]
  rw [hvariable] at hsplit
  rw [hdivisible, vector.blocks_sum] at hsplit
  have hjle : j ≤ length / k := by
    rw [← choice.2.1, ← hdivisibleCard]
    exact Finset.card_le_univ choice.1
  have hdivle : length / k ≤ length :=
    Nat.div_le_self length k
  have htotal :
      (∑ position :
          FOExtraPosition choice,
        vectorExtra vector position) +
          (length + j +
            foTerminalBonus k length) =
        weight := by
    simp only [Fintype.sum_sum_type]
    omega
  simpa [choice] using htotal

theorem vectorExtra_sum
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    (∑ position :
        FOExtraPosition
          (vectorEventChoice vector),
        vectorExtra vector position) =
      weight -
        (length + j +
          foTerminalBonus k length) :=
  Nat.eq_sub_of_add_eq
    (vectorExtra_total hk vector)

theorem periodicMarkedTerminalVector_weight_lower
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    length + j + foTerminalBonus k length ≤ weight := by
  rw [← vectorExtra_total hk vector]
  omega

def vectorExtraData
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    FOExtraData j k weight length
      (vectorEventChoice vector) :=
  ⟨vectorExtra vector, vectorExtra_sum hk vector⟩

def eventExtraDataToVector
    {j k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight)
    (choice : FOEventChoice j k length)
    (data : FOExtraData j k weight length choice) :
    PeriodicMarkedTerminalVector
      j k weight length := by
  classical
  let blocks : Fin length → ℕ :=
    fun position =>
      if hdivides : k ∣ position.1 + 1 then
        if hmember :
            (⟨position, hdivides⟩ :
              DivisibleBlockPosition k length) ∈
                choice.1 then
          2 + data.1
            (Sum.inr
              ⟨⟨position, hdivides⟩, hmember⟩)
        else 1
      else
        1 +
          (if position.1 + 1 = length
            then 1 else 0) +
          data.1 (Sum.inl ⟨position, hdivides⟩)
  refine {
    blocks := blocks
    length_pos := hlength
    blocks_pos := ?_
    blocks_sum := ?_
    event_count := ?_
    last_two := ?_
  }
  · intro position
    by_cases hdivides : k ∣ position.1 + 1
    · by_cases hmember :
          (⟨position, hdivides⟩ :
            DivisibleBlockPosition k length) ∈
              choice.1
      · simp [blocks, hdivides, hmember]
      · simp [blocks, hdivides, hmember]
    · simp [blocks, hdivides]
  · have hsplit :=
      Fintype.sum_subtype_add_sum_subtype
        (fun position : Fin length =>
          k ∣ position.1 + 1)
        blocks
    have hvariableCard :=
      card_variableBlockPosition k length hk
    have hdivisibleCard :=
      card_divisibleBlockPosition k length hk
    have hchoiceLe :
        j ≤ length / k := by
      rw [← choice.2.1, ← hdivisibleCard]
      exact Finset.card_le_univ choice.1
    have hindicator :=
      sum_last_indicator_variable_eq_bonus
        k length hlength
    have hvariable :
        (∑ position :
            VariableBlockPosition k length,
          blocks position.1) =
          (length - length / k) +
            foTerminalBonus k length +
            ∑ position :
              VariableBlockPosition k length,
              data.1 (Sum.inl position) := by
      calc
        (∑ position :
            VariableBlockPosition k length,
            blocks position.1) =
            ∑ position :
              VariableBlockPosition k length,
              (1 +
                (if position.1.1 + 1 = length
                  then 1 else 0) +
                data.1 (Sum.inl position)) := by
          apply Fintype.sum_congr
          intro position
          simp [blocks, position.2]
        _ =
            Fintype.card
                (VariableBlockPosition k length) +
              (∑ position :
                  VariableBlockPosition k length,
                if position.1.1 + 1 = length
                  then 1 else 0) +
              ∑ position :
                VariableBlockPosition k length,
                data.1 (Sum.inl position) := by
          simp only [Finset.sum_add_distrib]
          simp
        _ = _ := by
          rw [hvariableCard, hindicator]
    let nonEvents :
        Finset (DivisibleBlockPosition k length) :=
      Finset.univ \ choice.1
    have hevent :
        (∑ position ∈ choice.1,
          blocks position.1) =
          2 * j +
            ∑ position :
              {position :
                  DivisibleBlockPosition k length //
                position ∈ choice.1},
              data.1 (Sum.inr position) := by
      calc
        (∑ position ∈ choice.1,
            blocks position.1) =
            ∑ position ∈ choice.1.attach,
              blocks position.1.1 := by
          exact
            (Finset.sum_attach choice.1
              (fun position =>
                blocks position.1)).symm
        _ =
            ∑ position ∈ choice.1.attach,
              (2 + data.1
                (Sum.inr position)) := by
          apply Finset.sum_congr rfl
          intro position hposition
          simp only [Finset.mem_attach] at hposition
          simp [blocks, position.1.2,
            position.2]
        _ =
            2 * choice.1.card +
              ∑ position ∈ choice.1.attach,
                data.1 (Sum.inr position) := by
          rw [Finset.sum_add_distrib]
          simp [Nat.mul_comm]
        _ = _ := by
          rw [choice.2.1]
          rfl
    have hnonEvent :
        (∑ position ∈ nonEvents,
          blocks position.1) =
          length / k - j := by
      calc
        (∑ position ∈ nonEvents,
            blocks position.1) =
            ∑ _position ∈ nonEvents, 1 := by
          apply Finset.sum_congr rfl
          intro position hposition
          have hnotMem : position ∉ choice.1 := by
            simpa [nonEvents] using hposition
          simp [blocks, position.2, hnotMem]
        _ = nonEvents.card := by simp
        _ = length / k - j := by
          rw [show nonEvents =
              Finset.univ \ choice.1 by rfl]
          rw [Finset.card_sdiff]
          simp [hdivisibleCard, choice.2.1]
    have hdivisible :
        (∑ position :
            DivisibleBlockPosition k length,
          blocks position.1) =
          2 * j +
            (∑ position :
                {position :
                    DivisibleBlockPosition k length //
                  position ∈ choice.1},
              data.1 (Sum.inr position)) +
            (length / k - j) := by
      calc
        (∑ position :
            DivisibleBlockPosition k length,
            blocks position.1) =
            (∑ position ∈ choice.1,
              blocks position.1) +
            ∑ position ∈ nonEvents,
              blocks position.1 := by
          have hpartition :
              choice.1 ∪ nonEvents =
                Finset.univ := by
            ext position
            simp [nonEvents]
          rw [← hpartition]
          rw [Finset.sum_union]
          exact Finset.disjoint_sdiff
        _ = _ := by rw [hevent, hnonEvent]
    rw [hvariable, hdivisible] at hsplit
    have hquotientLe : length / k ≤ length :=
      Nat.div_le_self length k
    have hextras :
        (∑ position :
            VariableBlockPosition k length,
          data.1 (Sum.inl position)) +
          (∑ position :
              {position :
                  DivisibleBlockPosition k length //
                position ∈ choice.1},
            data.1 (Sum.inr position)) =
          weight -
            (length + j +
              foTerminalBonus k length) := by
      simpa only [Fintype.sum_sum_type] using data.2
    have hresidual :
        length + j + foTerminalBonus k length +
            (weight -
              (length + j +
                foTerminalBonus k length)) =
          weight :=
      Nat.add_sub_of_le hweight
    omega
  · change
      (Finset.univ.filter fun index : Fin length =>
        k ∣ index.1 + 1 ∧
          2 ≤ blocks index).card = j
    calc
      (Finset.univ.filter fun index : Fin length =>
          k ∣ index.1 + 1 ∧
            2 ≤ blocks index).card =
          choice.1.card := by
        apply Finset.card_bij
          (fun index hindex =>
            (⟨index, (Finset.mem_filter.mp
              hindex).2.1⟩ :
              DivisibleBlockPosition k length))
        · intro index hindex
          have hdata :=
            (Finset.mem_filter.mp hindex).2
          by_contra hnotMem
          simp [blocks, hdata.1, hnotMem] at hdata
        · intro left hleft right hright hequal
          exact congrArg Subtype.val hequal
        · intro target htarget
          refine ⟨target.1, ?_, rfl⟩
          simp only [Finset.mem_filter,
            Finset.mem_univ, true_and]
          exact ⟨target.2, by
            simp [blocks, target.2, htarget]⟩
      _ = j := choice.2.1
  · let last : Fin length :=
      ⟨length - 1, by omega⟩
    have hlastIndex :
        last.1 + 1 = length := by
      dsimp [last]
      exact Nat.sub_add_cancel (by omega)
    by_cases hdivides : k ∣ length
    · have hlastMember :
          (⟨last, by
            simpa [hlastIndex] using hdivides⟩ :
            DivisibleBlockPosition k length) ∈
              choice.1 := by
        have hcanonical :=
          choice.2.2 hlength hdivides
        have hequal :
            (⟨last, by
              simpa [hlastIndex] using hdivides⟩ :
              DivisibleBlockPosition k length) =
              lastDivisiblePosition
                k length hlength hdivides := by
          apply Subtype.ext
          apply Fin.ext
          simp [last, lastDivisiblePosition]
        rw [hequal]
        exact hcanonical
      change 2 ≤ blocks last
      simp [blocks, hlastIndex, hdivides,
        hlastMember]
    · change 2 ≤ blocks last
      simp [blocks, hlastIndex, hdivides]

theorem eventExtraDataToVector_toVector
    {j k weight length : ℕ}
    (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    eventExtraDataToVector
        hk vector.length_pos
        (periodicMarkedTerminalVector_weight_lower
          hk vector)
        (vectorEventChoice vector)
        (vectorExtraData hk vector) =
      vector := by
  apply PeriodicMarkedTerminalVector.ext
  funext position
  by_cases hdivides : k ∣ position.1 + 1
  · by_cases hmember :
        (⟨position, hdivides⟩ :
          DivisibleBlockPosition k length) ∈
            (vectorEventChoice vector).1
    · have hreconstruct :=
        vectorExtra_event_reconstruct vector
          (⟨⟨position, hdivides⟩, hmember⟩ :
            {eventPosition :
                DivisibleBlockPosition k length //
              eventPosition ∈
                (vectorEventChoice vector).1})
      simpa [eventExtraDataToVector,
        vectorExtraData, hdivides, hmember]
        using hreconstruct.symm
    · have hpos := vector.blocks_pos position
      have hnotTwo :
          ¬2 ≤ vector.blocks position := by
        intro htwo
        apply hmember
        simpa [vectorEventChoice] using htwo
      simp [eventExtraDataToVector,
        hdivides, hmember]
      omega
  · have hreconstruct :=
      vectorExtra_variable_reconstruct vector
        (⟨position, hdivides⟩ :
          VariableBlockPosition k length)
    simpa [eventExtraDataToVector,
      vectorExtraData, hdivides]
      using hreconstruct.symm

theorem vectorEventChoice_eventExtraDataToVector
    {j k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight)
    (choice : FOEventChoice j k length)
    (data : FOExtraData j k weight length choice) :
    vectorEventChoice
        (eventExtraDataToVector
          hk hlength hweight choice data) =
      choice := by
  apply Subtype.ext
  ext position
  simp only [vectorEventChoice,
    Finset.mem_filter, Finset.mem_univ,
    true_and]
  by_cases hmember : position ∈ choice.1
  · simp [eventExtraDataToVector,
      position.2, hmember]
  · simp [eventExtraDataToVector,
      position.2, hmember]

def periodicMarkedTerminalVectorToEventExtra
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    Σ choice : FOEventChoice j k length,
      FOExtraData j k weight length choice :=
  ⟨vectorEventChoice vector,
    vectorExtraData hk vector⟩

def eventExtraToPeriodicMarkedTerminalVector
    {j k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight)
    (pair :
      Σ choice : FOEventChoice j k length,
        FOExtraData j k weight length choice) :
    PeriodicMarkedTerminalVector
      j k weight length :=
  eventExtraDataToVector
    hk hlength hweight pair.1 pair.2

theorem eventExtraToPeriodicMarkedTerminalVector_toEventExtra
    {j k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight)
    (pair :
      Σ choice : FOEventChoice j k length,
        FOExtraData j k weight length choice) :
    periodicMarkedTerminalVectorToEventExtra hk
        (eventExtraToPeriodicMarkedTerminalVector
          hk hlength hweight pair) =
      pair := by
  rcases pair with ⟨choice, data⟩
  generalize hvector :
      eventExtraDataToVector
        hk hlength hweight choice data = vector
  have hchoice :
      vectorEventChoice vector = choice :=
    (congrArg vectorEventChoice hvector).symm.trans <|
      vectorEventChoice_eventExtraDataToVector
        hk hlength hweight choice data
  unfold periodicMarkedTerminalVectorToEventExtra
    eventExtraToPeriodicMarkedTerminalVector
  rw [hvector]
  apply Sigma.ext hchoice
  cases hchoice
  rw [heq_iff_eq]
  apply Subtype.ext
  funext position
  cases position with
  | inl variablePosition =>
      change
        (vectorExtraData hk vector).1
            (Sum.inl variablePosition) =
          data.1 (Sum.inl variablePosition)
      change
        vectorExtra vector
            (Sum.inl variablePosition) =
          data.1 (Sum.inl variablePosition)
      unfold vectorExtra
      change
        vector.blocks variablePosition.1 - 1 -
            (if variablePosition.1.1 + 1 = length
              then 1 else 0) =
          data.1 (Sum.inl variablePosition)
      have hblock :=
        congrArg
          (fun candidate =>
            candidate.blocks variablePosition.1)
          hvector
      rw [← hblock]
      simp [eventExtraDataToVector,
        variablePosition.2]
      omega
  | inr eventPosition =>
      change
        (vectorExtraData hk vector).1
            (Sum.inr eventPosition) =
          data.1 (Sum.inr eventPosition)
      change
        vectorExtra vector
            (Sum.inr eventPosition) =
          data.1 (Sum.inr eventPosition)
      unfold vectorExtra
      change
        vector.blocks eventPosition.1.1 - 2 =
          data.1 (Sum.inr eventPosition)
      have hblock :=
        congrArg
          (fun candidate =>
            candidate.blocks eventPosition.1.1)
          hvector
      rw [← hblock]
      simp [eventExtraDataToVector,
        eventPosition.1.2, eventPosition.2]

theorem periodicMarkedTerminalVectorToEventExtra_toVector
    {j k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight)
    (vector :
      PeriodicMarkedTerminalVector
        j k weight length) :
    eventExtraToPeriodicMarkedTerminalVector
        hk hlength hweight
        (periodicMarkedTerminalVectorToEventExtra
          hk vector) =
      vector := by
  simpa [eventExtraToPeriodicMarkedTerminalVector,
    periodicMarkedTerminalVectorToEventExtra]
    using eventExtraDataToVector_toVector hk vector

noncomputable def periodicMarkedTerminalVectorEventExtraEquiv
    (j k weight length : ℕ)
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight) :
    PeriodicMarkedTerminalVector
        j k weight length ≃
      Σ choice : FOEventChoice j k length,
        FOExtraData j k weight length choice where
  toFun :=
    periodicMarkedTerminalVectorToEventExtra hk
  invFun :=
    eventExtraToPeriodicMarkedTerminalVector
      hk hlength hweight
  left_inv :=
    periodicMarkedTerminalVectorToEventExtra_toVector
      hk hlength hweight
  right_inv :=
    eventExtraToPeriodicMarkedTerminalVector_toEventExtra
      hk hlength hweight

noncomputable instance periodicMarkedTerminalVectorFintype
    (j k weight length : ℕ) :
    Fintype
      (PeriodicMarkedTerminalVector
        j k weight length) :=
  Fintype.ofEquiv
    (MarkedFOTerminalFixedLength
      j k weight length)
    (markedFOTerminalFixedLengthEquiv
      j k weight length)

theorem card_foExtraPosition
    {j k length : ℕ} (hk : 1 ≤ k)
    (choice : FOEventChoice j k length) :
    Fintype.card (FOExtraPosition choice) =
      length - length / k + j := by
  rw [Fintype.card_sum,
    card_variableBlockPosition k length hk]
  change
    length - length / k +
        Fintype.card
          {position :
              DivisibleBlockPosition k length //
            position ∈ choice.1} =
      length - length / k + j
  rw [Fintype.card_coe, choice.2.1]

theorem card_foExtraData
    {j k weight length : ℕ} (hk : 1 ≤ k)
    (choice : FOEventChoice j k length) :
    Fintype.card
        (FOExtraData j k weight length choice) =
      ((length - length / k + j) +
          (weight -
            (length + j +
              foTerminalBonus k length)) - 1).choose
        (weight -
          (length + j +
            foTerminalBonus k length)) := by
  calc
    Fintype.card
        (FOExtraData j k weight length choice) =
        Fintype.card
          (Sym (FOExtraPosition choice)
            (weight -
              (length + j +
                foTerminalBonus k length))) :=
      Fintype.card_congr
        (Sym.equivNatSumOfFintype
          (FOExtraPosition choice)
          (weight -
            (length + j +
              foTerminalBonus k length))).symm
    _ =
        (Fintype.card (FOExtraPosition choice) +
          (weight -
            (length + j +
              foTerminalBonus k length)) - 1).choose
          (weight -
            (length + j +
              foTerminalBonus k length)) :=
      Sym.card_sym_eq_choose
        (weight -
          (length + j +
            foTerminalBonus k length))
    _ = _ := by rw [card_foExtraPosition hk choice]

noncomputable def
    foEventChoiceEquivPowersetCardOfNotDvd
    (j k length : ℕ) (hnotDvd : ¬k ∣ length) :
    FOEventChoice j k length ≃
      {events :
          Finset (DivisibleBlockPosition k length) //
        events ∈
          (Finset.univ.powersetCard j)} :=
  Equiv.subtypeEquivRight fun events => by
    simp only [Finset.mem_powersetCard,
      Finset.subset_univ, true_and]
    constructor
    · intro hevents
      exact hevents.1
    · intro hcard
      refine ⟨hcard, ?_⟩
      intro _hlength hdivides
      exact (hnotDvd hdivides).elim

theorem card_foEventChoice_of_not_dvd
    (j k length : ℕ) (hk : 1 ≤ k)
    (hnotDvd : ¬k ∣ length) :
    Fintype.card (FOEventChoice j k length) =
      (length / k).choose j := by
  rw [Fintype.card_congr
    (foEventChoiceEquivPowersetCardOfNotDvd
      j k length hnotDvd)]
  rw [Fintype.card_coe,
    Finset.card_powersetCard,
    Finset.card_univ,
    card_divisibleBlockPosition k length hk]

noncomputable def
    foEventChoiceEquivPowersetCardContainingLast
    (j k length : ℕ) (hlength : 0 < length)
    (hdivides : k ∣ length) :
    FOEventChoice j k length ≃
      {events :
          Finset (DivisibleBlockPosition k length) //
        events ∈
          (Finset.univ.powersetCard j).filter
            ({lastDivisiblePosition
                k length hlength hdivides} ⊆ ·)} :=
  Equiv.subtypeEquivRight fun events => by
    simp only [Finset.mem_filter,
      Finset.mem_powersetCard,
      Finset.subset_univ, true_and,
      Finset.singleton_subset_iff]
    constructor
    · intro hevents
      exact ⟨hevents.1,
        hevents.2 hlength hdivides⟩
    · intro hevents
      refine ⟨hevents.1, ?_⟩
      intro otherLength otherDivides
      have hequal :
          lastDivisiblePosition
              k length otherLength otherDivides =
            lastDivisiblePosition
              k length hlength hdivides := by
        apply Subtype.ext
        rfl
      rw [hequal]
      exact hevents.2

theorem card_foEventChoice_of_dvd
    (j k length : ℕ) (hj : 1 ≤ j)
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hdivides : k ∣ length) :
    Fintype.card (FOEventChoice j k length) =
      (length / k - 1).choose (j - 1) := by
  rw [Fintype.card_congr
    (foEventChoiceEquivPowersetCardContainingLast
      j k length hlength hdivides)]
  rw [Fintype.card_coe]
  rw [Finset.card_filter_powersetCard_subset]
  · simp only [Finset.card_singleton,
      Finset.card_univ]
    rw [card_divisibleBlockPosition k length hk]
  · exact Finset.singleton_subset_iff.mpr
      (Finset.mem_univ _)
  · simpa using hj

noncomputable def foEventChoiceCount
    (j k length : ℕ) : ℕ :=
  if k ∣ length then
    (length / k - 1).choose (j - 1)
  else
    (length / k).choose j

theorem card_foEventChoice
    (j k length : ℕ) (hj : 1 ≤ j)
    (hk : 1 ≤ k) (hlength : 0 < length) :
    Fintype.card (FOEventChoice j k length) =
      foEventChoiceCount j k length := by
  by_cases hdivides : k ∣ length
  · rw [foEventChoiceCount, if_pos hdivides]
    exact card_foEventChoice_of_dvd
      j k length hj hk hlength hdivides
  · rw [foEventChoiceCount, if_neg hdivides]
    exact card_foEventChoice_of_not_dvd
      j k length hk hdivides

theorem card_periodicMarkedTerminalVector
    (j k weight length : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k)
    (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight) :
    Fintype.card
        (PeriodicMarkedTerminalVector
          j k weight length) =
      foEventChoiceCount j k length *
        ((length - length / k + j) +
            (weight -
              (length + j +
                foTerminalBonus k length)) - 1).choose
          (weight -
            (length + j +
              foTerminalBonus k length)) := by
  calc
    Fintype.card
        (PeriodicMarkedTerminalVector
          j k weight length) =
        Fintype.card
          (Σ choice : FOEventChoice j k length,
            FOExtraData j k weight length choice) :=
      Fintype.card_congr
        (periodicMarkedTerminalVectorEventExtraEquiv
          j k weight length hk hlength hweight)
    _ =
        ∑ choice : FOEventChoice j k length,
          Fintype.card
            (FOExtraData j k weight length choice) := by
      rw [Fintype.card_sigma]
    _ =
        ∑ _choice : FOEventChoice j k length,
          ((length - length / k + j) +
              (weight -
                (length + j +
                  foTerminalBonus k length)) - 1).choose
            (weight -
              (length + j +
                foTerminalBonus k length)) := by
      apply Fintype.sum_congr
      intro choice
      exact card_foExtraData hk choice
    _ = _ := by
      rw [Finset.sum_const,
        Finset.card_univ,
        card_foEventChoice
          j k length hj hk hlength]
      simp [Nat.mul_comm]

theorem card_markedFOTerminalFixedLength
    (j k weight length : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k)
    (hlength : 0 < length)
    (hweight :
      length + j + foTerminalBonus k length ≤ weight) :
    Fintype.card
        (MarkedFOTerminalFixedLength
          j k weight length) =
      foEventChoiceCount j k length *
        ((length - length / k + j) +
            (weight -
              (length + j +
                foTerminalBonus k length)) - 1).choose
          (weight -
            (length + j +
              foTerminalBonus k length)) := by
  rw [Fintype.card_congr
    (markedFOTerminalFixedLengthEquiv
      j k weight length)]
  exact card_periodicMarkedTerminalVector
    j k weight length hj hk hlength hweight

def markedFOTerminalLengthSplit
    {j k weight : ℕ}
    (terminal :
      MarkedFOTerminalComposition j k weight) :
    Σ length : Fin (weight + 1),
      MarkedFOTerminalFixedLength
        j k weight length.1 := by
  have hlengthLe :
      terminal.1.1.blocks.length ≤ weight := by
    calc
      terminal.1.1.blocks.length ≤
          terminal.1.1.blocks.sum :=
        List.length_le_sum_of_one_le
          terminal.1.1.blocks (by
            intro block hblock
            exact terminal.1.1.blocks_pos hblock)
      _ = weight := terminal.1.1.blocks_sum
  exact
    ⟨⟨terminal.1.1.blocks.length, by omega⟩,
      ⟨terminal, rfl⟩⟩

def markedFOTerminalLengthJoin
    {j k weight : ℕ}
    (split :
      Σ length : Fin (weight + 1),
        MarkedFOTerminalFixedLength
          j k weight length.1) :
    MarkedFOTerminalComposition j k weight :=
  split.2.1

theorem markedFOTerminalLengthJoin_split
    {j k weight : ℕ}
    (terminal :
      MarkedFOTerminalComposition j k weight) :
    markedFOTerminalLengthJoin
        (markedFOTerminalLengthSplit terminal) =
      terminal := rfl

theorem markedFOTerminalLengthSplit_join
    {j k weight : ℕ}
    (split :
      Σ length : Fin (weight + 1),
        MarkedFOTerminalFixedLength
          j k weight length.1) :
    markedFOTerminalLengthSplit
        (markedFOTerminalLengthJoin split) =
      split := by
  rcases split with
    ⟨⟨length, hlengthBound⟩,
      ⟨terminal, hlength⟩⟩
  change
    terminal.1.1.blocks.length = length at hlength
  subst length
  rfl

noncomputable def markedFOTerminalLengthEquiv
    (j k weight : ℕ) :
    MarkedFOTerminalComposition j k weight ≃
      Σ length : Fin (weight + 1),
        MarkedFOTerminalFixedLength
          j k weight length.1 where
  toFun := markedFOTerminalLengthSplit
  invFun := markedFOTerminalLengthJoin
  left_inv := markedFOTerminalLengthJoin_split
  right_inv := markedFOTerminalLengthSplit_join

theorem markedFOTerminal_card_length_sum
    (j k weight : ℕ) :
    Fintype.card
        (MarkedFOTerminalComposition j k weight) =
      ∑ length : Fin (weight + 1),
        Fintype.card
          (MarkedFOTerminalFixedLength
            j k weight length.1) := by
  rw [← Fintype.card_sigma]
  exact Fintype.card_congr
    (markedFOTerminalLengthEquiv j k weight)

noncomputable def foPositiveFixedLengthCount
    (j k weight length : ℕ) : ℕ :=
  if 0 < length ∧
      length + j + foTerminalBonus k length ≤ weight then
    foEventChoiceCount j k length *
      ((length - length / k + j) +
          (weight -
            (length + j +
              foTerminalBonus k length)) - 1).choose
        (weight -
          (length + j +
            foTerminalBonus k length))
  else 0

theorem card_markedFOTerminalFixedLength_eq_count
    (j k weight length : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k) :
    Fintype.card
        (MarkedFOTerminalFixedLength
          j k weight length) =
      foPositiveFixedLengthCount
        j k weight length := by
  classical
  by_cases hadmissible :
      0 < length ∧
        length + j + foTerminalBonus k length ≤ weight
  · rw [foPositiveFixedLengthCount,
      if_pos hadmissible]
    exact card_markedFOTerminalFixedLength
      j k weight length hj hk
        hadmissible.1 hadmissible.2
  · rw [foPositiveFixedLengthCount,
      if_neg hadmissible]
    apply Fintype.card_eq_zero_iff.mpr
    constructor
    intro terminal
    let vector :=
      markedFOTerminalFixedLengthToVector terminal
    have hlength : 0 < length :=
      vector.length_pos
    have hweight :
        length + j +
            foTerminalBonus k length ≤ weight :=
      periodicMarkedTerminalVector_weight_lower
        hk vector
    exact hadmissible ⟨hlength, hweight⟩

theorem markedFOTerminal_card_eq_length_count
    (j k weight : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k) :
    Fintype.card
        (MarkedFOTerminalComposition j k weight) =
      ∑ length : Fin (weight + 1),
        foPositiveFixedLengthCount
          j k weight length.1 := by
  rw [markedFOTerminal_card_length_sum]
  apply Fintype.sum_congr
  intro length
  exact
    card_markedFOTerminalFixedLength_eq_count
      j k weight length.1 hj hk

theorem canonicalFO_eq_length_count
    (j k n : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    CanonicalFO j k n =
      ∑ length : Fin (n + 2),
        foPositiveFixedLengthCount
          j k (n + 1) length.1 := by
  rw [canonicalFO_eq_marked_card]
  exact markedFOTerminal_card_eq_length_count
    j k (n + 1) hj hk

noncomputable def foPositiveLengthSeries
    (j k length : ℕ) : PowerSeries ℚ :=
  if 0 < length then
    (foEventChoiceCount j k length : ℚ) •
      (PowerSeries.X ^
          (length + j +
            foTerminalBonus k length - 1) *
        (PowerSeries.invOneSubPow ℚ
          (length - length / k + j)).val)
  else 0

theorem coeff_foPositiveLengthSeries
    (j k length n : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (foPositiveLengthSeries j k length) =
      (foPositiveFixedLengthCount
        j k (n + 1) length : ℚ) := by
  classical
  by_cases hlength : 0 < length
  · rw [foPositiveLengthSeries, if_pos hlength]
    have hquotientLe : length / k ≤ length :=
      Nat.div_le_self length k
    have hpositionsPos :
        0 < length - length / k + j := by
      omega
    let baseline :=
      length + j + foTerminalBonus k length
    have hbaselinePos : 0 < baseline := by
      dsimp [baseline]
      omega
    by_cases hadmissible : baseline ≤ n + 1
    · have hexponentLe : baseline - 1 ≤ n := by
        omega
      have hexponentLeLiteral :
          length + j +
              foTerminalBonus k length - 1 ≤ n := by
        simpa [baseline] using hexponentLe
      rw [PowerSeries.coeff_smul,
        PowerSeries.coeff_X_pow_mul']
      simp only [if_pos hexponentLeLiteral,
        smul_eq_mul]
      rw [PowerSeries.invOneSubPow_val_eq_mk_sub_one_add_choose_of_pos
        ℚ (length - length / k + j)
        hpositionsPos]
      simp only [PowerSeries.coeff_mk]
      rw [foPositiveFixedLengthCount]
      have hcountAdmissible :
          0 < length ∧
            length + j +
                foTerminalBonus k length ≤ n + 1 := by
        simpa [baseline] using
          And.intro hlength hadmissible
      rw [if_pos hcountAdmissible]
      change
        (foEventChoiceCount j k length : ℚ) *
            (((length - length / k + j - 1 +
                (n -
                  (length + j +
                    foTerminalBonus k length - 1))).choose
              (length - length / k + j - 1) : ℕ) : ℚ) =
          ((foEventChoiceCount j k length *
            ((length - length / k + j +
                ((n + 1) -
                  (length + j +
                    foTerminalBonus k length)) - 1).choose
              ((n + 1) -
                (length + j +
                  foTerminalBonus k length)) : ℕ) : ℕ) : ℚ)
      rw [Nat.cast_mul]
      congr 1
      rw [Nat.cast_inj]
      have hresidual :
          n -
              (length + j +
                foTerminalBonus k length - 1) =
            (n + 1) -
              (length + j +
                foTerminalBonus k length) := by
        omega
      rw [hresidual]
      have htop :
          length - length / k + j - 1 +
                ((n + 1) -
                  (length + j +
                    foTerminalBonus k length)) =
            length - length / k + j +
                ((n + 1) -
                  (length + j +
                    foTerminalBonus k length)) - 1 := by
        omega
      rw [← htop]
      exact Nat.choose_symm_add
    · have hexponentNotLe : ¬baseline - 1 ≤ n := by
        omega
      have hexponentNotLeLiteral :
          ¬(length + j +
              foTerminalBonus k length - 1 ≤ n) := by
        simpa [baseline] using hexponentNotLe
      rw [PowerSeries.coeff_smul,
        PowerSeries.coeff_X_pow_mul']
      simp only [if_neg hexponentNotLeLiteral,
        smul_zero]
      have hcountNotAdmissible :
          ¬(0 < length ∧
            length + j +
                foTerminalBonus k length ≤ n + 1) := by
        intro hcount
        apply hadmissible
        simpa [baseline] using hcount.2
      rw [foPositiveFixedLengthCount,
        if_neg hcountNotAdmissible]
      rfl
  · rw [foPositiveLengthSeries, if_neg hlength]
    change
      0 =
        (foPositiveFixedLengthCount
          j k (n + 1) length : ℚ)
    rw [foPositiveFixedLengthCount]
    simp [hlength]

theorem foEventChoiceCount_shift
    (j k length : ℕ) (hj : 1 ≤ j)
    (hk : 1 ≤ k) (hlength : 0 < length) :
    foEventChoiceCount (j + 1) k (length + k) =
      foEventChoiceCount (j + 1) k length +
        foEventChoiceCount j k length := by
  have hkPos : 0 < k := by omega
  have hquotient :
      (length + k) / k = length / k + 1 := by
    calc
      (length + k) / k =
          length / k + k / k :=
        Nat.add_div_of_dvd_left (dvd_refl k)
      _ = length / k + 1 := by
        rw [Nat.div_self hkPos]
  have hshiftDvd :
      k ∣ length + k ↔ k ∣ length :=
    (Nat.dvd_add_iff_left (dvd_refl k)).symm
  by_cases hdivides : k ∣ length
  · have hquotientPos : 0 < length / k :=
      Nat.div_pos (Nat.le_of_dvd hlength hdivides) hkPos
    obtain ⟨group, hgroup⟩ :=
      Nat.exists_eq_succ_of_ne_zero
        (by omega : length / k ≠ 0)
    obtain ⟨mark, rfl⟩ :=
      Nat.exists_eq_succ_of_ne_zero
        (by omega : j ≠ 0)
    rw [foEventChoiceCount,
      if_pos (hshiftDvd.mpr hdivides),
      foEventChoiceCount, if_pos hdivides,
      foEventChoiceCount, if_pos hdivides,
      hquotient, hgroup]
    simpa [Nat.succ_eq_add_one,
      Nat.add_comm] using
      (Nat.choose_succ_succ group mark)
  · rw [foEventChoiceCount,
      if_neg (not_congr hshiftDvd |>.mpr hdivides),
      foEventChoiceCount, if_neg hdivides,
      foEventChoiceCount, if_neg hdivides,
      hquotient]
    simpa [Nat.succ_eq_add_one,
      Nat.add_comm] using
      (Nat.choose_succ_succ
        (length / k) j)

theorem foEventChoiceCount_one_shift
    (k length : ℕ) (hk : 1 ≤ k)
    (hlength : 0 < length) :
    foEventChoiceCount 1 k (length + k) =
      foEventChoiceCount 1 k length +
        (if k ∣ length then 0 else 1) := by
  have hkPos : 0 < k := by omega
  have hquotient :
      (length + k) / k = length / k + 1 := by
    calc
      (length + k) / k =
          length / k + k / k :=
        Nat.add_div_of_dvd_left (dvd_refl k)
      _ = length / k + 1 := by
        rw [Nat.div_self hkPos]
  have hshiftDvd :
      k ∣ length + k ↔ k ∣ length :=
    (Nat.dvd_add_iff_left (dvd_refl k)).symm
  by_cases hdivides : k ∣ length
  · have hquotientPos : 0 < length / k :=
      Nat.div_pos (Nat.le_of_dvd hlength hdivides) hkPos
    obtain ⟨group, hgroup⟩ :=
      Nat.exists_eq_succ_of_ne_zero
        (by omega : length / k ≠ 0)
    rw [foEventChoiceCount,
      if_pos (hshiftDvd.mpr hdivides),
      foEventChoiceCount, if_pos hdivides,
      if_pos hdivides, hquotient, hgroup]
    simp
  · rw [foEventChoiceCount,
      if_neg (not_congr hshiftDvd |>.mpr hdivides),
      foEventChoiceCount, if_neg hdivides,
      if_neg hdivides, hquotient]
    simp

theorem foPositiveLengthSeries_shift
    (j k length : ℕ) (hj : 1 ≤ j)
    (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ k *
        foPositiveLengthSeries
          (j + 1) k (length + k) =
      PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveLengthSeries
            (j + 1) k length +
        PowerSeries.X ^ (k + 1) *
          foPositiveLengthSeries j k length := by
  classical
  have hkPos : 0 < k := by omega
  by_cases hlength : 0 < length
  · have hshiftLength : 0 < length + k := by omega
    have hquotient :
        (length + k) / k = length / k + 1 := by
      calc
        (length + k) / k =
            length / k + k / k :=
          Nat.add_div_of_dvd_left (dvd_refl k)
        _ = length / k + 1 := by
          rw [Nat.div_self hkPos]
    have hshiftDvd :
        k ∣ length + k ↔ k ∣ length :=
      (Nat.dvd_add_iff_left (dvd_refl k)).symm
    have hbonus :
        foTerminalBonus k (length + k) =
          foTerminalBonus k length := by
      unfold foTerminalBonus
      by_cases hdivides : k ∣ length
      · rw [if_pos hdivides,
          if_pos (hshiftDvd.mpr hdivides)]
      · rw [if_neg hdivides,
          if_neg
            ((not_congr hshiftDvd).mpr hdivides)]
    let currentPositions :=
      length - length / k + (j + 1)
    let previousPositions :=
      length - length / k + j
    let currentExponent :=
      length + (j + 1) +
        foTerminalBonus k length - 1
    let previousExponent :=
      length + j +
        foTerminalBonus k length - 1
    let currentCore : PowerSeries ℚ :=
      PowerSeries.X ^ currentExponent *
        (PowerSeries.invOneSubPow ℚ
          currentPositions).val
    let previousCore : PowerSeries ℚ :=
      PowerSeries.X ^ previousExponent *
        (PowerSeries.invOneSubPow ℚ
          previousPositions).val
    let shiftedCore : PowerSeries ℚ :=
      PowerSeries.X ^
          (length + k + (j + 1) +
            foTerminalBonus k (length + k) - 1) *
        (PowerSeries.invOneSubPow ℚ
          ((length + k) - (length + k) / k +
            (j + 1))).val
    let commonCore : PowerSeries ℚ :=
      PowerSeries.X ^ k *
        (1 - PowerSeries.X) * currentCore
    have hpositionShift :
        (length + k) - (length + k) / k +
              (j + 1) =
            currentPositions + (k - 1) := by
      dsimp [currentPositions]
      rw [hquotient]
      have hquotientLe : length / k ≤ length :=
        Nat.div_le_self length k
      omega
    have hpositionStep :
        currentPositions =
          previousPositions + 1 := by
      dsimp [currentPositions, previousPositions]
      omega
    have hexponentShift :
        length + k + (j + 1) +
              foTerminalBonus k (length + k) - 1 =
            currentExponent + k := by
      dsimp [currentExponent]
      rw [hbonus]
      omega
    have hexponentStep :
        currentExponent =
          previousExponent + 1 := by
      dsimp [currentExponent, previousExponent]
      omega
    have hinvShift :
        (1 - PowerSeries.X) ^ (k - 1) *
            (PowerSeries.invOneSubPow ℚ
              (currentPositions + (k - 1))).val =
          (PowerSeries.invOneSubPow ℚ
            currentPositions).val :=
      PowerSeries.one_sub_pow_mul_invOneSubPow_val_add_eq_invOneSubPow_val
        ℚ currentPositions (k - 1)
    have hinvStep :
        (1 - PowerSeries.X) *
            (PowerSeries.invOneSubPow ℚ
              (previousPositions + 1)).val =
          (PowerSeries.invOneSubPow ℚ
            previousPositions).val := by
      simpa using
        (PowerSeries.one_sub_pow_mul_invOneSubPow_val_add_eq_invOneSubPow_val
          ℚ previousPositions 1)
    have hshiftCore :
        (1 - PowerSeries.X) ^ k *
            shiftedCore =
          commonCore := by
      dsimp [shiftedCore, commonCore, currentCore]
      rw [hpositionShift, hexponentShift]
      have hpowK :
          (1 - PowerSeries.X : PowerSeries ℚ) ^ k =
            (1 - PowerSeries.X) ^
                (k - 1) *
              (1 - PowerSeries.X) := by
        calc
          (1 - PowerSeries.X : PowerSeries ℚ) ^ k =
              (1 - PowerSeries.X) ^
                ((k - 1) + 1) := by
            congr 1
            omega
          _ = _ := by rw [pow_succ]
      calc
        (1 - PowerSeries.X) ^ k *
              (PowerSeries.X ^
                  (currentExponent + k) *
                (PowerSeries.invOneSubPow ℚ
                  (currentPositions + (k - 1))).val) =
            PowerSeries.X ^
                (currentExponent + k) *
              ((1 - PowerSeries.X) ^ (k - 1) *
                (PowerSeries.invOneSubPow ℚ
                  (currentPositions + (k - 1))).val) *
              (1 - PowerSeries.X) := by
          rw [hpowK]
          ring
        _ =
            PowerSeries.X ^
                (currentExponent + k) *
              (PowerSeries.invOneSubPow ℚ
                currentPositions).val *
              (1 - PowerSeries.X) := by
          rw [hinvShift]
        _ =
            PowerSeries.X ^ k *
              (1 - PowerSeries.X) *
              (PowerSeries.X ^ currentExponent *
                (PowerSeries.invOneSubPow ℚ
                  currentPositions).val) := by
          rw [pow_add]
          ring
    have hpreviousCore :
        PowerSeries.X ^ (k + 1) *
            previousCore =
          commonCore := by
      dsimp [previousCore, commonCore, currentCore]
      rw [hpositionStep, hexponentStep]
      rw [← hinvStep]
      rw [pow_add]
      ring
    have hcount :=
      foEventChoiceCount_shift
        j k length hj hk hlength
    simp only [foPositiveLengthSeries,
      if_pos hlength, if_pos hshiftLength]
    let shiftedCount : ℚ :=
      foEventChoiceCount
        (j + 1) k (length + k)
    let currentCount : ℚ :=
      foEventChoiceCount
        (j + 1) k length
    let previousCount : ℚ :=
      foEventChoiceCount j k length
    have hcountCast :
        shiftedCount =
          currentCount + previousCount := by
      dsimp [shiftedCount, currentCount,
        previousCount]
      exact_mod_cast hcount
    change
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
        PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            (currentCount • currentCore) +
          PowerSeries.X ^ (k + 1) *
            (previousCount • previousCore)
    calc
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
          shiftedCount • commonCore := by
        rw [mul_smul_comm, hshiftCore]
      _ =
          (currentCount + previousCount) •
            commonCore := by rw [hcountCast]
      _ =
          currentCount • commonCore +
            previousCount • commonCore := by
        rw [add_smul]
      _ = _ := by
        simp only [mul_smul_comm]
        rw [hpreviousCore]
  · have hzero : length = 0 := by omega
    subst length
    have hjTwo : 2 ≤ j + 1 := by omega
    have hchooseZero :
        (0 : ℕ).choose j = 0 :=
      Nat.choose_eq_zero_of_lt hj
    simp [foPositiveLengthSeries,
      foEventChoiceCount, hkPos,
      Nat.div_self, hchooseZero]

theorem foPositiveLengthSeries_one_shift
    (k length : ℕ) (hk : 1 ≤ k)
    (hlength : 0 < length) :
    (1 - PowerSeries.X) ^ k *
        foPositiveLengthSeries 1 k (length + k) =
      PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveLengthSeries 1 k length +
        PowerSeries.X ^ (k + 1) *
          foZeroLengthSeries k length := by
  classical
  have hkPos : 0 < k := by omega
  have hshiftLength : 0 < length + k := by omega
  have hquotient :
      (length + k) / k = length / k + 1 := by
    calc
      (length + k) / k =
          length / k + k / k :=
        Nat.add_div_of_dvd_left (dvd_refl k)
      _ = length / k + 1 := by
        rw [Nat.div_self hkPos]
  have hshiftDvd :
      k ∣ length + k ↔ k ∣ length :=
    (Nat.dvd_add_iff_left (dvd_refl k)).symm
  have hbonus :
      foTerminalBonus k (length + k) =
        foTerminalBonus k length := by
    unfold foTerminalBonus
    by_cases hdivides : k ∣ length
    · rw [if_pos hdivides,
        if_pos (hshiftDvd.mpr hdivides)]
    · rw [if_neg hdivides,
        if_neg
          ((not_congr hshiftDvd).mpr hdivides)]
  let currentPositions :=
    length - length / k + 1
  let previousPositions :=
    length - length / k
  let currentExponent :=
    length + 1 +
      foTerminalBonus k length - 1
  let currentCore : PowerSeries ℚ :=
    PowerSeries.X ^ currentExponent *
      (PowerSeries.invOneSubPow ℚ
        currentPositions).val
  let shiftedCore : PowerSeries ℚ :=
    PowerSeries.X ^
        (length + k + 1 +
          foTerminalBonus k (length + k) - 1) *
      (PowerSeries.invOneSubPow ℚ
        ((length + k) - (length + k) / k +
          1)).val
  let commonCore : PowerSeries ℚ :=
    PowerSeries.X ^ k *
      (1 - PowerSeries.X) * currentCore
  have hpositionShift :
      (length + k) - (length + k) / k + 1 =
          currentPositions + (k - 1) := by
    dsimp [currentPositions]
    rw [hquotient]
    have hquotientLe : length / k ≤ length :=
      Nat.div_le_self length k
    omega
  have hpositionStep :
      currentPositions =
        previousPositions + 1 := by
    dsimp [currentPositions, previousPositions]
  have hexponentShift :
      length + k + 1 +
            foTerminalBonus k (length + k) - 1 =
          currentExponent + k := by
    dsimp [currentExponent]
    rw [hbonus]
    omega
  have hinvShift :
      (1 - PowerSeries.X) ^ (k - 1) *
          (PowerSeries.invOneSubPow ℚ
            (currentPositions + (k - 1))).val =
        (PowerSeries.invOneSubPow ℚ
          currentPositions).val :=
    PowerSeries.one_sub_pow_mul_invOneSubPow_val_add_eq_invOneSubPow_val
      ℚ currentPositions (k - 1)
  have hinvStep :
      (1 - PowerSeries.X) *
          (PowerSeries.invOneSubPow ℚ
            (previousPositions + 1)).val =
        (PowerSeries.invOneSubPow ℚ
          previousPositions).val := by
    simpa using
      (PowerSeries.one_sub_pow_mul_invOneSubPow_val_add_eq_invOneSubPow_val
        ℚ previousPositions 1)
  have hshiftCore :
      (1 - PowerSeries.X) ^ k *
          shiftedCore =
        commonCore := by
    dsimp [shiftedCore, commonCore, currentCore]
    rw [hpositionShift, hexponentShift]
    have hpowK :
        (1 - PowerSeries.X : PowerSeries ℚ) ^ k =
          (1 - PowerSeries.X) ^ (k - 1) *
            (1 - PowerSeries.X) := by
      calc
        (1 - PowerSeries.X : PowerSeries ℚ) ^ k =
            (1 - PowerSeries.X) ^
              ((k - 1) + 1) := by
          congr 1
          omega
        _ = _ := by rw [pow_succ]
    calc
      (1 - PowerSeries.X) ^ k *
            (PowerSeries.X ^
                (currentExponent + k) *
              (PowerSeries.invOneSubPow ℚ
                (currentPositions + (k - 1))).val) =
          PowerSeries.X ^
              (currentExponent + k) *
            ((1 - PowerSeries.X) ^ (k - 1) *
              (PowerSeries.invOneSubPow ℚ
                (currentPositions + (k - 1))).val) *
            (1 - PowerSeries.X) := by
        rw [hpowK]
        ring
      _ =
          PowerSeries.X ^
              (currentExponent + k) *
            (PowerSeries.invOneSubPow ℚ
              currentPositions).val *
            (1 - PowerSeries.X) := by
        rw [hinvShift]
      _ =
          PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            (PowerSeries.X ^ currentExponent *
              (PowerSeries.invOneSubPow ℚ
                currentPositions).val) := by
        rw [pow_add]
        ring
  have hcount :=
    foEventChoiceCount_one_shift
      k length hk hlength
  simp only [foPositiveLengthSeries,
    if_pos hlength, if_pos hshiftLength]
  let shiftedCount : ℚ :=
    foEventChoiceCount 1 k (length + k)
  let currentCount : ℚ :=
    foEventChoiceCount 1 k length
  by_cases hdivides : k ∣ length
  · have hcountCast :
        shiftedCount = currentCount := by
      dsimp [shiftedCount, currentCount]
      have hsimplified := hcount
      rw [if_pos hdivides, add_zero] at hsimplified
      exact_mod_cast hsimplified
    have hzeroSeries :
        foZeroLengthSeries k length = 0 := by
      simp [foZeroLengthSeries, hdivides]
    change
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
        PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            (currentCount • currentCore) +
          PowerSeries.X ^ (k + 1) *
            foZeroLengthSeries k length
    rw [hzeroSeries, mul_zero, add_zero]
    calc
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
          shiftedCount • commonCore := by
        rw [mul_smul_comm, hshiftCore]
      _ = currentCount • commonCore := by
        rw [hcountCast]
      _ = _ := by
        simp only [mul_smul_comm]
        rfl
  · have hcountCast :
        shiftedCount = currentCount + 1 := by
      dsimp [shiftedCount, currentCount]
      have hsimplified := hcount
      rw [if_neg hdivides] at hsimplified
      exact_mod_cast hsimplified
    have hpreviousCore :
        PowerSeries.X ^ (k + 1) *
            foZeroLengthSeries k length =
          commonCore := by
      rw [foZeroLengthSeries,
        if_pos ⟨hlength, hdivides⟩]
      dsimp [commonCore, currentCore,
        currentExponent, previousPositions]
      rw [hpositionStep]
      unfold foTerminalBonus
      rw [if_neg hdivides]
      change
        PowerSeries.X ^ (k + 1) *
            (PowerSeries.X ^ length *
              (PowerSeries.invOneSubPow ℚ
                previousPositions).val) =
          PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            (PowerSeries.X ^ (length + 1) *
              (PowerSeries.invOneSubPow ℚ
                (previousPositions + 1)).val)
      calc
        PowerSeries.X ^ (k + 1) *
              (PowerSeries.X ^ length *
                (PowerSeries.invOneSubPow ℚ
                  previousPositions).val) =
            PowerSeries.X ^ k *
              (PowerSeries.X ^ (length + 1) *
                (PowerSeries.invOneSubPow ℚ
                  previousPositions).val) := by
          rw [pow_add]
          ring
        _ =
            PowerSeries.X ^ k *
              (PowerSeries.X ^ (length + 1) *
                ((1 - PowerSeries.X) *
                  (PowerSeries.invOneSubPow ℚ
                    (previousPositions + 1)).val)) := by
          rw [hinvStep]
        _ = _ := by ring
    change
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
        PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            (currentCount • currentCore) +
          PowerSeries.X ^ (k + 1) *
            foZeroLengthSeries k length
    calc
      (1 - PowerSeries.X) ^ k *
          (shiftedCount • shiftedCore) =
          shiftedCount • commonCore := by
        rw [mul_smul_comm, hshiftCore]
      _ = (currentCount + 1) •
            commonCore := by rw [hcountCast]
      _ = currentCount • commonCore +
            commonCore := by
        rw [add_smul, one_smul]
      _ = _ := by
        simp only [mul_smul_comm]
        rw [hpreviousCore]

noncomputable def foPositivePartialSeries
    (j k bound : ℕ) : PowerSeries ℚ :=
  ∑ length ∈ Finset.range (bound + 1),
    foPositiveLengthSeries j k length

noncomputable def foPositiveTailSeries
    (j k n : ℕ) : PowerSeries ℚ :=
  ∑ offset ∈ Finset.range k,
    foPositiveLengthSeries
      j k (n + 1 + offset)

theorem coeff_foPositivePartialSeries_diagonal
    (j k n : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (foPositivePartialSeries j k n) =
      (CanonicalFO j k n : ℚ) := by
  rw [foPositivePartialSeries, map_sum]
  simp only [map_sum,
    coeff_foPositiveLengthSeries
      j k _ n hj hk]
  rw [canonicalFO_eq_length_count
    j k n hj hk,
    Fin.sum_univ_eq_sum_range]
  simp only [Nat.cast_sum]
  have hlast :
      foPositiveFixedLengthCount
        j k (n + 1) (n + 1) = 0 := by
    simp [foPositiveFixedLengthCount]
    omega
  conv_rhs =>
    rw [Finset.sum_range_succ]
  rw [hlast, Nat.cast_zero, add_zero]

theorem coeff_foPositivePartialSeries_of_le
    (j k bound degree : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k)
    (hdegree : degree ≤ bound) :
    PowerSeries.coeff degree
        (foPositivePartialSeries j k bound) =
      (CanonicalFO j k degree : ℚ) := by
  rw [foPositivePartialSeries, map_sum]
  simp only [
    coeff_foPositiveLengthSeries
      j k _ degree hj hk]
  have hsubset :
      Finset.range (degree + 1) ⊆
        Finset.range (bound + 1) := by
    intro length hlength
    simp only [Finset.mem_range] at hlength ⊢
    omega
  calc
    (∑ length ∈ Finset.range (bound + 1),
        (foPositiveFixedLengthCount
          j k (degree + 1) length : ℚ)) =
        ∑ length ∈ Finset.range (degree + 1),
          (foPositiveFixedLengthCount
            j k (degree + 1) length : ℚ) := by
      symm
      apply Finset.sum_subset hsubset
      intro length _hlengthBound hlengthDegree
      have htooLarge : degree < length := by
        simp only [Finset.mem_range,
          not_lt] at hlengthDegree
        omega
      simp [foPositiveFixedLengthCount]
      omega
    _ =
        PowerSeries.coeff degree
          (foPositivePartialSeries
            j k degree) := by
      rw [foPositivePartialSeries, map_sum]
      simp only [
        coeff_foPositiveLengthSeries
          j k _ degree hj hk]
    _ = (CanonicalFO j k degree : ℚ) :=
      coeff_foPositivePartialSeries_diagonal
        j k degree hj hk

theorem foPositiveLengthSeries_base_zero
    (j k length : ℕ) (hj : 1 ≤ j)
    (hk : 1 ≤ k) (hlt : length < k) :
    foPositiveLengthSeries j k length = 0 := by
  by_cases hlength : 0 < length
  · have hnotDvd : ¬k ∣ length := by
      intro hdivides
      exact (not_lt_of_ge
        (Nat.le_of_dvd hlength hdivides)) hlt
    have hquotient : length / k = 0 :=
      Nat.div_eq_of_lt hlt
    have hchoose :
        (0 : ℕ).choose j = 0 :=
      Nat.choose_eq_zero_of_lt hj
    simp [foPositiveLengthSeries,
      foEventChoiceCount, hlength,
      hnotDvd, hquotient, hchoose]
  · simp [foPositiveLengthSeries, hlength]

theorem foPositivePartialSeries_split_base
    (j k n : ℕ) :
    foPositivePartialSeries j k (n + k) =
      (∑ length ∈ Finset.range k,
        foPositiveLengthSeries j k length) +
      (∑ offset ∈ Finset.range (n + 1),
        foPositiveLengthSeries
          j k (k + offset)) := by
  rw [foPositivePartialSeries]
  have hbound :
      n + k + 1 = k + (n + 1) := by omega
  rw [hbound, Finset.sum_range_add]

theorem foPositivePartialSeries_split_tail
    (j k n : ℕ) :
    foPositivePartialSeries j k (n + k) =
      foPositivePartialSeries j k n +
        foPositiveTailSeries j k n := by
  simp only [foPositivePartialSeries,
    foPositiveTailSeries]
  have hbound :
      n + k + 1 = (n + 1) + k := by omega
  rw [hbound, Finset.sum_range_add]

theorem foPositive_base_length_sum_zero
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    (∑ length ∈ Finset.range k,
      foPositiveLengthSeries j k length) = 0 := by
  apply Finset.sum_eq_zero
  intro length hlength
  exact foPositiveLengthSeries_base_zero
    j k length hj hk
      (Finset.mem_range.mp hlength)

theorem foPositiveLengthSeries_one_boundary
    (k : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ k *
        foPositiveLengthSeries 1 k k =
      PowerSeries.X ^ k := by
  have hkPos : 0 < k := by omega
  have hunit :
      (1 - PowerSeries.X : PowerSeries ℚ) ^ k *
          (PowerSeries.invOneSubPow ℚ k).val =
        1 := by
    have hinverse :=
      (PowerSeries.invOneSubPow ℚ k).inv_val
    rw [PowerSeries.invOneSubPow_inv_eq_one_sub_pow]
      at hinverse
    exact hinverse
  rw [foPositiveLengthSeries, if_pos hkPos]
  have hdivides : k ∣ k := dvd_refl k
  have hquotient : k / k = 1 :=
    Nat.div_self hkPos
  simp [foEventChoiceCount, hdivides,
    hquotient, foTerminalBonus]
  rw [show k - 1 + 1 = k by omega]
  calc
    (1 - PowerSeries.X) ^ k *
          (PowerSeries.X ^ k *
            (PowerSeries.invOneSubPow ℚ k).val) =
        PowerSeries.X ^ k *
          ((1 - PowerSeries.X) ^ k *
            (PowerSeries.invOneSubPow ℚ k).val) := by
      ring
    _ = _ := by rw [hunit, mul_one]

theorem foPositiveLengthSeries_one_shift_with_boundary
    (k length : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ k *
        foPositiveLengthSeries 1 k (length + k) =
      PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveLengthSeries 1 k length +
        PowerSeries.X ^ (k + 1) *
          foZeroLengthSeries k length +
        (if length = 0 then
          PowerSeries.X ^ k else 0) := by
  by_cases hlength : length = 0
  · subst length
    rw [if_pos rfl]
    simp only [zero_add]
    rw [foPositiveLengthSeries_one_boundary k hk]
    simp [foPositiveLengthSeries,
      foZeroLengthSeries]
  · rw [if_neg hlength, add_zero]
    exact foPositiveLengthSeries_one_shift
      k length hk (Nat.pos_of_ne_zero hlength)

theorem foPositive_shifted_length_sum
    (j k n : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ k *
        (∑ offset ∈ Finset.range (n + 1),
          foPositiveLengthSeries
            (j + 1) k (k + offset)) =
      PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositivePartialSeries
            (j + 1) k n +
        PowerSeries.X ^ (k + 1) *
          foPositivePartialSeries j k n := by
  rw [Finset.mul_sum]
  rw [foPositivePartialSeries,
    Finset.mul_sum,
    foPositivePartialSeries,
    Finset.mul_sum]
  rw [← Finset.sum_add_distrib]
  apply Finset.sum_congr rfl
  intro offset _hoffset
  simpa [Nat.add_comm] using
    foPositiveLengthSeries_shift
      j k offset hj hk

theorem foPositive_one_shifted_length_sum
    (k n : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ k *
        (∑ offset ∈ Finset.range (n + 1),
          foPositiveLengthSeries
            1 k (k + offset)) =
      PowerSeries.X ^ k +
        PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositivePartialSeries 1 k n +
        PowerSeries.X ^ (k + 1) *
          foZeroPartialSeries k n := by
  have hterm :
      ∀ offset ∈ Finset.range (n + 1),
        (1 - PowerSeries.X) ^ k *
            foPositiveLengthSeries
              1 k (k + offset) =
          PowerSeries.X ^ k *
              (1 - PowerSeries.X) *
              foPositiveLengthSeries 1 k offset +
            PowerSeries.X ^ (k + 1) *
              foZeroLengthSeries k offset +
            (if offset = 0 then
              PowerSeries.X ^ k else 0) := by
    intro offset _hoffset
    simpa [Nat.add_comm] using
      foPositiveLengthSeries_one_shift_with_boundary
        k offset hk
  have hzeroMem :
      0 ∈ Finset.range (n + 1) := by simp
  have hboundarySum :
      (∑ offset ∈ Finset.range (n + 1),
        if offset = 0 then
          (PowerSeries.X : PowerSeries ℚ) ^ k
        else 0) =
        (PowerSeries.X : PowerSeries ℚ) ^ k := by
    rw [Finset.sum_eq_single 0]
    · simp
    · intro offset hoffset hne
      simp [hne]
    · intro hnotMem
      exact (hnotMem hzeroMem).elim
  rw [Finset.mul_sum]
  calc
    (∑ offset ∈ Finset.range (n + 1),
        (1 - PowerSeries.X) ^ k *
          foPositiveLengthSeries
            1 k (k + offset)) =
        ∑ offset ∈ Finset.range (n + 1),
          (PowerSeries.X ^ k *
              (1 - PowerSeries.X) *
              foPositiveLengthSeries 1 k offset +
            PowerSeries.X ^ (k + 1) *
              foZeroLengthSeries k offset +
            (if offset = 0 then
              PowerSeries.X ^ k else 0)) := by
      apply Finset.sum_congr rfl
      intro offset hoffset
      exact hterm offset hoffset
    _ = _ := by
      rw [Finset.sum_add_distrib,
        Finset.sum_add_distrib]
      rw [← Finset.mul_sum,
        ← Finset.mul_sum]
      rw [hboundarySum]
      simp only [foPositivePartialSeries,
        foZeroPartialSeries]
      ring

theorem foPositive_partial_telescope
    (j k n : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ) *
        foPositivePartialSeries
          (j + 1) k (n + k) =
      PowerSeries.X ^ (k + 1) *
          foPositivePartialSeries j k n -
        PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveTailSeries
            (j + 1) k n := by
  have hpow :
      (1 - PowerSeries.X : PowerSeries ℚ) *
          (1 - PowerSeries.X) ^ (k - 1) =
        (1 - PowerSeries.X) ^ k := by
    calc
      (1 - PowerSeries.X : PowerSeries ℚ) *
            (1 - PowerSeries.X) ^ (k - 1) =
          (1 - PowerSeries.X) ^
            ((k - 1) + 1) := by
        rw [pow_succ]
        ring
      _ = (1 - PowerSeries.X) ^ k := by
        congr 1
        omega
  rw [foZeroDenominator_coe]
  rw [mul_sub, hpow]
  rw [sub_mul]
  nth_rewrite 1 [
    foPositivePartialSeries_split_base
      (j + 1) k n]
  rw [foPositive_base_length_sum_zero
    (j + 1) k (by omega) hk, zero_add]
  rw [foPositive_shifted_length_sum
    j k n hj hk]
  nth_rewrite 1 [
    foPositivePartialSeries_split_tail
      (j + 1) k n]
  ring

theorem foPositive_one_partial_telescope
    (k n : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ) *
        foPositivePartialSeries 1 k (n + k) =
      PowerSeries.X ^ k +
        PowerSeries.X ^ (k + 1) *
          foZeroPartialSeries k n -
        PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveTailSeries 1 k n := by
  have hpow :
      (1 - PowerSeries.X : PowerSeries ℚ) *
          (1 - PowerSeries.X) ^ (k - 1) =
        (1 - PowerSeries.X) ^ k := by
    calc
      (1 - PowerSeries.X : PowerSeries ℚ) *
            (1 - PowerSeries.X) ^ (k - 1) =
          (1 - PowerSeries.X) ^
            ((k - 1) + 1) := by
        rw [pow_succ]
        ring
      _ = (1 - PowerSeries.X) ^ k := by
        congr 1
        omega
  rw [foZeroDenominator_coe]
  rw [mul_sub, hpow]
  rw [sub_mul]
  nth_rewrite 1 [
    foPositivePartialSeries_split_base
      1 k n]
  rw [foPositive_base_length_sum_zero
    1 k (by omega) hk, zero_add]
  rw [foPositive_one_shifted_length_sum
    k n hk]
  nth_rewrite 1 [
    foPositivePartialSeries_split_tail
      1 k n]
  ring

theorem coeff_X_pow_mul_foPositiveTailSeries
    (j k n shift : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (PowerSeries.X ^ shift *
          foPositiveTailSeries j k n) = 0 := by
  rw [foPositiveTailSeries,
    Finset.mul_sum, map_sum]
  apply Finset.sum_eq_zero
  intro offset _hoffset
  rw [PowerSeries.coeff_X_pow_mul']
  by_cases hshiftLe : shift ≤ n
  · rw [if_pos hshiftLe,
      coeff_foPositiveLengthSeries
        j k (n + 1 + offset)
          (n - shift) hj hk]
    simp [foPositiveFixedLengthCount]
    omega
  · simp [hshiftLe]

theorem coeff_positive_tail_error
    (j k n : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (PowerSeries.X ^ k *
          (1 - PowerSeries.X) *
          foPositiveTailSeries j k n) = 0 := by
  have hexpand :
      PowerSeries.X ^ k *
            (1 - PowerSeries.X) *
            foPositiveTailSeries j k n =
          PowerSeries.X ^ k *
              foPositiveTailSeries j k n -
            PowerSeries.X ^ (k + 1) *
              foPositiveTailSeries j k n := by
    rw [pow_add]
    ring
  rw [hexpand, map_sub,
    coeff_X_pow_mul_foPositiveTailSeries
      j k n k hj hk,
    coeff_X_pow_mul_foPositiveTailSeries
      j k n (k + 1) hj hk,
    sub_zero]

theorem coeff_mul_foPositivePartialSeries_of_le
    (factor : PowerSeries ℚ)
    (j k bound degree : ℕ)
    (hj : 1 ≤ j) (hk : 1 ≤ k)
    (hdegree : degree ≤ bound) :
    PowerSeries.coeff degree
        (factor *
          foPositivePartialSeries j k bound) =
      PowerSeries.coeff degree
        (factor *
          seriesOf (fun n =>
            (CanonicalFO j k n : ℚ))) := by
  rw [PowerSeries.coeff_mul,
    PowerSeries.coeff_mul]
  apply Finset.sum_congr rfl
  intro pair hpair
  rw [coeff_foPositivePartialSeries_of_le
    j k bound pair.2 hj hk]
  · rw [coeff_seriesOf]
  · have hpairsum :=
      Finset.mem_antidiagonal.mp hpair
    omega

theorem coeff_mul_foZeroPartialSeries_of_le
    (factor : PowerSeries ℚ)
    (k bound degree : ℕ) (hk : 1 ≤ k)
    (hdegree : degree ≤ bound) :
    PowerSeries.coeff degree
        (factor * foZeroPartialSeries k bound) =
      PowerSeries.coeff degree
        (factor *
          seriesOf (fun n =>
            (CanonicalFO 0 k n : ℚ))) := by
  rw [PowerSeries.coeff_mul,
    PowerSeries.coeff_mul]
  apply Finset.sum_congr rfl
  intro pair hpair
  rw [coeff_foZeroPartialSeries_of_le
    k bound pair.2 hk]
  · rw [coeff_seriesOf]
  · have hpairsum :=
      Finset.mem_antidiagonal.mp hpair
    omega

theorem foPositive_series_recurrence
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ) *
        seriesOf (fun n =>
          (CanonicalFO (j + 1) k n : ℚ)) =
      PowerSeries.X ^ (k + 1) *
        seriesOf (fun n =>
          (CanonicalFO j k n : ℚ)) := by
  apply PowerSeries.ext
  intro degree
  have htelescope :=
    congrArg (PowerSeries.coeff degree)
      (foPositive_partial_telescope
        j k degree hj hk)
  simp only [map_sub,
    coeff_positive_tail_error
      (j + 1) k degree (by omega) hk,
    sub_zero] at htelescope
  have hleft :=
    coeff_mul_foPositivePartialSeries_of_le
      ((1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ))
      (j + 1) k (degree + k) degree
      (by omega) hk (by omega)
  have hright :=
    coeff_mul_foPositivePartialSeries_of_le
      (PowerSeries.X ^ (k + 1))
      j k degree degree hj hk (by omega)
  rw [hleft, hright] at htelescope
  exact htelescope

theorem foPositive_one_series_recurrence
    (k : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ) *
        seriesOf (fun n =>
          (CanonicalFO 1 k n : ℚ)) =
      PowerSeries.X ^ k +
        PowerSeries.X ^ (k + 1) *
          seriesOf (fun n =>
            (CanonicalFO 0 k n : ℚ)) := by
  apply PowerSeries.ext
  intro degree
  have htelescope :=
    congrArg (PowerSeries.coeff degree)
      (foPositive_one_partial_telescope
        k degree hk)
  simp only [map_sub,
    coeff_positive_tail_error
      1 k degree (by omega) hk,
    sub_zero] at htelescope
  have hleft :=
    coeff_mul_foPositivePartialSeries_of_le
      ((1 - PowerSeries.X) *
        (foZeroDenominator k : PowerSeries ℚ))
      1 k (degree + k) degree
      (by omega) hk (by omega)
  have hright :=
    coeff_mul_foZeroPartialSeries_of_le
      (PowerSeries.X ^ (k + 1))
      k degree degree hk (by omega)
  rw [hleft] at htelescope
  simp only [map_add] at htelescope ⊢
  rw [hright] at htelescope
  exact htelescope

theorem X_mul_TK_reindex
    (k : ℕ) :
    Polynomial.X * TK k =
      ∑ exponent ∈ Finset.Icc 2 k,
        Polynomial.X ^ exponent *
          (1 - Polynomial.X) ^
            (k - exponent) := by
  rw [TK, Finset.mul_sum]
  apply Finset.sum_bij
    (fun exponent _ => exponent + 1)
  · intro exponent hexponent
    simp only [Finset.mem_Icc] at hexponent ⊢
    omega
  · intro left hleft right hright hequal
    omega
  · intro target htarget
    simp only [Finset.mem_Icc] at htarget
    refine ⟨target - 1, ?_, ?_⟩
    · simp only [Finset.mem_Icc]
      omega
    · omega
  · intro exponent hexponent
    simp only [Finset.mem_Icc] at hexponent
    have hpower :
        k - exponent - 1 =
          k - (exponent + 1) := by
      omega
    rw [hpower, pow_succ]
    ring

theorem RK_extension_sum
    (k : ℕ) (hk : 2 ≤ k) :
    (∑ exponent ∈ Finset.Icc 2 k,
        (Polynomial.X : Polynomial ℤ) ^ exponent *
          (1 - (Polynomial.X : Polynomial ℤ)) ^
            (k - exponent)) =
      (∑ exponent ∈ Finset.Icc 2 (k - 1),
        (Polynomial.X : Polynomial ℤ) ^ exponent *
          (1 - (Polynomial.X : Polynomial ℤ)) ^
            (k - exponent)) +
        (Polynomial.X : Polynomial ℤ) ^ k := by
  have hfinset :
      Finset.Icc 2 k =
        insert k (Finset.Icc 2 (k - 1)) := by
    ext exponent
    simp only [Finset.mem_Icc,
      Finset.mem_insert]
    omega
  rw [hfinset, Finset.sum_insert]
  · simp [add_comm]
  · simp only [Finset.mem_Icc]
    omega

theorem one_sub_X_mul_RK
    (k : ℕ) (hk : 1 ≤ k) :
    (1 - Polynomial.X) * RK k =
      AO k + Polynomial.X * TK k := by
  by_cases hkTwo : 2 ≤ k
  · have hfirst :
        (1 - (Polynomial.X : Polynomial ℤ)) *
            (1 - (Polynomial.X : Polynomial ℤ)) ^ (k - 2) =
          (1 - (Polynomial.X : Polynomial ℤ)) ^
            (k - 1) := by
      calc
        (1 - (Polynomial.X : Polynomial ℤ)) *
              (1 - (Polynomial.X : Polynomial ℤ)) ^
                (k - 2) =
            (1 - (Polynomial.X : Polynomial ℤ)) ^
              ((k - 2) + 1) := by
          rw [pow_succ]
          ring
        _ = _ := by
          congr 1
          omega
    have hsum :
        (1 - (Polynomial.X : Polynomial ℤ)) *
            (∑ exponent ∈
                Finset.Icc 2 (k - 1),
              (Polynomial.X : Polynomial ℤ) ^ exponent *
                (1 - (Polynomial.X : Polynomial ℤ)) ^
                  (k - 1 - exponent)) =
          ∑ exponent ∈
              Finset.Icc 2 (k - 1),
            (Polynomial.X : Polynomial ℤ) ^ exponent *
              (1 - (Polynomial.X : Polynomial ℤ)) ^
                (k - exponent) := by
      rw [Finset.mul_sum]
      apply Finset.sum_congr rfl
      intro exponent hexponent
      simp only [Finset.mem_Icc] at hexponent
      have hexponentPower :
          k - exponent =
            (k - 1 - exponent) + 1 := by
        omega
      rw [hexponentPower, pow_succ]
      ring
    rw [RK, mul_add, hfirst, hsum]
    rw [AO, X_mul_TK_reindex,
      RK_extension_sum k hkTwo]
    ring
  · have hkOne : k = 1 := by omega
    subst k
    simp [RK, AO, TK]

theorem one_sub_X_mul_RK_coe
    (k : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) *
        ((mapIntPolynomialToRat (RK k) :
          Polynomial ℚ) : PowerSeries ℚ) =
      (foZeroDenominator k : PowerSeries ℚ) +
        PowerSeries.X *
          (foZeroNumerator k : PowerSeries ℚ) := by
  have hpoly :
      (1 - Polynomial.X) *
          mapIntPolynomialToRat (RK k) =
        mapIntPolynomialToRat (AO k) +
          Polynomial.X *
            mapIntPolynomialToRat (TK k) := by
    simpa [mapIntPolynomialToRat] using
      congrArg
        (Polynomial.map (Int.castRingHom ℚ))
        (one_sub_X_mul_RK k hk)
  have hseries :=
    congrArg
      Polynomial.coeToPowerSeries.ringHom
      hpoly
  simpa [foZeroDenominator,
    foZeroNumerator] using hseries

noncomputable def foPositiveExplicitSeries
    (j k : ℕ) : PowerSeries ℚ :=
  PowerSeries.X ^ ((k + 1) * j - 1) *
    (1 - PowerSeries.X)⁻¹ ^ (j - 1) *
    (((foZeroDenominator k :
        Polynomial ℚ) : PowerSeries ℚ)⁻¹) ^
      (j + 1) *
    ((mapIntPolynomialToRat (RK k) :
      Polynomial ℚ) : PowerSeries ℚ)

theorem canonicalFO_one_series_explicit
    (k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n =>
        (CanonicalFO 1 k n : ℚ)) =
      foPositiveExplicitSeries 1 k := by
  let A : PowerSeries ℚ :=
    1 - PowerSeries.X
  let D : PowerSeries ℚ :=
    (foZeroDenominator k :
      Polynomial ℚ)
  let R : PowerSeries ℚ :=
    (mapIntPolynomialToRat (RK k) :
      Polynomial ℚ)
  let T : PowerSeries ℚ :=
    (foZeroNumerator k :
      Polynomial ℚ)
  have hAconstant :
      PowerSeries.constantCoeff A ≠ 0 := by
    simp [A]
  have hDconstant :
      PowerSeries.constantCoeff D ≠ 0 := by
    dsimp [D]
    simpa using
      (show
        (foZeroDenominator k).coeff 0 ≠ 0 by
          rw [foZeroDenominator_coeff_zero k hk]
          exact one_ne_zero)
  have hstepConstant :
      PowerSeries.constantCoeff (A * D) ≠ 0 := by
    rw [map_mul]
    exact mul_ne_zero hAconstant hDconstant
  have hAinv :
      A * A⁻¹ = 1 :=
    PowerSeries.mul_inv_cancel A hAconstant
  have hDinv :
      D * D⁻¹ = 1 :=
    PowerSeries.mul_inv_cancel D hDconstant
  have hnumerator :
      A * R =
        D + PowerSeries.X * T := by
    simpa [A, D, R, T] using
      one_sub_X_mul_RK_coe k hk
  have hsolve :
      seriesOf (fun n =>
          (CanonicalFO 1 k n : ℚ)) =
        (PowerSeries.X ^ k +
            PowerSeries.X ^ (k + 1) *
              seriesOf (fun n =>
                (CanonicalFO 0 k n : ℚ))) *
          (A * D)⁻¹ := by
    apply
      (PowerSeries.eq_mul_inv_iff_mul_eq
        hstepConstant).2
    simpa [A, D, mul_comm, mul_left_comm,
      mul_assoc] using
      foPositive_one_series_recurrence k hk
  rw [hsolve,
    canonicalFO_zero_series k hk]
  unfold rationalSeries
  change
    (PowerSeries.X ^ k +
        PowerSeries.X ^ (k + 1) *
          (T * D⁻¹)) *
        (A * D)⁻¹ =
      foPositiveExplicitSeries 1 k
  rw [PowerSeries.mul_inv_rev]
  have hcombine :
      PowerSeries.X ^ k +
          PowerSeries.X ^ (k + 1) *
            (T * D⁻¹) =
        PowerSeries.X ^ k *
          (D + PowerSeries.X * T) *
          D⁻¹ := by
    calc
      PowerSeries.X ^ k +
            PowerSeries.X ^ (k + 1) *
              (T * D⁻¹) =
          PowerSeries.X ^ k *
              (D * D⁻¹) +
            PowerSeries.X ^ k *
              PowerSeries.X * T * D⁻¹ := by
        rw [hDinv, mul_one, pow_add]
        ring
      _ = _ := by ring
  rw [hcombine, ← hnumerator]
  unfold foPositiveExplicitSeries
  change
    PowerSeries.X ^ k *
          (A * R) * D⁻¹ *
          (D⁻¹ * A⁻¹) =
      PowerSeries.X ^ ((k + 1) * 1 - 1) *
        A⁻¹ ^ (1 - 1) *
        D⁻¹ ^ (1 + 1) * R
  rw [show (k + 1) * 1 - 1 = k by omega,
    show 1 - 1 = 0 by omega,
    show 1 + 1 = 2 by omega]
  simp only [pow_zero, mul_one]
  change
    PowerSeries.X ^ k *
          (A * R) * D⁻¹ *
          (D⁻¹ * A⁻¹) =
      PowerSeries.X ^ k *
        D⁻¹ ^ 2 * R
  calc
    PowerSeries.X ^ k *
          (A * R) * D⁻¹ *
          (D⁻¹ * A⁻¹) =
        (A * A⁻¹) *
          (PowerSeries.X ^ k *
            D⁻¹ ^ 2 * R) := by ring
    _ = _ := by rw [hAinv, one_mul]

theorem canonicalFO_series_explicit
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    seriesOf (fun n =>
        (CanonicalFO j k n : ℚ)) =
      foPositiveExplicitSeries j k := by
  obtain ⟨m, rfl⟩ :=
    Nat.exists_eq_add_of_le hj
  induction m with
  | zero =>
      simpa using
        canonicalFO_one_series_explicit k hk
  | succ m ih =>
      let A : PowerSeries ℚ :=
        1 - PowerSeries.X
      let D : PowerSeries ℚ :=
        (foZeroDenominator k :
          Polynomial ℚ)
      have hAconstant :
          PowerSeries.constantCoeff A ≠ 0 := by
        simp [A]
      have hDconstant :
          PowerSeries.constantCoeff D ≠ 0 := by
        dsimp [D]
        simpa using
          (show
            (foZeroDenominator k).coeff 0 ≠ 0 by
              rw [foZeroDenominator_coeff_zero k hk]
              exact one_ne_zero)
      have hstepConstant :
          PowerSeries.constantCoeff (A * D) ≠ 0 := by
        rw [map_mul]
        exact mul_ne_zero hAconstant hDconstant
      have hsolve :
          seriesOf (fun n =>
              (CanonicalFO
                ((m + 1) + 1) k n : ℚ)) =
            (PowerSeries.X ^ (k + 1) *
                seriesOf (fun n =>
                  (CanonicalFO
                    (m + 1) k n : ℚ))) *
              (A * D)⁻¹ := by
        apply
          (PowerSeries.eq_mul_inv_iff_mul_eq
            hstepConstant).2
        simpa [A, D, mul_comm, mul_left_comm,
          mul_assoc] using
          foPositive_series_recurrence
            (m + 1) k (by omega) hk
      have ih' :
          seriesOf (fun n =>
              (CanonicalFO (m + 1) k n : ℚ)) =
            foPositiveExplicitSeries (m + 1) k := by
        simpa only [Nat.add_comm] using ih (by omega)
      rw [show 1 + (m + 1) = (m + 1) + 1 by omega]
      rw [hsolve, ih']
      unfold foPositiveExplicitSeries
      rw [PowerSeries.mul_inv_rev]
      change
        (PowerSeries.X ^ (k + 1) *
            (PowerSeries.X ^
                ((k + 1) * (m + 1) - 1) *
              A⁻¹ ^ ((m + 1) - 1) *
              D⁻¹ ^ ((m + 1) + 1) *
              ((mapIntPolynomialToRat (RK k) :
                Polynomial ℚ) : PowerSeries ℚ))) *
            (D⁻¹ * A⁻¹) =
          PowerSeries.X ^
              ((k + 1) * ((m + 1) + 1) - 1) *
            A⁻¹ ^ (((m + 1) + 1) - 1) *
            D⁻¹ ^ (((m + 1) + 1) + 1) *
            ((mapIntPolynomialToRat (RK k) :
              Polynomial ℚ) : PowerSeries ℚ)
      have hexponent :
          (k + 1) +
                ((k + 1) * (m + 1) - 1) =
            (k + 1) * ((m + 1) + 1) - 1 := by
        have hproduct :
            (k + 1) * ((m + 1) + 1) =
              (k + 1) * (m + 1) +
                (k + 1) := by ring
        have hpositive :
            1 ≤ (k + 1) * (m + 1) := by
          exact Nat.one_le_iff_ne_zero.mpr
            (Nat.mul_ne_zero (by omega) (by omega))
        omega
      have hXpow :
          PowerSeries.X ^ (k + 1) *
              PowerSeries.X ^
                ((k + 1) * (m + 1) - 1) =
            (PowerSeries.X : PowerSeries ℚ) ^
              ((k + 1) * ((m + 1) + 1) - 1) := by
        rw [← pow_add, hexponent]
      have hAcurrent : (m + 1) - 1 = m := by omega
      have hAnext :
          ((m + 1) + 1) - 1 = m + 1 := by omega
      have hDcurrent :
          (m + 1) + 1 = m + 2 := by omega
      have hDnext :
          ((m + 1) + 1) + 1 = m + 3 := by omega
      rw [hAcurrent, hAnext, hDcurrent, hDnext]
      have hApow :
          A⁻¹ ^ (m + 1) =
            A⁻¹ ^ m * A⁻¹ := by
        exact pow_succ (A⁻¹) m
      have hDpow :
          D⁻¹ ^ (m + 3) =
            D⁻¹ ^ (m + 2) * D⁻¹ := by
        convert pow_succ (D⁻¹) (m + 2) using 1 <;>
          omega
      rw [hApow, hDpow]
      calc
        (PowerSeries.X ^ (k + 1) *
            (PowerSeries.X ^
                ((k + 1) * (m + 1) - 1) *
              A⁻¹ ^ m *
              D⁻¹ ^ (m + 2) *
              ((mapIntPolynomialToRat (RK k) :
                Polynomial ℚ) : PowerSeries ℚ))) *
            (D⁻¹ * A⁻¹) =
          (PowerSeries.X ^ (k + 1) *
              PowerSeries.X ^
                ((k + 1) * (m + 1) - 1)) *
            (A⁻¹ ^ m * A⁻¹) *
            (D⁻¹ ^ (m + 2) * D⁻¹) *
            ((mapIntPolynomialToRat (RK k) :
              Polynomial ℚ) : PowerSeries ℚ) := by ring
        _ = _ := by rw [hXpow]

theorem canonicalFO_series
    (j k : ℕ) (hj : 1 ≤ j) (hk : 1 ≤ k) :
    seriesOf (fun n =>
        (CanonicalFO j k n : ℚ)) =
      rationalSeries
        (foFixedJNumerator j k)
        (foFixedJDenominator j k) := by
  rw [canonicalFO_series_explicit j k hj hk]
  unfold foPositiveExplicitSeries rationalSeries
    foFixedJNumerator foFixedJDenominator
  unfold foZeroDenominator
  simp only [Polynomial.coe_mul,
    Polynomial.coe_pow, Polynomial.coe_sub,
    Polynomial.coe_one, Polynomial.coe_X]
  rw [PowerSeries.mul_inv_rev,
    powerSeries_inv_pow,
    powerSeries_inv_pow]
  ring

theorem canonicalFO_asymptotic
    (j k : ℕ) (hj : 1 ≤ j) (hk : 2 ≤ k) :
    (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
      coefficientModel
        (foLeadingConstant j k hk) j
        (aoRoot k hk) :=
  canonicalFO_asymptotic_of_series j k hk
    (canonicalFO_series j k hj (by omega))

end FixedPerimeter
