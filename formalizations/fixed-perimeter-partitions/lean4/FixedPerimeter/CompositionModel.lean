import FixedPerimeter.Fiber

/-!
# Canonical fibers as terminal compositions

Adding one to each multiplicity turns a fixed-perimeter multiplicity list into
a composition of `n+1`.  Canonicality says exactly that the final composition
block is at least two.  This equivalence is the finite combinatorial model used
for the generating-function recurrences.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- Compositions whose final block is at least two. -/
abbrev TerminalComposition (weight : ℕ) :=
  {composition : Composition weight //
    ∃ last,
      composition.blocks.getLast? = some last ∧
        2 ≤ last}

namespace MultiplicityFiber

def toTerminalComposition {weight : ℕ}
    (fiber : MultiplicityFiber weight) :
    TerminalComposition weight := by
  refine ⟨fiber.toComposition, ?_⟩
  rcases (isCanonical_iff_getLast?_ne_zero fiber.values).mp
      fiber.canonical with
    ⟨last, hlast, hlastNe⟩
  refine ⟨last + 1, ?_, by omega⟩
  simp only [toComposition, List.getLast?_map, hlast, Option.map_some]

def ofTerminalComposition {weight : ℕ}
    (terminal : TerminalComposition weight) :
    MultiplicityFiber weight where
  values := terminal.1.blocks.map Nat.pred
  canonical := by
    rw [isCanonical_iff_getLast?_ne_zero]
    rcases terminal.2 with ⟨last, hlast, hlastTwo⟩
    have hpredNe : Nat.pred last ≠ 0 := by
      cases last with
      | zero => omega
      | succ last =>
          simp only [Nat.pred_succ]
          omega
    refine ⟨Nat.pred last, ?_, hpredNe⟩
    simp only [List.getLast?_map, hlast, Option.map_some]
  weight_eq := by
    have hmap :
        (terminal.1.blocks.map Nat.pred).map Nat.succ =
          terminal.1.blocks := by
      rw [List.map_map]
      calc
        List.map (Nat.succ ∘ Nat.pred) terminal.1.blocks =
            List.map id terminal.1.blocks := by
          apply List.map_congr_left
          intro block hblock
          have hpos := terminal.1.blocks_pos hblock
          change Nat.succ (Nat.pred block) = block
          exact Nat.succ_pred_eq_of_pos hpos
        _ = terminal.1.blocks := by simp
    calc
      multiplicityWeight (terminal.1.blocks.map Nat.pred) =
          ((terminal.1.blocks.map Nat.pred).map Nat.succ).sum := by
        simpa [multiplicityWeight] using
          (sum_map_succ (terminal.1.blocks.map Nat.pred)).symm
      _ = terminal.1.blocks.sum := by rw [hmap]
      _ = weight := terminal.1.blocks_sum

theorem ofTerminalComposition_toTerminalComposition
    {weight : ℕ} (fiber : MultiplicityFiber weight) :
    ofTerminalComposition (toTerminalComposition fiber) = fiber := by
  apply MultiplicityFiber.ext
  simp only [ofTerminalComposition, toTerminalComposition,
    MultiplicityFiber.toComposition, List.map_map]
  calc
    List.map (Nat.pred ∘ Nat.succ) fiber.values =
        List.map id fiber.values := by
      apply List.map_congr_left
      intro multiplicity _
      simp
    _ = fiber.values := by simp

theorem toTerminalComposition_ofTerminalComposition
    {weight : ℕ} (terminal : TerminalComposition weight) :
    toTerminalComposition (ofTerminalComposition terminal) = terminal := by
  apply Subtype.ext
  apply Composition.ext
  simp only [toTerminalComposition, ofTerminalComposition,
    MultiplicityFiber.toComposition]
  rw [List.map_map]
  calc
    List.map (Nat.succ ∘ Nat.pred) terminal.1.blocks =
        List.map id terminal.1.blocks := by
      apply List.map_congr_left
      intro block hblock
      have hpos := terminal.1.blocks_pos hblock
      change Nat.succ (Nat.pred block) = block
      exact Nat.succ_pred_eq_of_pos hpos
    _ = terminal.1.blocks := by simp

