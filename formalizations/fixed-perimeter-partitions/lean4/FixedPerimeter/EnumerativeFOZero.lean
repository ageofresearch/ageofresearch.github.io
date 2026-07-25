import FixedPerimeter.CompositionModel
import FixedPerimeter.FixedJSeries
import FixedPerimeter.SeriesTransport
import Mathlib.Data.Finsupp.Multiset
import Mathlib.Data.Sym.Card
import Mathlib.RingTheory.PowerSeries.WellKnown

/-!
# Exact enumeration for the zero-frequency `FO` branch

The `FO` statistic inspects the block at each size divisible by `k`.  Its
zero branch therefore consists of terminal compositions whose blocks in
positions `k, 2k, 3k, ...` are exactly one.  This file first packages that
periodic condition independently of the recursive counting function.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

/-- Recursive zero-event condition beginning at the one-based position
`size`.  At a position divisible by `k`, the corresponding positive block
must be exactly one. -/
def BlockDivisibleZeroAux (k size : ℕ) : List ℕ → Prop
  | [] => True
  | block :: rest =>
      (k ∣ size → block = 1) ∧
        BlockDivisibleZeroAux k (size + 1) rest

def BlockDivisibleZero (k : ℕ) (blocks : List ℕ) : Prop :=
  BlockDivisibleZeroAux k 1 blocks

theorem blockDivisibleZeroAux_iff_getElem
    (k size : ℕ) (blocks : List ℕ) :
    BlockDivisibleZeroAux k size blocks ↔
      ∀ (index : ℕ) (hindex : index < blocks.length),
        k ∣ size + index → blocks[index] = 1 := by
  induction blocks generalizing size with
  | nil =>
      simp [BlockDivisibleZeroAux]
  | cons block rest ih =>
      rw [BlockDivisibleZeroAux]
      constructor
      · rintro ⟨hblock, hrest⟩ index hindex hdivides
        cases index with
        | zero =>
            have hdividesSize : k ∣ size := by
              simpa using hdivides
            simpa using hblock hdividesSize
        | succ index =>
            have hindexRest : index < rest.length := by
              simpa using hindex
            have hdividesRest : k ∣ (size + 1) + index := by
              convert hdivides using 1 <;> omega
            simpa using
              (ih (size := size + 1)).mp hrest
                index hindexRest hdividesRest
      · intro hpointwise
        constructor
        · intro hdivides
          have hzero :=
            hpointwise 0 (by simp) (by simpa using hdivides)
          simpa using hzero
        · apply (ih (size := size + 1)).mpr
          intro index hindex hdivides
          have hdividesCons : k ∣ size + (index + 1) := by
            convert hdivides using 1 <;> omega
          have hvalue :=
            hpointwise (index + 1) (by simpa using hindex)
              hdividesCons
          simpa using hvalue

theorem blockDivisiblePresentCountAux_eq_zero_iff
    (k size : ℕ) (blocks : List ℕ)
    (hpos : ∀ block ∈ blocks, 0 < block) :
    blockDivisiblePresentCountAux k size blocks = 0 ↔
      BlockDivisibleZeroAux k size blocks := by
  induction blocks generalizing size with
  | nil =>
      simp [blockDivisiblePresentCountAux, BlockDivisibleZeroAux]
  | cons block rest ih =>
      have hblockPos : 0 < block := hpos block (by simp)
      have hrestPos : ∀ entry ∈ rest, 0 < entry := by
        intro entry hentry
        exact hpos entry (by simp [hentry])
      rw [blockDivisiblePresentCountAux]
      rw [BlockDivisibleZeroAux]
      rw [Nat.add_eq_zero_iff]
      rw [ih (size := size + 1) hrestPos]
      constructor
      · rintro ⟨hevent, hrest⟩
        refine ⟨?_, hrest⟩
        intro hdivides
        by_contra hnotOne
        have htwo : 2 ≤ block := by omega
        simp [htwo, hdivides] at hevent
      · rintro ⟨hblock, hrest⟩
        refine ⟨?_, hrest⟩
        by_cases hdivides : k ∣ size
        · have hblockOne := hblock hdivides
          simp [hblockOne]
        · simp [hdivides]

theorem blockDivisiblePresentCount_eq_zero_iff
    {n : ℕ} (k : ℕ) (composition : Composition n) :
    blockDivisiblePresentCount k composition.blocks = 0 ↔
      BlockDivisibleZero k composition.blocks := by
  unfold blockDivisiblePresentCount BlockDivisibleZero
  exact blockDivisiblePresentCountAux_eq_zero_iff
    k 1 composition.blocks (by
      intro block hblock
      exact composition.blocks_pos hblock)

abbrev ZeroFOTerminalComposition (k weight : ℕ) :=
  {terminal : TerminalComposition weight //
    BlockDivisibleZero k terminal.1.blocks}

noncomputable instance zeroFOTerminalCompositionFintype
    (k weight : ℕ) :
    Fintype (ZeroFOTerminalComposition k weight) :=
  Fintype.ofFinite _

theorem terminalFO_zero_eq_periodic_card
    (k n : ℕ) :
    TerminalFO 0 k n =
      Fintype.card (ZeroFOTerminalComposition k (n + 1)) := by
  unfold TerminalFO
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun terminal => by
      exact blockDivisiblePresentCount_eq_zero_iff k terminal.1

theorem canonicalFO_zero_eq_periodic_card
    (k n : ℕ) :
    CanonicalFO 0 k n =
      Fintype.card (ZeroFOTerminalComposition k (n + 1)) := by
  rw [canonicalFO_eq_terminalFO]
  exact terminalFO_zero_eq_periodic_card k n

theorem BlockDivisibleZeroAux.getLast?_eq_one_of_dvd
    {k size : ℕ} {blocks : List ℕ}
    (hzero : BlockDivisibleZeroAux k size blocks)
    (hne : blocks ≠ [])
    (hdvd : k ∣ size + blocks.length - 1) :
    blocks.getLast? = some 1 := by
  induction blocks generalizing size with
  | nil => exact (hne rfl).elim
  | cons block rest ih =>
      rcases hzero with ⟨hblock, hrest⟩
      rcases rest with _ | ⟨next, tail⟩
      · have hdividesSize : k ∣ size := by
          simpa using hdvd
        have hblockOne := hblock hdividesSize
        simp [hblockOne]
      · have hdvdTail :
            k ∣ (size + 1) + (next :: tail).length - 1 := by
          convert hdvd using 1 <;> simp <;> omega
        have hlast :=
          ih (size := size + 1) hrest (by simp) hdvdTail
        simpa using hlast

theorem zeroFOTerminal_length_not_dvd
    (k weight : ℕ)
    (terminal : ZeroFOTerminalComposition k weight) :
    ¬k ∣ terminal.1.1.blocks.length := by
  intro hlength
  have hblocksNe :
      terminal.1.1.blocks ≠ [] := by
    intro hnil
    rcases terminal.1.2 with ⟨last, hlast, _⟩
    simpa [hnil] using hlast
  have hlengthPos : 0 < terminal.1.1.blocks.length :=
    List.length_pos_iff_ne_nil.mpr hblocksNe
  have hdvdLast :
      k ∣ 1 + terminal.1.1.blocks.length - 1 := by
    convert hlength using 1 <;> omega
  have hzeroLast :=
    BlockDivisibleZeroAux.getLast?_eq_one_of_dvd
      terminal.2 hblocksNe hdvdLast
  rcases terminal.1.2 with ⟨last, hlast, hlastTwo⟩
  rw [hlast] at hzeroLast
  injection hzeroLast with hlastOne
  omega

