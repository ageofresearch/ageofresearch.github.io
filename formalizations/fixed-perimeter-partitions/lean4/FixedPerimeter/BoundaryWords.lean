import FixedPerimeter.Basic
import Mathlib.Data.Fintype.BigOperators
import Mathlib.Data.List.TakeWhile

/-!
# Boundary-word model

A nonempty partition of perimeter `n ≥ 1` is encoded by a `0/1` word of
length `n + 1` whose first bit is `0` and whose last bit is `1`.  Reading from
left to right, each `0` introduces the next possible part size and the following
run of `1`s records its multiplicity.

The `n - 1` interior bits are free, so this model also makes the classical
cardinality `2^(n-1)` transparent.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- The unconstrained interior of a boundary word for perimeter `n`. -/
abbrev InteriorWord (n : ℕ) := Fin (n - 1) → Bool

/-- Add the forced initial `0` and final `1`. -/
def fullBits (n : ℕ) (w : InteriorWord n) : List Bool :=
  false :: List.ofFn w ++ [true]

/-- Parse a boundary word after its first `0`.

`current` is the number of `1`s seen since the last `0`.
-/
def multiplicitiesAux : List Bool → ℕ → List ℕ
  | [], current => [current]
  | false :: bits, current => current :: multiplicitiesAux bits 0
  | true :: bits, current => multiplicitiesAux bits (current + 1)

/-- Multiplicities of successive positive part sizes in a boundary word. -/
def boundaryMultiplicities : List Bool → List ℕ
  | [] => []
  | _ :: bits => multiplicitiesAux bits 0

theorem multiplicitiesAux_sum (bits : List Bool) (current : ℕ) :
    (multiplicitiesAux bits current).sum =
      current + bits.count true := by
  induction bits generalizing current with
  | nil => simp [multiplicitiesAux]
  | cons bit bits ih =>
      cases bit
      · simp [multiplicitiesAux, ih]
      · simp [multiplicitiesAux, ih]
        omega

theorem multiplicitiesAux_length (bits : List Bool) (current : ℕ) :
    (multiplicitiesAux bits current).length =
      bits.count false + 1 := by
  induction bits generalizing current with
  | nil => simp [multiplicitiesAux]
  | cons bit bits ih =>
      cases bit <;> simp [multiplicitiesAux, ih]

theorem bool_count_false_add_true (bits : List Bool) :
    bits.count false + bits.count true = bits.length := by
  induction bits with
  | nil => simp
  | cons bit bits ih =>
      cases bit <;> simp at ih ⊢ <;> omega

theorem fullBits_multiplicities_sum (n : ℕ) (w : InteriorWord n) :
    (boundaryMultiplicities (fullBits n w)).sum =
      (fullBits n w).count true := by
  simp [boundaryMultiplicities, fullBits, multiplicitiesAux_sum]

theorem fullBits_multiplicities_length (n : ℕ) (w : InteriorWord n) :
    (boundaryMultiplicities (fullBits n w)).length =
      (fullBits n w).count false := by
  simp [boundaryMultiplicities, fullBits, multiplicitiesAux_length]

/-- The decoded largest part plus number of parts equals `n + 1`, exactly the
fixed-perimeter equation before subtracting one. -/
theorem fullBits_decodes_perimeter (n : ℕ) (w : InteriorWord n) (hn : 0 < n) :
    (boundaryMultiplicities (fullBits n w)).length +
      (boundaryMultiplicities (fullBits n w)).sum = n + 1 := by
  rw [fullBits_multiplicities_length, fullBits_multiplicities_sum,
    bool_count_false_add_true]
  simp [fullBits]
  omega

/-- Number of distinct present part sizes divisible by `k`. -/
def boundaryDivisiblePresentCount (k : ℕ) (bits : List Bool) : ℕ :=
  (boundaryMultiplicities bits).zipIdx.countP fun pair =>
    pair.1 ≠ 0 ∧ k ∣ pair.2 + 1

/-- Number of distinct part sizes having multiplicity at least `k`. -/
def boundaryFrequentSizeCount (k : ℕ) (bits : List Bool) : ℕ :=
  (boundaryMultiplicities bits).countP fun multiplicity =>
    k ≤ multiplicity

