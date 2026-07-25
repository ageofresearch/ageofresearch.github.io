import FixedPerimeter.MultiplicityBijection
import Mathlib.Combinatorics.Enumerative.Composition
import Mathlib.Data.Fintype.OfMap

/-!
# Finite fixed-weight fibers

Canonical multiplicity lists of weight `N` embed into Mathlib's finite type of
compositions of `N` by adding one to every multiplicity.  This supplies the
finite type needed to turn the injective statistic-preserving map into an
equivalence and hence an equality of cardinalities.
-/

set_option autoImplicit false

namespace FixedPerimeter

theorem sum_map_succ (values : List ℕ) :
    (values.map Nat.succ).sum = values.length + values.sum := by
  induction values with
  | nil => simp
  | cons value values ih =>
      simp [ih]
      omega

@[ext] structure MultiplicityFiber (weight : ℕ) where
  values : List ℕ
  canonical : IsCanonicalMultiplicities values
  weight_eq : multiplicityWeight values = weight
  deriving DecidableEq

namespace MultiplicityFiber

def toComposition {weight : ℕ} (fiber : MultiplicityFiber weight) :
    Composition weight where
  blocks := fiber.values.map Nat.succ
  blocks_pos := by
    intro block hblock
    simp only [List.mem_map] at hblock
    obtain ⟨value, _, rfl⟩ := hblock
    exact Nat.zero_lt_succ value
  blocks_sum := by
    rw [sum_map_succ]
    exact fiber.weight_eq

theorem toComposition_injective (weight : ℕ) :
    Function.Injective
      (toComposition : MultiplicityFiber weight → Composition weight) := by
  intro left right hequal
  apply MultiplicityFiber.ext
  have hblocks := congrArg Composition.blocks hequal
  exact (List.map_injective_iff.mpr Nat.succ_injective) hblocks

noncomputable instance fintype (weight : ℕ) :
    Fintype (MultiplicityFiber weight) :=
  Fintype.ofInjective toComposition (toComposition_injective weight)

def phi {weight : ℕ} (fiber : MultiplicityFiber weight) :
    MultiplicityFiber weight where
  values := multiplicityPhi fiber.values
  canonical := multiplicityPhi_canonical fiber.canonical
  weight_eq := (multiplicityPhi_weight fiber.canonical).trans fiber.weight_eq

theorem phi_injective (weight : ℕ) :
    Function.Injective (phi : MultiplicityFiber weight → MultiplicityFiber weight) := by
  intro left right hequal
  apply MultiplicityFiber.ext
  apply multiplicityPhi_injective_on_canonical left.canonical right.canonical
  exact congrArg MultiplicityFiber.values hequal

noncomputable def phiEquiv (weight : ℕ) :
    MultiplicityFiber weight ≃ MultiplicityFiber weight :=
  Equiv.ofBijective phi
    ⟨phi_injective weight,
      Finite.surjective_of_injective (phi_injective weight)⟩

@[simp] theorem phiEquiv_apply {weight : ℕ}
    (fiber : MultiplicityFiber weight) :
    phiEquiv weight fiber = phi fiber := rfl

end MultiplicityFiber

noncomputable def FiberFD (j weight : ℕ) : ℕ :=
  Fintype.card {fiber : MultiplicityFiber weight //
    repeatedSizeCount fiber.values = j}

noncomputable def FiberFO (j weight : ℕ) : ℕ :=
  Fintype.card {fiber : MultiplicityFiber weight //
    evenPresentMultiplicityCount fiber.values = j}

/-- General canonical fixed-perimeter `FD` count. -/
noncomputable def CanonicalFD (j k n : ℕ) : ℕ :=
  Fintype.card {fiber : MultiplicityFiber (n + 1) //
    frequentMultiplicityCount k fiber.values = j}

/-- General canonical fixed-perimeter `FO` count. -/
noncomputable def CanonicalFO (j k n : ℕ) : ℕ :=
  Fintype.card {fiber : MultiplicityFiber (n + 1) //
    divisiblePresentSizeCount k fiber.values = j}

theorem fiber_eq_two (j weight : ℕ) :
    FiberFD j weight = FiberFO j weight := by
  let restricted :
      {fiber : MultiplicityFiber weight //
        repeatedSizeCount fiber.values = j} ≃
      {fiber : MultiplicityFiber weight //
        evenPresentMultiplicityCount fiber.values = j} :=
    (MultiplicityFiber.phiEquiv weight).subtypeEquiv (by
      intro fiber
      change repeatedSizeCount fiber.values = j ↔
        evenPresentMultiplicityCount (multiplicityPhi fiber.values) = j
      rw [multiplicityPhi_preserves_statistic])
  unfold FiberFD FiberFO
  exact Fintype.card_congr restricted

/-- Exact `k = 2` equality at fixed perimeter `n` in the canonical
multiplicity-list model.  The fiber weight is `n + 1` because perimeter is
largest part plus number of parts minus one. -/
theorem fixedPerimeter_eq_two_canonical (j n : ℕ) :
    FiberFD j (n + 1) = FiberFO j (n + 1) :=
  fiber_eq_two j (n + 1)

theorem canonicalFD_two (j n : ℕ) :
    CanonicalFD j 2 n = FiberFD j (n + 1) := rfl

theorem canonicalFO_two (j n : ℕ) :
    CanonicalFO j 2 n = FiberFO j (n + 1) := by
  unfold CanonicalFO FiberFO
  exact Fintype.card_congr <|
    Equiv.subtypeEquivRight fun fiber => by
      rw [divisiblePresentSizeCount_two]

/-- Exact equality for the general canonical count definitions at `k = 2`. -/
theorem canonical_fixedPerimeter_eq_two (j n : ℕ) :
    CanonicalFD j 2 n = CanonicalFO j 2 n := by
  rw [canonicalFD_two, canonicalFO_two]
  exact fixedPerimeter_eq_two_canonical j n

end FixedPerimeter