theorem zeroFOTerminal_length_decomposition
    (k weight : ℕ) (hk : 1 ≤ k)
    (terminal : ZeroFOTerminalComposition k weight) :
    ∃ groups remainder : ℕ,
      1 ≤ remainder ∧ remainder < k ∧
        terminal.1.1.blocks.length = groups * k + remainder := by
  let length := terminal.1.1.blocks.length
  let groups := length / k
  let remainder := length % k
  have hkPos : 0 < k := by omega
  have hremainderLt : remainder < k := by
    exact Nat.mod_lt length hkPos
  have hremainderNe : remainder ≠ 0 := by
    intro hremainder
    apply zeroFOTerminal_length_not_dvd k weight terminal
    rw [Nat.dvd_iff_mod_eq_zero]
    exact hremainder
  refine ⟨groups, remainder, by omega, hremainderLt, ?_⟩
  change
    terminal.1.1.blocks.length =
      (terminal.1.1.blocks.length / k) * k +
        terminal.1.1.blocks.length % k
  rw [Nat.mul_comm, Nat.add_comm]
  exact (Nat.mod_add_div terminal.1.1.blocks.length k).symm

abbrev DivisibleBlockPosition (k length : ℕ) :=
  {position : Fin length // k ∣ position.1 + 1}

abbrev VariableBlockPosition (k length : ℕ) :=
  {position : Fin length // ¬k ∣ position.1 + 1}

def divisiblePositionFromQuotient
    (k length : ℕ) (hk : 1 ≤ k)
    (quotient : Fin (length / k)) :
    DivisibleBlockPosition k length := by
  have hkPos : 0 < k := by omega
  have hquotientLe : quotient.1 + 1 ≤ length / k := by
    omega
  have honeBasedLe :
      (quotient.1 + 1) * k ≤ length :=
    (Nat.le_div_iff_mul_le hkPos).mp hquotientLe
  have honeBasedPos : 0 < (quotient.1 + 1) * k :=
    Nat.mul_pos (by omega) hkPos
  refine ⟨⟨(quotient.1 + 1) * k - 1, by omega⟩, ?_⟩
  change k ∣ ((quotient.1 + 1) * k - 1) + 1
  refine ⟨quotient.1 + 1, ?_⟩
  calc
    (quotient.1 + 1) * k - 1 + 1 =
        (quotient.1 + 1) * k :=
      Nat.sub_add_cancel (by omega)
    _ = k * (quotient.1 + 1) := Nat.mul_comm _ _

@[simp] theorem divisiblePositionFromQuotient_val
    (k length : ℕ) (hk : 1 ≤ k)
    (quotient : Fin (length / k)) :
    (divisiblePositionFromQuotient k length hk quotient).1.1 =
      (quotient.1 + 1) * k - 1 := rfl

theorem divisiblePositionFromQuotient_injective
    (k length : ℕ) (hk : 1 ≤ k) :
    Function.Injective
      (divisiblePositionFromQuotient k length hk) := by
  intro left right hequal
  have hvalues :
      (left.1 + 1) * k - 1 =
        (right.1 + 1) * k - 1 :=
    by
      simpa using congrArg (fun position => position.1.1) hequal
  have hkPos : 0 < k := by omega
  have hproducts :
      (left.1 + 1) * k = (right.1 + 1) * k := by
    have hleftPos : 0 < (left.1 + 1) * k :=
      Nat.mul_pos (by omega) hkPos
    have hrightPos : 0 < (right.1 + 1) * k :=
      Nat.mul_pos (by omega) hkPos
    omega
  apply Fin.ext
  have hadd :
      left.1 + 1 = right.1 + 1 :=
    Nat.eq_of_mul_eq_mul_right hkPos hproducts
  omega

theorem divisiblePositionFromQuotient_surjective
    (k length : ℕ) (hk : 1 ≤ k) :
    Function.Surjective
      (divisiblePositionFromQuotient k length hk) := by
  intro position
  rcases position.2 with ⟨quotient, hquotient⟩
  have hkPos : 0 < k := by omega
  have hquotientPos : 0 < quotient := by
    by_contra hnotPos
    have hzero : quotient = 0 := Nat.eq_zero_of_not_pos hnotPos
    subst quotient
    simp at hquotient
  have honeBasedLe : position.1.1 + 1 ≤ length := by
    omega
  have hquotientMulLe : quotient * k ≤ length := by
    calc
      quotient * k = k * quotient := Nat.mul_comm _ _
      _ = position.1.1 + 1 := hquotient.symm
      _ ≤ length := honeBasedLe
  have hquotientLe : quotient ≤ length / k :=
    (Nat.le_div_iff_mul_le hkPos).mpr hquotientMulLe
  let quotientIndex : Fin (length / k) :=
    ⟨quotient - 1, by omega⟩
  refine ⟨quotientIndex, ?_⟩
  apply Subtype.ext
  apply Fin.ext
  rw [divisiblePositionFromQuotient_val]
  dsimp [quotientIndex]
  rw [Nat.sub_add_cancel (by omega : 1 ≤ quotient)]
  rw [Nat.mul_comm]
  omega

noncomputable def divisibleBlockPositionEquiv
    (k length : ℕ) (hk : 1 ≤ k) :
    Fin (length / k) ≃ DivisibleBlockPosition k length :=
  Equiv.ofBijective
    (divisiblePositionFromQuotient k length hk)
    ⟨divisiblePositionFromQuotient_injective k length hk,
      divisiblePositionFromQuotient_surjective k length hk⟩

theorem card_divisibleBlockPosition
    (k length : ℕ) (hk : 1 ≤ k) :
    Fintype.card (DivisibleBlockPosition k length) =
      length / k := by
  rw [← Fintype.card_congr (divisibleBlockPositionEquiv k length hk)]
  simp

theorem card_variableBlockPosition
    (k length : ℕ) (hk : 1 ≤ k) :
    Fintype.card (VariableBlockPosition k length) =
      length - length / k := by
  rw [Fintype.card_subtype_compl
    (fun position : Fin length => k ∣ position.1 + 1)]
  rw [card_divisibleBlockPosition k length hk]
  simp

abbrev ZeroFOTerminalFixedLength
    (k weight length : ℕ) :=
  {terminal : ZeroFOTerminalComposition k weight //
    terminal.1.1.blocks.length = length}

@[ext] structure PeriodicTerminalVector
    (k weight length : ℕ) where
  blocks : Fin length → ℕ
  length_pos : 0 < length
  blocks_pos : ∀ index, 0 < blocks index
  blocks_sum : ∑ index, blocks index = weight
  periodic : ∀ index, k ∣ index.1 + 1 → blocks index = 1
  last_two : 2 ≤ blocks ⟨length - 1, by omega⟩

def zeroFOTerminalFixedLengthToVector
    {k weight length : ℕ}
    (terminal : ZeroFOTerminalFixedLength k weight length) :
    PeriodicTerminalVector k weight length := by
  let indexEquiv :
      Fin length ≃ Fin terminal.1.1.1.blocks.length :=
    finCongr terminal.2.symm
  let blocks : Fin length → ℕ :=
    fun index => terminal.1.1.1.blocksFun (indexEquiv index)
  have hblocksNe : terminal.1.1.1.blocks ≠ [] := by
    intro hnil
    rcases terminal.1.1.2 with ⟨last, hlast, _⟩
    simpa [hnil] using hlast
  have hlengthPos : 0 < length := by
    rw [← terminal.2]
    exact List.length_pos_iff_ne_nil.mpr hblocksNe
  refine {
    blocks := blocks
    length_pos := hlengthPos
    blocks_pos := ?_
    blocks_sum := ?_
    periodic := ?_
    last_two := ?_
  }
  · intro index
    exact terminal.1.1.1.one_le_blocksFun (indexEquiv index)
  · calc
      (∑ index, blocks index) =
          ∑ index : Fin terminal.1.1.1.blocks.length,
            terminal.1.1.1.blocksFun index := by
        exact indexEquiv.sum_comp
          (fun index => terminal.1.1.1.blocksFun index)
      _ = weight := terminal.1.1.1.sum_blocksFun
  · intro index hdivides
    have hpointwise :=
      (blockDivisibleZeroAux_iff_getElem
        k 1 terminal.1.1.1.blocks).mp terminal.1.2
    have hindexLt :
        (indexEquiv index).1 < terminal.1.1.1.blocks.length :=
      (indexEquiv index).2
    have hdividesActual :
        k ∣ 1 + (indexEquiv index).1 := by
      simpa [indexEquiv, Nat.add_comm] using hdivides
    simpa [blocks, Composition.blocksFun] using
      hpointwise (indexEquiv index).1 hindexLt hdividesActual
  · rcases terminal.1.1.2 with ⟨last, hlast, hlastTwo⟩
    have hlastValue :
        terminal.1.1.1.blocks[
            terminal.1.1.1.blocks.length - 1] = last := by
      have hlastGet :=
        List.getLast_of_getLast?_eq_some hlast
      simpa [List.getLast_eq_getElem] using hlastGet
    have hcastLast :
        (indexEquiv ⟨length - 1, by omega⟩).1 =
          terminal.1.1.1.blocks.length - 1 := by
      simp [indexEquiv]
      omega
    have hfinLast :
        indexEquiv ⟨length - 1, by omega⟩ =
          ⟨terminal.1.1.1.blocks.length - 1, by omega⟩ :=
      Fin.ext hcastLast
    change 2 ≤ terminal.1.1.1.blocksFun
      (indexEquiv ⟨length - 1, by omega⟩)
    rw [hfinLast, Composition.blocksFun]
    change 2 ≤ terminal.1.1.1.blocks[
      terminal.1.1.1.blocks.length - 1]
    rw [hlastValue]
    exact hlastTwo

def periodicTerminalVectorToZeroFOTerminal
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    ZeroFOTerminalFixedLength k weight length := by
  cases length with
  | zero =>
      exact (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length =>
      let blocks : List ℕ := List.ofFn vector.blocks
      let composition : Composition weight := {
        blocks := blocks
        blocks_pos := by
          rw [List.forall_mem_ofFn_iff]
          exact vector.blocks_pos
        blocks_sum := by
          change (List.ofFn vector.blocks).sum = weight
          rw [List.sum_ofFn]
          exact vector.blocks_sum
      }
      let terminal : TerminalComposition weight :=
        ⟨composition, by
          refine ⟨vector.blocks (Fin.last length), ?_, ?_⟩
          · rw [List.getLast?_eq_getLast_of_ne_nil (by
              simp [composition, blocks])]
            congr 1
            simpa [composition, blocks] using
              (List.getLast_ofFn_succ vector.blocks)
          · have hlastIndex :
                (Fin.last length : Fin (length + 1)) =
                  ⟨length + 1 - 1, by omega⟩ := by
              apply Fin.ext
              simp
            simpa [hlastIndex] using vector.last_two⟩
      let periodicTerminal :
          ZeroFOTerminalComposition k weight :=
        ⟨terminal, by
          unfold BlockDivisibleZero
          rw [blockDivisibleZeroAux_iff_getElem]
          intro index hindex hdivides
          have hperiodic :=
            vector.periodic
              ⟨index, by simpa [terminal, composition, blocks] using hindex⟩
              (by simpa [Nat.add_comm] using hdivides)
          change (List.ofFn vector.blocks)[index] = 1
          rw [List.getElem_ofFn]
          exact hperiodic⟩
      exact ⟨periodicTerminal, by
        simp [periodicTerminal, terminal, composition, blocks]⟩

@[simp] theorem periodicTerminalVectorToZeroFOTerminal_blocks
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    (periodicTerminalVectorToZeroFOTerminal vector).1.1.1.blocks =
      List.ofFn vector.blocks := by
  cases length with
  | zero => exact (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length =>
      rfl

theorem zeroFOTerminalFixedLengthToVector_toTerminal
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    zeroFOTerminalFixedLengthToVector
        (periodicTerminalVectorToZeroFOTerminal vector) =
      vector := by
  apply PeriodicTerminalVector.ext
  funext index
  cases length with
  | zero => exact (Nat.not_lt_zero 0 vector.length_pos).elim
  | succ length =>
      change (List.ofFn vector.blocks)[index.1] =
        vector.blocks index
      rw [List.getElem_ofFn]

theorem periodicTerminalVectorToZeroFOTerminal_toVector
    {k weight length : ℕ}
    (terminal : ZeroFOTerminalFixedLength k weight length) :
    periodicTerminalVectorToZeroFOTerminal
        (zeroFOTerminalFixedLengthToVector terminal) =
      terminal := by
  rcases terminal with ⟨terminal, hlength⟩
  subst length
  apply Subtype.ext
  apply Subtype.ext
  apply Subtype.ext
  apply Composition.ext
  rw [periodicTerminalVectorToZeroFOTerminal_blocks]
  change
    List.ofFn terminal.1.1.blocksFun =
      terminal.1.1.blocks
  exact terminal.1.1.ofFn_blocksFun

noncomputable def zeroFOTerminalFixedLengthEquiv
    (k weight length : ℕ) :
    ZeroFOTerminalFixedLength k weight length ≃
      PeriodicTerminalVector k weight length where
  toFun := zeroFOTerminalFixedLengthToVector
  invFun := periodicTerminalVectorToZeroFOTerminal
  left_inv := periodicTerminalVectorToZeroFOTerminal_toVector
  right_inv := zeroFOTerminalFixedLengthToVector_toTerminal

def lastVariableBlockPosition
    (k length : ℕ) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length) :
    VariableBlockPosition k length :=
  ⟨⟨length - 1, by omega⟩, by
    simpa [Nat.sub_add_cancel (by omega : 1 ≤ length)] using hnotDvd⟩

theorem sum_last_indicator_variableBlockPosition
    (k length : ℕ) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length) :
    (∑ position : VariableBlockPosition k length,
        if position.1.1 + 1 = length then 1 else 0) = 1 := by
  classical
  let last := lastVariableBlockPosition k length hlength hnotDvd
  rw [Fintype.sum_eq_single last]
  · simp [last, lastVariableBlockPosition,
      Nat.sub_add_cancel (by omega : 1 ≤ length)]
  · intro position hpositionNe
    have hnotLast : position.1.1 + 1 ≠ length := by
      intro hequal
      apply hpositionNe
      apply Subtype.ext
      apply Fin.ext
      simp [last, lastVariableBlockPosition]
      omega
    simp [hnotLast]

theorem periodicTerminalVector_sum_divisible
    {k weight length : ℕ} (hk : 1 ≤ k)
    (vector : PeriodicTerminalVector k weight length) :
    (∑ position : DivisibleBlockPosition k length,
        vector.blocks position.1) =
      length / k := by
  calc
    (∑ position : DivisibleBlockPosition k length,
        vector.blocks position.1) =
        ∑ _position : DivisibleBlockPosition k length, 1 := by
      apply Fintype.sum_congr
      intro position
      exact vector.periodic position.1 position.2
    _ = Fintype.card (DivisibleBlockPosition k length) := by
      simp
    _ = length / k := card_divisibleBlockPosition k length hk

theorem periodicTerminalVector_length_not_dvd
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    ¬k ∣ length := by
  intro hdivides
  have hlengthPos := vector.length_pos
  let last : Fin length := ⟨length - 1, by omega⟩
  have hlastIndex : last.1 + 1 = length := by
    dsimp [last]
    exact Nat.sub_add_cancel (by omega)
  have hlastDivides : k ∣ last.1 + 1 := by
    rw [hlastIndex]
    exact hdivides
  have hlastOne := vector.periodic last hlastDivides
  have hlastTwo := vector.last_two
  change 2 ≤ vector.blocks last at hlastTwo
  omega

def periodicTerminalExtras
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length)
    (position : VariableBlockPosition k length) : ℕ :=
  vector.blocks position.1 - 1 -
    (if position.1.1 + 1 = length then 1 else 0)

theorem periodicTerminalExtras_reconstruct
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length)
    (position : VariableBlockPosition k length) :
    vector.blocks position.1 =
      1 + (if position.1.1 + 1 = length then 1 else 0) +
        periodicTerminalExtras vector position := by
  by_cases hlast : position.1.1 + 1 = length
  · have hlengthPos := vector.length_pos
    have hpositionLast :
        position.1 =
          ⟨length - 1, by omega⟩ := by
      apply Fin.ext
      change position.1.1 = length - 1
      omega
    have htwo := vector.last_two
    have hlastIndex : length - 1 + 1 = length :=
      Nat.sub_add_cancel (by omega)
    unfold periodicTerminalExtras
    rw [hpositionLast]
    simp only [if_pos hlastIndex]
    omega
  · have hpos := vector.blocks_pos position.1
    simp [periodicTerminalExtras, hlast]
    omega