/-- Boundary-word version of `FO`.  There is no nonempty partition of
perimeter `0`. -/
def BoundaryFO (j k n : ℕ) : ℕ :=
  if n = 0 then 0
  else
    ((Finset.univ : Finset (InteriorWord n)).filter fun w =>
      boundaryDivisiblePresentCount k (fullBits n w) = j).card

/-- Boundary-word version of `FD`. -/
def BoundaryFD (j k n : ℕ) : ℕ :=
  if n = 0 then 0
  else
    ((Finset.univ : Finset (InteriorWord n)).filter fun w =>
      boundaryFrequentSizeCount k (fullBits n w) = j).card

@[simp] theorem fullBits_length (n : ℕ) (w : InteriorWord n) (hn : 0 < n) :
    (fullBits n w).length = n + 1 := by
  simp [fullBits]
  omega

@[simp] theorem fullBits_head? (n : ℕ) (w : InteriorWord n) :
    (fullBits n w).head? = some false := by
  simp [fullBits]

@[simp] theorem fullBits_getLast? (n : ℕ) (w : InteriorWord n) :
    (fullBits n w).getLast? = some true := by
  simpa only [fullBits] using
    (List.getLast?_concat (l := false :: List.ofFn w) (a := true))

/-- Recursive word transformation of Lin--Xiong--Yan, Theorem 11.

The fuel makes the decreasing recursive calls explicit.  On a valid boundary
word, starting with fuel equal to its length is sufficient.
-/
def boundaryPhiAux : ℕ → List Bool → List Bool
  | 0, bits => bits
  | _ + 1, [] => []
  | _ + 1, [false, true] => [false, true]
  | fuel + 1, false :: false :: bits =>
      match boundaryPhiAux fuel (false :: bits) with
      | [] => []
      | _ :: transformed => false :: true :: transformed
  | fuel + 1, false :: true :: bits =>
      let leading := bits.takeWhile (· = true)
      let suffix := bits.dropWhile (· = true)
      false :: false :: (leading ++ boundaryPhiAux fuel suffix)
  | _ + 1, bits => bits

def boundaryPhi (bits : List Bool) : List Bool :=
  boundaryPhiAux bits.length bits

theorem boundaryPhiAux_length (fuel : ℕ) (bits : List Bool)
    (hfuel : bits.length ≤ fuel) :
    (boundaryPhiAux fuel bits).length = bits.length := by
  induction fuel generalizing bits with
  | zero =>
      have hnil : bits = [] :=
        List.eq_nil_of_length_eq_zero (Nat.eq_zero_of_le_zero hfuel)
      subst bits
      rfl
  | succ fuel ih =>
      cases bits with
      | nil => rfl
      | cons first rest =>
          cases rest with
          | nil =>
              cases first <;> rfl
          | cons second tail =>
              cases first <;> cases second
              ·
                have hshort : (false :: tail).length ≤ fuel := by
                  simpa using hfuel
                have hlength := ih (false :: tail) hshort
                simp only [boundaryPhiAux]
                generalize hresult :
                  boundaryPhiAux fuel (false :: tail) = result at hlength ⊢
                cases result with
                | nil => simp at hlength
                | cons head transformed =>
                    simp at hlength ⊢
                    omega
              ·
                cases tail with
                | nil => rfl
                | cons third tail =>
                    let remaining := third :: tail
                    let predicate : Bool → Bool := (· = true)
                    have hremaining : remaining.length ≤ fuel := by
                      dsimp [remaining]
                      simp at hfuel ⊢
                      omega
                    have hsuffix :
                        (remaining.dropWhile predicate).length ≤ fuel :=
                      (List.length_dropWhile_le predicate remaining).trans hremaining
                    have hrec :=
                      ih (remaining.dropWhile predicate) hsuffix
                    have hsplit := congrArg List.length
                      (List.takeWhile_append_dropWhile
                        (l := remaining) (p := predicate))
                    simp only [List.length_append] at hsplit
                    dsimp [remaining, predicate] at hrec hsplit
                    simp only [boundaryPhiAux, List.length_cons,
                      List.length_append]
                    rw [hrec]
                    omega
              · rfl
              · rfl