noncomputable def terminalCompositionEquiv (weight : ℕ) :
    MultiplicityFiber weight ≃ TerminalComposition weight where
  toFun := toTerminalComposition
  invFun := ofTerminalComposition
  left_inv := ofTerminalComposition_toTerminalComposition
  right_inv := toTerminalComposition_ofTerminalComposition

end MultiplicityFiber

/-- Composition-block form of the frequent-multiplicity statistic. -/
def blockFrequentCount (k : ℕ) (blocks : List ℕ) : ℕ :=
  blocks.countP fun block => k + 1 ≤ block

theorem blockFrequentCount_map_succ (k : ℕ) (values : List ℕ) :
    blockFrequentCount k (values.map Nat.succ) =
      frequentMultiplicityCount k values := by
  unfold blockFrequentCount frequentMultiplicityCount
  induction values with
  | nil => rfl
  | cons value values ih =>
      simp only [List.map_cons, List.countP_cons, ih]
      have hthreshold :
          (k + 1 ≤ Nat.succ value) ↔ (k ≤ value) := by omega
      simp only [hthreshold]

/-- Composition-block form of the divisible-present statistic. -/
def blockDivisiblePresentCountAux
    (k size : ℕ) : List ℕ → ℕ
  | [] => 0
  | block :: rest =>
      (if 2 ≤ block ∧ k ∣ size then 1 else 0) +
        blockDivisiblePresentCountAux k (size + 1) rest

def blockDivisiblePresentCount (k : ℕ) (blocks : List ℕ) : ℕ :=
  blockDivisiblePresentCountAux k 1 blocks

theorem blockDivisiblePresentCountAux_map_succ
    (k size : ℕ) (values : List ℕ) :
    blockDivisiblePresentCountAux k size (values.map Nat.succ) =
      divisiblePresentSizeCountAux k size values := by
  induction values generalizing size with
  | nil =>
      simp [blockDivisiblePresentCountAux,
        divisiblePresentSizeCountAux]
  | cons value values ih =>
      simp only [List.map_cons, blockDivisiblePresentCountAux,
        divisiblePresentSizeCountAux, ih]
      by_cases hvalue : value = 0
      · subst value
        simp
      · have htwo : 2 ≤ Nat.succ value := by omega
        simp [hvalue, htwo]

theorem blockDivisiblePresentCount_map_succ
    (k : ℕ) (values : List ℕ) :
    blockDivisiblePresentCount k (values.map Nat.succ) =
      divisiblePresentSizeCount k values :=
  blockDivisiblePresentCountAux_map_succ k 1 values

noncomputable def TerminalFD (j k n : ℕ) : ℕ :=
  Fintype.card {terminal : TerminalComposition (n + 1) //
    blockFrequentCount k terminal.1.blocks = j}

noncomputable def TerminalFO (j k n : ℕ) : ℕ :=
  Fintype.card {terminal : TerminalComposition (n + 1) //
    blockDivisiblePresentCount k terminal.1.blocks = j}

theorem canonicalFD_eq_terminalFD (j k n : ℕ) :
    CanonicalFD j k n = TerminalFD j k n := by
  unfold CanonicalFD TerminalFD
  exact Fintype.card_congr <|
    (MultiplicityFiber.terminalCompositionEquiv (n + 1)).subtypeEquiv
      (by
        intro fiber
        change frequentMultiplicityCount k fiber.values = j ↔
          blockFrequentCount k
            (fiber.values.map Nat.succ) = j
        rw [blockFrequentCount_map_succ])

theorem canonicalFO_eq_terminalFO (j k n : ℕ) :
    CanonicalFO j k n = TerminalFO j k n := by
  unfold CanonicalFO TerminalFO
  exact Fintype.card_congr <|
    (MultiplicityFiber.terminalCompositionEquiv (n + 1)).subtypeEquiv
      (by
        intro fiber
        change divisiblePresentSizeCount k fiber.values = j ↔
          blockDivisiblePresentCount k
            (fiber.values.map Nat.succ) = j
        rw [blockDivisiblePresentCount_map_succ])

end FixedPerimeter