theorem periodicTerminalExtras_sum
    {k weight length : ℕ} (hk : 1 ≤ k)
    (vector : PeriodicTerminalVector k weight length) :
    (∑ position : VariableBlockPosition k length,
        periodicTerminalExtras vector position) =
      weight - (length + 1) := by
  have hnotDvd :=
    periodicTerminalVector_length_not_dvd vector
  have hsplit :=
    Fintype.sum_subtype_add_sum_subtype
      (fun position : Fin length => k ∣ position.1 + 1)
      vector.blocks
  have hdivisible :=
    periodicTerminalVector_sum_divisible hk vector
  have hvariableCard :=
    card_variableBlockPosition k length hk
  have hlastIndicator :=
    sum_last_indicator_variableBlockPosition
      k length vector.length_pos hnotDvd
  have hvariable :
      (∑ position : VariableBlockPosition k length,
          vector.blocks position.1) =
        Fintype.card (VariableBlockPosition k length) + 1 +
          ∑ position : VariableBlockPosition k length,
            periodicTerminalExtras vector position := by
    calc
      (∑ position : VariableBlockPosition k length,
          vector.blocks position.1) =
          ∑ position : VariableBlockPosition k length,
            (1 +
              (if position.1.1 + 1 = length then 1 else 0) +
                periodicTerminalExtras vector position) := by
        apply Fintype.sum_congr
        intro position
        exact periodicTerminalExtras_reconstruct vector position
      _ =
          (∑ _position : VariableBlockPosition k length, 1) +
            (∑ position : VariableBlockPosition k length,
              if position.1.1 + 1 = length then 1 else 0) +
              ∑ position : VariableBlockPosition k length,
                periodicTerminalExtras vector position := by
        simp only [Finset.sum_add_distrib]
      _ =
          Fintype.card (VariableBlockPosition k length) + 1 +
            ∑ position : VariableBlockPosition k length,
              periodicTerminalExtras vector position := by
        rw [hlastIndicator]
        simp
  rw [hdivisible, hvariable, vector.blocks_sum] at hsplit
  rw [hvariableCard] at hsplit
  have hquotientLe : length / k ≤ length :=
    Nat.div_le_self length k
  have hweightEq :
      weight =
        length + 1 +
          ∑ position : VariableBlockPosition k length,
            periodicTerminalExtras vector position := by
    omega
  omega