@[simp] theorem boundaryPhi_length (bits : List Bool) :
    (boundaryPhi bits).length = bits.length := by
  exact boundaryPhiAux_length bits.length bits le_rfl

/-- Explicit recursive inverse from Lin--Xiong--Yan, Theorem 11. -/
def boundaryPhiInvAux : ℕ → List Bool → List Bool
  | 0, bits => bits
  | _ + 1, [] => []
  | _ + 1, [false, true] => [false, true]
  | fuel + 1, false :: true :: bits =>
      match boundaryPhiInvAux fuel (false :: bits) with
      | [] => []
      | _ :: transformed => false :: false :: transformed
  | fuel + 1, false :: false :: bits =>
      let leading := bits.takeWhile (· = true)
      let suffix := bits.dropWhile (· = true)
      false :: true :: (leading ++ boundaryPhiInvAux fuel suffix)
  | _ + 1, bits => bits

def boundaryPhiInv (bits : List Bool) : List Bool :=
  boundaryPhiInvAux bits.length bits

theorem boundaryPhiInvAux_length (fuel : ℕ) (bits : List Bool)
    (hfuel : bits.length ≤ fuel) :
    (boundaryPhiInvAux fuel bits).length = bits.length := by
  induction fuel generalizing bits with
  | zero =>
      have hnil : bits = [] :=
        List.eq_nil_of_length_eq_zero (Nat.eq_zero_of_le_zero hfuel)
      subst bits
      rfl
  | succ fuel ih =>
      cases bits with
      | nil => rfl
      | cons first rest =>
          cases rest with
          | nil =>
              cases first <;> rfl
          | cons second tail =>
              cases first <;> cases second
              ·
                cases tail with
                | nil => cases fuel <;> rfl
                | cons third tail =>
                    let remaining := third :: tail
                    let predicate : Bool → Bool := (· = true)
                    have hremaining : remaining.length ≤ fuel := by
                      dsimp [remaining]
                      simp at hfuel ⊢
                      omega
                    have hsuffix :
                        (remaining.dropWhile predicate).length ≤ fuel :=
                      (List.length_dropWhile_le predicate remaining).trans hremaining
                    have hrec :=
                      ih (remaining.dropWhile predicate) hsuffix
                    have hsplit := congrArg List.length
                      (List.takeWhile_append_dropWhile
                        (l := remaining) (p := predicate))
                    simp only [List.length_append] at hsplit
                    dsimp [remaining, predicate] at hrec hsplit
                    simp only [boundaryPhiInvAux, List.length_cons,
                      List.length_append]
                    rw [hrec]
                    omega
              ·
                cases tail with
                | nil => rfl
                | cons third tail =>
                    have hshort :
                        (false :: third :: tail).length ≤ fuel := by
                      simpa using hfuel
                    have hlength := ih (false :: third :: tail) hshort
                    simp only [boundaryPhiInvAux]
                    generalize hresult :
                      boundaryPhiInvAux fuel (false :: third :: tail) =
                        result at hlength ⊢
                    cases result with
                    | nil => simp at hlength
                    | cons head transformed =>
                        simp at hlength ⊢
                        omega
              · rfl
              · rfl

@[simp] theorem boundaryPhiInv_length (bits : List Bool) :
    (boundaryPhiInv bits).length = bits.length := by
  exact boundaryPhiInvAux_length bits.length bits le_rfl

/-- Exhaustive diagnostic for the claimed inverse on perimeter `n`. -/
def boundaryPhiInverseCheck (n : ℕ) : Bool :=
  decide (∀ w : InteriorWord n,
    boundaryPhiInv (boundaryPhi (fullBits n w)) = fullBits n w)

/-- Exhaustive diagnostic for the distinct-size statistics at `k = 2`. -/
def boundaryPhiStatisticCheck (n : ℕ) : Bool :=
  decide (∀ w : InteriorWord n,
    boundaryFrequentSizeCount 2 (fullBits n w) =
      boundaryDivisiblePresentCount 2 (boundaryPhi (fullBits n w)))

theorem interiorWord_card (n : ℕ) :
    Fintype.card (InteriorWord n) = 2 ^ (n - 1) := by
  rw [Fintype.card_fun, Fintype.card_fin, Fintype.card_bool]

end FixedPerimeter