abbrev PeriodicTerminalExtraData
    (k weight length : ℕ) :=
  {extras : VariableBlockPosition k length → ℕ //
    ∑ position, extras position = weight - (length + 1)}

noncomputable instance periodicTerminalExtraDataFintype
    (k weight length : ℕ) :
    Fintype (PeriodicTerminalExtraData k weight length) :=
  Fintype.ofEquiv
    (Sym (VariableBlockPosition k length)
      (weight - (length + 1)))
    (Sym.equivNatSumOfFintype
      (VariableBlockPosition k length)
      (weight - (length + 1)))

theorem List.length_add_one_le_sum_of_pos_of_exists_two
    (blocks : List ℕ)
    (hpos : ∀ block ∈ blocks, 1 ≤ block)
    (htwo : ∃ block ∈ blocks, 2 ≤ block) :
    blocks.length + 1 ≤ blocks.sum := by
  induction blocks with
  | nil => simp at htwo
  | cons block rest ih =>
      rcases htwo with ⟨large, hlargeMem, hlargeTwo⟩
      rcases List.mem_cons.mp hlargeMem with hlargeHead | hlargeRest
      · subst large
        have hrest :
            rest.length ≤ rest.sum :=
          List.length_le_sum_of_one_le rest (by
            intro entry hentry
            exact hpos entry (by simp [hentry]))
        simp only [List.length_cons, List.sum_cons]
        omega
      · have hblockPos : 1 ≤ block :=
          hpos block (by simp)
        have htail :=
          ih (by
            intro entry hentry
            exact hpos entry (by simp [hentry]))
            ⟨large, hlargeRest, hlargeTwo⟩
        simp only [List.length_cons, List.sum_cons]
        omega

theorem periodicTerminalVector_weight_lower
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    length + 1 ≤ weight := by
  let blocks := List.ofFn vector.blocks
  have hpos : ∀ block ∈ blocks, 1 ≤ block := by
    rw [List.forall_mem_ofFn_iff]
    intro index
    exact vector.blocks_pos index
  have hlengthPos := vector.length_pos
  let last : Fin length := ⟨length - 1, by omega⟩
  have hlastMem : vector.blocks last ∈ blocks := by
    simp [blocks]
  have hbound :=
    List.length_add_one_le_sum_of_pos_of_exists_two
      blocks hpos ⟨vector.blocks last, hlastMem, vector.last_two⟩
  simpa [blocks, List.sum_ofFn, vector.blocks_sum] using hbound

def periodicTerminalVectorToExtras
    {k weight length : ℕ} (hk : 1 ≤ k)
    (vector : PeriodicTerminalVector k weight length) :
    PeriodicTerminalExtraData k weight length :=
  ⟨periodicTerminalExtras vector,
    periodicTerminalExtras_sum hk vector⟩

def periodicTerminalExtrasToVector
    {k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight)
    (data : PeriodicTerminalExtraData k weight length) :
    PeriodicTerminalVector k weight length := by
  classical
  let blocks : Fin length → ℕ :=
    fun position =>
      if hdivides : k ∣ position.1 + 1 then 1
      else
        1 + (if position.1 + 1 = length then 1 else 0) +
          data.1 ⟨position, hdivides⟩
  refine {
    blocks := blocks
    length_pos := hlength
    blocks_pos := ?_
    blocks_sum := ?_
    periodic := ?_
    last_two := ?_
  }
  · intro position
    by_cases hdivides : k ∣ position.1 + 1
    · simp [blocks, hdivides]
    · simp [blocks, hdivides]
  · have hsplit :=
      Fintype.sum_subtype_add_sum_subtype
        (fun position : Fin length => k ∣ position.1 + 1)
        blocks
    have hdivisible :
        (∑ position : DivisibleBlockPosition k length,
            blocks position.1) =
          length / k := by
      calc
        (∑ position : DivisibleBlockPosition k length,
            blocks position.1) =
            ∑ _position : DivisibleBlockPosition k length, 1 := by
          apply Fintype.sum_congr
          intro position
          simp [blocks, position.2]
        _ = Fintype.card
              (DivisibleBlockPosition k length) := by simp
        _ = length / k :=
          card_divisibleBlockPosition k length hk
    have hvariable :
        (∑ position : VariableBlockPosition k length,
            blocks position.1) =
          Fintype.card (VariableBlockPosition k length) + 1 +
            ∑ position : VariableBlockPosition k length,
              data.1 position := by
      calc
        (∑ position : VariableBlockPosition k length,
            blocks position.1) =
            ∑ position : VariableBlockPosition k length,
              (1 +
                (if position.1.1 + 1 = length then 1 else 0) +
                  data.1 position) := by
          apply Fintype.sum_congr
          intro position
          simp [blocks, position.2]
        _ =
            (∑ _position : VariableBlockPosition k length, 1) +
              (∑ position : VariableBlockPosition k length,
                if position.1.1 + 1 = length then 1 else 0) +
                ∑ position : VariableBlockPosition k length,
                  data.1 position := by
          simp only [Finset.sum_add_distrib]
        _ =
            Fintype.card (VariableBlockPosition k length) + 1 +
              ∑ position : VariableBlockPosition k length,
                data.1 position := by
          rw [sum_last_indicator_variableBlockPosition
            k length hlength hnotDvd]
          simp
    rw [hdivisible, hvariable] at hsplit
    rw [card_variableBlockPosition k length hk, data.2] at hsplit
    have hquotientLe : length / k ≤ length :=
      Nat.div_le_self length k
    omega
  · intro position hdivides
    simp [blocks, hdivides]
  · let last : Fin length := ⟨length - 1, by omega⟩
    have hlastIndex : last.1 + 1 = length := by
      dsimp [last]
      exact Nat.sub_add_cancel (by omega)
    have hlastNotDivides : ¬k ∣ last.1 + 1 := by
      rw [hlastIndex]
      exact hnotDvd
    change 2 ≤ blocks last
    simp [blocks, hlastIndex, hnotDvd]

theorem periodicTerminalExtrasToVector_toExtras
    {k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight)
    (data : PeriodicTerminalExtraData k weight length) :
    periodicTerminalVectorToExtras hk
        (periodicTerminalExtrasToVector
          hk hlength hnotDvd hweight data) =
      data := by
  apply Subtype.ext
  funext position
  unfold periodicTerminalVectorToExtras periodicTerminalExtras
  simp [periodicTerminalExtrasToVector, position.2]
  omega

theorem periodicTerminalVectorToExtras_toVector
    {k weight length : ℕ}
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight)
    (vector : PeriodicTerminalVector k weight length) :
    periodicTerminalExtrasToVector
        hk hlength hnotDvd hweight
        (periodicTerminalVectorToExtras hk vector) =
      vector := by
  apply PeriodicTerminalVector.ext
  funext position
  by_cases hdivides : k ∣ position.1 + 1
  · simp [periodicTerminalExtrasToVector, hdivides,
      vector.periodic position hdivides]
  · have hreconstruct :=
      periodicTerminalExtras_reconstruct vector
        (⟨position, hdivides⟩ :
          VariableBlockPosition k length)
    simp [periodicTerminalExtrasToVector, hdivides]
    exact hreconstruct.symm

noncomputable def periodicTerminalVectorExtrasEquiv
    (k weight length : ℕ)
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight) :
    PeriodicTerminalVector k weight length ≃
      PeriodicTerminalExtraData k weight length where
  toFun := periodicTerminalVectorToExtras hk
  invFun :=
    periodicTerminalExtrasToVector
      hk hlength hnotDvd hweight
  left_inv :=
    periodicTerminalVectorToExtras_toVector
      hk hlength hnotDvd hweight
  right_inv :=
    periodicTerminalExtrasToVector_toExtras
      hk hlength hnotDvd hweight

def periodicTerminalVectorToBoundedFunction
    {k weight length : ℕ}
    (vector : PeriodicTerminalVector k weight length) :
    Fin length → Fin (weight + 1) :=
  fun position =>
    ⟨vector.blocks position, by
      have hle :
          vector.blocks position ≤
            ∑ index : Fin length, vector.blocks index :=
        Finset.single_le_sum
          (fun index _ => Nat.zero_le (vector.blocks index))
          (Finset.mem_univ position)
      rw [vector.blocks_sum] at hle
      omega⟩

theorem periodicTerminalVectorToBoundedFunction_injective
    (k weight length : ℕ) :
    Function.Injective
      (periodicTerminalVectorToBoundedFunction :
        PeriodicTerminalVector k weight length →
          Fin length → Fin (weight + 1)) := by
  intro left right hequal
  apply PeriodicTerminalVector.ext
  funext position
  exact congrArg Fin.val (congrFun hequal position)

noncomputable instance periodicTerminalVectorFintype
    (k weight length : ℕ) :
    Fintype (PeriodicTerminalVector k weight length) :=
  Fintype.ofInjective
    periodicTerminalVectorToBoundedFunction
    (periodicTerminalVectorToBoundedFunction_injective
      k weight length)

theorem card_periodicTerminalVector
    (k weight length : ℕ)
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight) :
    Fintype.card (PeriodicTerminalVector k weight length) =
      ((length - length / k) +
          (weight - (length + 1)) - 1).choose
        (weight - (length + 1)) := by
  calc
    Fintype.card (PeriodicTerminalVector k weight length) =
        Fintype.card (PeriodicTerminalExtraData k weight length) :=
      Fintype.card_congr
        (periodicTerminalVectorExtrasEquiv
          k weight length hk hlength hnotDvd hweight)
    _ =
        Fintype.card
          (Sym (VariableBlockPosition k length)
            (weight - (length + 1))) :=
      Fintype.card_congr
        (Sym.equivNatSumOfFintype
          (VariableBlockPosition k length)
          (weight - (length + 1))).symm
    _ =
        (Fintype.card (VariableBlockPosition k length) +
          (weight - (length + 1)) - 1).choose
            (weight - (length + 1)) :=
      Sym.card_sym_eq_choose (weight - (length + 1))
    _ =
        ((length - length / k) +
          (weight - (length + 1)) - 1).choose
            (weight - (length + 1)) := by
      rw [card_variableBlockPosition k length hk]

theorem card_zeroFOTerminalFixedLength
    (k weight length : ℕ)
    (hk : 1 ≤ k) (hlength : 0 < length)
    (hnotDvd : ¬k ∣ length)
    (hweight : length + 1 ≤ weight) :
    Fintype.card
        (ZeroFOTerminalFixedLength k weight length) =
      ((length - length / k) +
          (weight - (length + 1)) - 1).choose
        (weight - (length + 1)) := by
  rw [Fintype.card_congr
    (zeroFOTerminalFixedLengthEquiv k weight length)]
  exact card_periodicTerminalVector
    k weight length hk hlength hnotDvd hweight

def zeroFOTerminalLengthSplit
    {k weight : ℕ}
    (terminal : ZeroFOTerminalComposition k weight) :
    Σ length : Fin (weight + 1),
      ZeroFOTerminalFixedLength k weight length.1 := by
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

def zeroFOTerminalLengthJoin
    {k weight : ℕ}
    (split :
      Σ length : Fin (weight + 1),
        ZeroFOTerminalFixedLength k weight length.1) :
    ZeroFOTerminalComposition k weight :=
  split.2.1

theorem zeroFOTerminalLengthJoin_split
    {k weight : ℕ}
    (terminal : ZeroFOTerminalComposition k weight) :
    zeroFOTerminalLengthJoin
        (zeroFOTerminalLengthSplit terminal) =
      terminal := rfl

theorem zeroFOTerminalLengthSplit_join
    {k weight : ℕ}
    (split :
      Σ length : Fin (weight + 1),
        ZeroFOTerminalFixedLength k weight length.1) :
    zeroFOTerminalLengthSplit
        (zeroFOTerminalLengthJoin split) =
      split := by
  rcases split with
    ⟨⟨length, hlengthBound⟩, ⟨terminal, hlength⟩⟩
  change terminal.1.1.blocks.length = length at hlength
  subst length
  rfl

noncomputable def zeroFOTerminalLengthEquiv
    (k weight : ℕ) :
    ZeroFOTerminalComposition k weight ≃
      Σ length : Fin (weight + 1),
        ZeroFOTerminalFixedLength k weight length.1 where
  toFun := zeroFOTerminalLengthSplit
  invFun := zeroFOTerminalLengthJoin
  left_inv := zeroFOTerminalLengthJoin_split
  right_inv := zeroFOTerminalLengthSplit_join

theorem zeroFOTerminal_card_length_sum
    (k weight : ℕ) :
    Fintype.card (ZeroFOTerminalComposition k weight) =
      ∑ length : Fin (weight + 1),
        Fintype.card
          (ZeroFOTerminalFixedLength k weight length.1) := by
  rw [← Fintype.card_sigma]
  exact Fintype.card_congr
    (zeroFOTerminalLengthEquiv k weight)

noncomputable def foZeroFixedLengthCount
    (k weight length : ℕ) : ℕ :=
  if 0 < length ∧ ¬k ∣ length ∧ length + 1 ≤ weight then
    ((length - length / k) +
        (weight - (length + 1)) - 1).choose
      (weight - (length + 1))
  else 0

theorem card_zeroFOTerminalFixedLength_eq_count
    (k weight length : ℕ) (hk : 1 ≤ k) :
    Fintype.card
        (ZeroFOTerminalFixedLength k weight length) =
      foZeroFixedLengthCount k weight length := by
  classical
  by_cases hadmissible :
      0 < length ∧ ¬k ∣ length ∧ length + 1 ≤ weight
  · rw [foZeroFixedLengthCount, if_pos hadmissible]
    exact card_zeroFOTerminalFixedLength
      k weight length hk
        hadmissible.1 hadmissible.2.1 hadmissible.2.2
  · rw [foZeroFixedLengthCount, if_neg hadmissible]
    apply Fintype.card_eq_zero_iff.mpr
    constructor
    intro terminal
    let vector :=
      zeroFOTerminalFixedLengthToVector terminal
    have hlength : 0 < length :=
      vector.length_pos
    have hnotDvd : ¬k ∣ length :=
      periodicTerminalVector_length_not_dvd vector
    have hweight : length + 1 ≤ weight :=
      periodicTerminalVector_weight_lower vector
    exact hadmissible ⟨hlength, hnotDvd, hweight⟩

theorem zeroFOTerminal_card_eq_length_count
    (k weight : ℕ) (hk : 1 ≤ k) :
    Fintype.card (ZeroFOTerminalComposition k weight) =
      ∑ length : Fin (weight + 1),
        foZeroFixedLengthCount k weight length.1 := by
  rw [zeroFOTerminal_card_length_sum]
  apply Fintype.sum_congr
  intro length
  exact card_zeroFOTerminalFixedLength_eq_count
    k weight length.1 hk

theorem canonicalFO_zero_eq_length_count
    (k n : ℕ) (hk : 1 ≤ k) :
    CanonicalFO 0 k n =
      ∑ length : Fin (n + 2),
        foZeroFixedLengthCount k (n + 1) length.1 := by
  rw [canonicalFO_zero_eq_periodic_card]
  exact zeroFOTerminal_card_eq_length_count
    k (n + 1) hk

noncomputable def foZeroLengthSeries
    (k length : ℕ) : PowerSeries ℚ :=
  if 0 < length ∧ ¬k ∣ length then
    PowerSeries.X ^ length *
      (PowerSeries.invOneSubPow ℚ
        (length - length / k)).val
  else 0

theorem coeff_foZeroLengthSeries
    (k length n : ℕ) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (foZeroLengthSeries k length) =
      (foZeroFixedLengthCount k (n + 1) length : ℚ) := by
  classical
  by_cases hbase : 0 < length ∧ ¬k ∣ length
  · rw [foZeroLengthSeries, if_pos hbase]
    have hkTwo : 2 ≤ k := by
      by_contra hnotTwo
      have hkOne : k = 1 := by omega
      subst k
      exact hbase.2 (one_dvd length)
    have hvariablePos :
        0 < length - length / k := by
      have hquotientLt : length / k < length :=
        Nat.div_lt_self hbase.1 (by omega)
      omega
    by_cases hlengthLe : length ≤ n
    · rw [PowerSeries.coeff_X_pow_mul']
      simp only [if_pos hlengthLe]
      rw [PowerSeries.invOneSubPow_val_eq_mk_sub_one_add_choose_of_pos
        ℚ (length - length / k) hvariablePos]
      simp only [PowerSeries.coeff_mk, Nat.cast_inj]
      rw [foZeroFixedLengthCount]
      have hadmissible :
          0 < length ∧ ¬k ∣ length ∧
            length + 1 ≤ n + 1 := by
        omega
      rw [if_pos hadmissible]
      have htop :
          (length - length / k) - 1 + (n - length) =
            (length - length / k) +
              ((n + 1) - (length + 1)) - 1 := by
        omega
      rw [htop]
      have htopAdd :
          (length - length / k) +
                ((n + 1) - (length + 1)) - 1 =
            ((length - length / k) - 1) +
              ((n + 1) - (length + 1)) := by
        omega
      rw [htopAdd]
      exact Nat.choose_symm_add
    · rw [PowerSeries.coeff_X_pow_mul']
      simp only [if_neg hlengthLe]
      simp [foZeroFixedLengthCount, hlengthLe]
  · rw [foZeroLengthSeries, if_neg hbase]
    change 0 =
      (foZeroFixedLengthCount k (n + 1) length : ℚ)
    rw [foZeroFixedLengthCount]
    have hnotAdmissible :
        ¬(0 < length ∧ ¬k ∣ length ∧
          length + 1 ≤ n + 1) := by
      exact fun hadmissible =>
        hbase ⟨hadmissible.1, hadmissible.2.1⟩
    rw [if_neg hnotAdmissible]
    simp

theorem foZeroLengthSeries_base
    (k length : ℕ) (hk : 1 ≤ k)
    (hlength : 0 < length) (hlt : length < k) :
    (1 - PowerSeries.X) ^ (k - 1) *
        foZeroLengthSeries k length =
      PowerSeries.X ^ length *
        (1 - PowerSeries.X) ^ (k - length - 1) := by
  have hnotDvd : ¬k ∣ length := by
    intro hdivides
    exact (not_lt_of_ge
      (Nat.le_of_dvd hlength hdivides)) hlt
  have hquotient : length / k = 0 :=
    Nat.div_eq_of_lt hlt
  rw [foZeroLengthSeries,
    if_pos ⟨hlength, hnotDvd⟩, hquotient]
  have hexponent :
      k - 1 = (k - length - 1) + length := by
    omega
  calc
    (1 - PowerSeries.X) ^ (k - 1) *
          (PowerSeries.X ^ length *
            (PowerSeries.invOneSubPow ℚ length).val) =
        PowerSeries.X ^ length *
          ((1 - PowerSeries.X) ^ (k - 1) *
            (PowerSeries.invOneSubPow ℚ length).val) := by
      ring
    _ =
        PowerSeries.X ^ length *
          ((1 - PowerSeries.X) ^ (k - length - 1) :
            PowerSeries ℚ) := by
      rw [hexponent]
      rw [PowerSeries.one_sub_pow_add_mul_invOneSubPow_val_eq_one_sub_pow
        ℚ (k - length - 1) length]

theorem foZeroLengthSeries_shift
    (k length : ℕ) (hk : 1 ≤ k)
    (hkle : k ≤ length) (hnotDvd : ¬k ∣ length) :
    (1 - PowerSeries.X) ^ (k - 1) *
        foZeroLengthSeries k length =
      PowerSeries.X ^ k *
        foZeroLengthSeries k (length - k) := by
  have hkPos : 0 < k := by omega
  have hlengthPos : 0 < length := by omega
  have hshiftPos : 0 < length - k := by
    by_contra hnotPos
    have hequal : length = k := by omega
    subst length
    exact hnotDvd (dvd_refl k)
  have hshiftNotDvd : ¬k ∣ length - k := by
    intro hdivides
    apply hnotDvd
    rw [← Nat.sub_add_cancel hkle]
    exact dvd_add hdivides (dvd_refl k)
  have hquotientPos : 0 < length / k :=
    Nat.div_pos hkle hkPos
  have hlengthSplit :
      length = (length - k) + k :=
    (Nat.sub_add_cancel hkle).symm
  have hquotientAdd :
      length / k = (length - k) / k + 1 := by
    calc
      length / k = ((length - k) + k) / k := by
        rw [← hlengthSplit]
      _ = (length - k) / k + k / k :=
        Nat.add_div_of_dvd_left (dvd_refl k)
      _ = (length - k) / k + 1 := by
        rw [Nat.div_self hkPos]
  have hquotientShift :
      (length - k) / k = length / k - 1 := by
    omega
  have hvariable :
      length - length / k =
        ((length - k) - (length - k) / k) +
          (k - 1) := by
    rw [hquotientShift]
    have hquotientLe : length / k ≤ length :=
      Nat.div_le_self length k
    have hshiftQuotientLe :
        (length - k) / k ≤ length - k :=
      Nat.div_le_self (length - k) k
    omega
  have hbase :
      0 < length ∧ ¬k ∣ length :=
    ⟨hlengthPos, hnotDvd⟩
  have hshift :
      0 < length - k ∧ ¬k ∣ length - k :=
    ⟨hshiftPos, hshiftNotDvd⟩
  simp only [foZeroLengthSeries, hbase, hshift, if_true]
  calc
    (1 - PowerSeries.X) ^ (k - 1) *
          (PowerSeries.X ^ length *
            (PowerSeries.invOneSubPow ℚ
              (length - length / k)).val) =
        PowerSeries.X ^ length *
          ((1 - PowerSeries.X) ^ (k - 1) *
            (PowerSeries.invOneSubPow ℚ
              (length - length / k)).val) := by
      ring
    _ =
        PowerSeries.X ^ length *
          (PowerSeries.invOneSubPow ℚ
            ((length - k) - (length - k) / k)).val := by
      rw [hvariable]
      rw [PowerSeries.one_sub_pow_mul_invOneSubPow_val_add_eq_invOneSubPow_val
        ℚ ((length - k) - (length - k) / k) (k - 1)]
    _ =
        PowerSeries.X ^ k *
          (PowerSeries.X ^ (length - k) *
            (PowerSeries.invOneSubPow ℚ
              ((length - k) - (length - k) / k)).val) := by
      rw [← mul_assoc, ← pow_add]
      rw [Nat.add_sub_of_le hkle]

noncomputable def foZeroPartialSeries
    (k bound : ℕ) : PowerSeries ℚ :=
  ∑ length ∈ Finset.range (bound + 1),
    foZeroLengthSeries k length

theorem coeff_foZeroPartialSeries_diagonal
    (k n : ℕ) (hk : 1 ≤ k) :
    PowerSeries.coeff n (foZeroPartialSeries k n) =
      (CanonicalFO 0 k n : ℚ) := by
  rw [foZeroPartialSeries, map_sum]
  simp only [map_sum, coeff_foZeroLengthSeries k _ n hk]
  rw [canonicalFO_zero_eq_length_count k n hk,
    Fin.sum_univ_eq_sum_range]
  simp only [Nat.cast_sum]
  have hlast :
      foZeroFixedLengthCount k (n + 1) (n + 1) = 0 := by
    simp [foZeroFixedLengthCount]
  conv_rhs =>
    rw [Finset.sum_range_succ]
  rw [hlast, Nat.cast_zero, add_zero]

theorem foZeroNumerator_coe
    (k : ℕ) :
    (foZeroNumerator k : PowerSeries ℚ) =
      ∑ length ∈ Finset.Icc 1 (k - 1),
        PowerSeries.X ^ length *
          (1 - PowerSeries.X) ^ (k - length - 1) := by
  have hpolynomial :
      Polynomial.map (Int.castRingHom ℚ) (TK k) =
        ∑ length ∈ Finset.Icc 1 (k - 1),
          Polynomial.X ^ length *
            (1 - Polynomial.X) ^ (k - length - 1) := by
    rw [TK, Polynomial.map_sum]
    apply Finset.sum_congr rfl
    intro length _
    simp
  rw [foZeroNumerator, mapIntPolynomialToRat,
    hpolynomial]
  change
    Polynomial.coeToPowerSeries.ringHom
        (∑ length ∈ Finset.Icc 1 (k - 1),
          Polynomial.X ^ length *
            (1 - Polynomial.X) ^ (k - length - 1)) =
      _
  rw [map_sum]
  apply Finset.sum_congr rfl
  intro length _
  simp

theorem foZeroLengthSeries_shift_of_le
    (k length : ℕ) (hk : 1 ≤ k)
    (hkle : k ≤ length) :
    (1 - PowerSeries.X) ^ (k - 1) *
        foZeroLengthSeries k length =
      PowerSeries.X ^ k *
        foZeroLengthSeries k (length - k) := by
  by_cases hnotDvd : ¬k ∣ length
  · exact foZeroLengthSeries_shift
      k length hk hkle hnotDvd
  · have hdivides : k ∣ length :=
      Classical.not_not.mp hnotDvd
    have hshiftDivides : k ∣ length - k := by
      exact Nat.dvd_sub hdivides (dvd_refl k)
    simp [foZeroLengthSeries, hdivides, hshiftDivides]

theorem foZeroDenominator_coe
    (k : ℕ) :
    (foZeroDenominator k : PowerSeries ℚ) =
      (1 - PowerSeries.X) ^ (k - 1) -
        PowerSeries.X ^ k := by
  have hpolynomial :
      Polynomial.map (Int.castRingHom ℚ) (AO k) =
        (1 - Polynomial.X) ^ (k - 1) -
          Polynomial.X ^ k := by
    simp [AO]
  rw [foZeroDenominator, mapIntPolynomialToRat,
    hpolynomial]
  simp

theorem foZero_base_length_sum
    (k : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ (k - 1) *
        (∑ length ∈ Finset.range k,
          foZeroLengthSeries k length) =
      (foZeroNumerator k : PowerSeries ℚ) := by
  rw [Finset.mul_sum]
  have hsubset :
      Finset.Icc 1 (k - 1) ⊆ Finset.range k := by
    intro length hlength
    simp only [Finset.mem_Icc] at hlength
    simp only [Finset.mem_range]
    omega
  rw [foZeroNumerator_coe]
  calc
    (∑ length ∈ Finset.range k,
        (1 - PowerSeries.X) ^ (k - 1) *
          foZeroLengthSeries k length) =
        ∑ length ∈ Finset.Icc 1 (k - 1),
          (1 - PowerSeries.X) ^ (k - 1) *
            foZeroLengthSeries k length := by
      symm
      apply Finset.sum_subset hsubset
      intro length hlengthRange hlengthNotBase
      have hzero : length = 0 := by
        simp only [Finset.mem_range] at hlengthRange
        simp only [Finset.mem_Icc, not_and_or,
          not_le] at hlengthNotBase
        omega
      subst length
      simp [foZeroLengthSeries]
    _ =
        ∑ length ∈ Finset.Icc 1 (k - 1),
          PowerSeries.X ^ length *
            (1 - PowerSeries.X) ^ (k - length - 1) := by
      apply Finset.sum_congr rfl
      intro length hlength
      simp only [Finset.mem_Icc] at hlength
      exact foZeroLengthSeries_base
        k length hk hlength.1 (by omega)

noncomputable def foZeroTailSeries
    (k n : ℕ) : PowerSeries ℚ :=
  ∑ offset ∈ Finset.range k,
    foZeroLengthSeries k (n + 1 + offset)

theorem foZeroPartialSeries_split_base
    (k n : ℕ) :
    foZeroPartialSeries k (n + k) =
      (∑ length ∈ Finset.range k,
        foZeroLengthSeries k length) +
      (∑ offset ∈ Finset.range (n + 1),
        foZeroLengthSeries k (k + offset)) := by
  rw [foZeroPartialSeries]
  have hbound :
      n + k + 1 = k + (n + 1) := by omega
  rw [hbound, Finset.sum_range_add]

theorem foZeroPartialSeries_split_tail
    (k n : ℕ) :
    foZeroPartialSeries k (n + k) =
      foZeroPartialSeries k n +
        foZeroTailSeries k n := by
  simp only [foZeroPartialSeries, foZeroTailSeries]
  have hbound :
      n + k + 1 = (n + 1) + k := by omega
  rw [hbound, Finset.sum_range_add]

theorem foZero_shifted_length_sum
    (k n : ℕ) (hk : 1 ≤ k) :
    (1 - PowerSeries.X) ^ (k - 1) *
        (∑ offset ∈ Finset.range (n + 1),
          foZeroLengthSeries k (k + offset)) =
      PowerSeries.X ^ k *
        foZeroPartialSeries k n := by
  rw [Finset.mul_sum, foZeroPartialSeries,
    Finset.mul_sum]
  apply Finset.sum_congr rfl
  intro offset _
  simpa using
    (foZeroLengthSeries_shift_of_le
      k (k + offset) hk (by omega))

theorem foZero_partial_telescope
    (k n : ℕ) (hk : 1 ≤ k) :
    (foZeroDenominator k : PowerSeries ℚ) *
        foZeroPartialSeries k (n + k) =
      (foZeroNumerator k : PowerSeries ℚ) -
        PowerSeries.X ^ k *
          foZeroTailSeries k n := by
  rw [foZeroDenominator_coe, sub_mul]
  nth_rewrite 1 [foZeroPartialSeries_split_base k n]
  nth_rewrite 1 [foZeroPartialSeries_split_tail k n]
  rw [mul_add,
    foZero_base_length_sum k hk,
    foZero_shifted_length_sum k n hk]
  ring

theorem coeff_foZeroPartialSeries_of_le
    (k bound degree : ℕ) (hk : 1 ≤ k)
    (hdegree : degree ≤ bound) :
    PowerSeries.coeff degree
        (foZeroPartialSeries k bound) =
      (CanonicalFO 0 k degree : ℚ) := by
  rw [foZeroPartialSeries, map_sum]
  simp only [coeff_foZeroLengthSeries k _ degree hk]
  have hsubset :
      Finset.range (degree + 1) ⊆
        Finset.range (bound + 1) := by
    intro length hlength
    simp only [Finset.mem_range] at hlength ⊢
    omega
  calc
    (∑ length ∈ Finset.range (bound + 1),
        (foZeroFixedLengthCount
          k (degree + 1) length : ℚ)) =
        ∑ length ∈ Finset.range (degree + 1),
          (foZeroFixedLengthCount
            k (degree + 1) length : ℚ) := by
      symm
      apply Finset.sum_subset hsubset
      intro length hlengthBound hlengthDegree
      have htooLarge : degree < length := by
        simp only [Finset.mem_range] at hlengthBound
        simp only [Finset.mem_range, not_lt] at hlengthDegree
        omega
      simp [foZeroFixedLengthCount]
      omega
    _ =
        PowerSeries.coeff degree
          (foZeroPartialSeries k degree) := by
      rw [foZeroPartialSeries, map_sum]
      simp only [coeff_foZeroLengthSeries k _ degree hk]
    _ = (CanonicalFO 0 k degree : ℚ) :=
      coeff_foZeroPartialSeries_diagonal k degree hk

theorem coeff_X_pow_mul_foZeroTailSeries
    (k n : ℕ) (hk : 1 ≤ k) :
    PowerSeries.coeff n
        (PowerSeries.X ^ k *
          foZeroTailSeries k n) = 0 := by
  rw [foZeroTailSeries, Finset.mul_sum, map_sum]
  apply Finset.sum_eq_zero
  intro offset hoffset
  rw [PowerSeries.coeff_X_pow_mul']
  by_cases hkLe : k ≤ n
  · rw [if_pos hkLe,
      coeff_foZeroLengthSeries k
        (n + 1 + offset) (n - k) hk]
    simp [foZeroFixedLengthCount]
    omega
  · simp [hkLe]

theorem canonicalFO_zero_recurrence
    (k n : ℕ) (hk : 1 ≤ k) :
    (∑ pair ∈ Finset.antidiagonal n,
        (foZeroDenominator k).coeff pair.1 *
          (CanonicalFO 0 k pair.2 : ℚ)) =
      (foZeroNumerator k).coeff n := by
  have htelescope :=
    congrArg (PowerSeries.coeff n)
      (foZero_partial_telescope k n hk)
  simp only [map_sub,
    coeff_X_pow_mul_foZeroTailSeries k n hk,
    sub_zero] at htelescope
  rw [PowerSeries.coeff_mul] at htelescope
  have hconvolution :
      (∑ pair ∈ Finset.antidiagonal n,
          PowerSeries.coeff pair.1
              (foZeroDenominator k : PowerSeries ℚ) *
            PowerSeries.coeff pair.2
              (foZeroPartialSeries k (n + k))) =
        ∑ pair ∈ Finset.antidiagonal n,
          (foZeroDenominator k).coeff pair.1 *
            (CanonicalFO 0 k pair.2 : ℚ) := by
    apply Finset.sum_congr rfl
    intro pair hpair
    rw [Polynomial.coeff_coe]
    rw [coeff_foZeroPartialSeries_of_le
      k (n + k) pair.2 hk]
    have hpairsum :=
      Finset.mem_antidiagonal.mp hpair
    omega
  rw [hconvolution] at htelescope
  simpa only [Polynomial.coeff_coe] using htelescope

theorem canonicalFO_zero_series
    (k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (CanonicalFO 0 k n : ℚ)) =
      rationalSeries
        (foZeroNumerator k) (foZeroDenominator k) := by
  rw [canonicalFO_zero_series_iff_recurrence k hk]
  exact fun n => canonicalFO_zero_recurrence k n hk

theorem canonicalFO_zero_asymptotic
    (k : ℕ) (hk : 2 ≤ k) :
    (fun n => (CanonicalFO 0 k n : ℝ)) ~[atTop]
      coefficientModel
        (foZeroLeadingConstant k hk) 0
        (aoRoot k hk) :=
  canonicalFO_zero_asymptotic_of_series k hk
    (canonicalFO_zero_series k (by omega))

end FixedPerimeter
