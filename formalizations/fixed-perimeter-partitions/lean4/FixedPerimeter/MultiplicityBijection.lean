import FixedPerimeter.BoundaryWords

/-!
# The `k = 2` bijection on multiplicity lists

The boundary-word bijection becomes especially transparent after decoding a
word into the multiplicities `m₁, m₂, ...` of successive part sizes.

* A leading zero is removed recursively, then the first output multiplicity is
  incremented.
* A positive leading multiplicity `m + 1` becomes the pair `0, m`, after which
  recursion continues.

The exceptional one-part partition `[1]` is fixed.  The two inserted positions
shift every recursive part size by two, so parity is unchanged.  Meanwhile
`m + 1 ≥ 2` exactly when the new even part size has positive multiplicity.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- Increment the first multiplicity, leaving the empty list empty. -/
def incrementHead : List ℕ → List ℕ
  | [] => []
  | multiplicity :: rest => (multiplicity + 1) :: rest

/-- Lin--Xiong--Yan's recursive map expressed on multiplicities. -/
def multiplicityPhi : List ℕ → List ℕ
  | [] => []
  | [1] => [1]
  | 0 :: rest => incrementHead (multiplicityPhi rest)
  | (multiplicity + 1) :: rest =>
      0 :: multiplicity :: multiplicityPhi rest

/-- Count present sizes of alternating parity.  `countNow = false` at size `1`
and toggles at every successive size. -/
def presentAtParity : Bool → List ℕ → ℕ
  | _, [] => 0
  | countNow, multiplicity :: rest =>
      (if countNow ∧ multiplicity ≠ 0 then 1 else 0) +
        presentAtParity (!countNow) rest

/-- Number of distinct even part sizes that are present. -/
def evenPresentMultiplicityCount (multiplicities : List ℕ) : ℕ :=
  presentAtParity false multiplicities

/-- Number of distinct sizes repeated at least twice. -/
def repeatedSizeCount (multiplicities : List ℕ) : ℕ :=
  multiplicities.countP fun multiplicity => 2 ≤ multiplicity

/-- Count present part sizes divisible by `k`, starting at part size `size`. -/
def divisiblePresentSizeCountAux (k size : ℕ) : List ℕ → ℕ
  | [] => 0
  | multiplicity :: rest =>
      (if multiplicity ≠ 0 ∧ k ∣ size then 1 else 0) +
        divisiblePresentSizeCountAux k (size + 1) rest

/-- Number of distinct present part sizes divisible by `k`. -/
def divisiblePresentSizeCount (k : ℕ) (multiplicities : List ℕ) : ℕ :=
  divisiblePresentSizeCountAux k 1 multiplicities

/-- Number of distinct part sizes occurring at least `k` times. -/
def frequentMultiplicityCount (k : ℕ) (multiplicities : List ℕ) : ℕ :=
  multiplicities.countP fun multiplicity => k ≤ multiplicity

theorem divisiblePresentSizeCountAux_add_period
    (k size : ℕ) (multiplicities : List ℕ) :
    divisiblePresentSizeCountAux k (size + k) multiplicities =
      divisiblePresentSizeCountAux k size multiplicities := by
  induction multiplicities generalizing size with
  | nil => rfl
  | cons multiplicity rest ih =>
      have hdiv : (k ∣ size + k) ↔ k ∣ size := by
        exact (Nat.dvd_add_iff_left (m := size) (dvd_refl k)).symm
      have hindex : size + k + 1 = (size + 1) + k := by omega
      simp only [divisiblePresentSizeCountAux]
      simp only [hdiv]
      rw [hindex, ih]

theorem divisiblePresentSizeCountAux_two_parity (multiplicities : List ℕ) :
    divisiblePresentSizeCountAux 2 1 multiplicities =
        presentAtParity false multiplicities ∧
      divisiblePresentSizeCountAux 2 2 multiplicities =
        presentAtParity true multiplicities := by
  induction multiplicities with
  | nil => simp [divisiblePresentSizeCountAux, presentAtParity]
  | cons multiplicity rest ih =>
      rcases ih with ⟨ihOdd, ihEven⟩
      constructor
      · simp [divisiblePresentSizeCountAux, presentAtParity, ihEven]
      ·
        have hperiod :
            divisiblePresentSizeCountAux 2 3 rest =
              divisiblePresentSizeCountAux 2 1 rest := by
          simpa using
            (divisiblePresentSizeCountAux_add_period 2 1 rest)
        simp [divisiblePresentSizeCountAux, presentAtParity,
          hperiod, ihOdd]

theorem divisiblePresentSizeCount_two (multiplicities : List ℕ) :
    divisiblePresentSizeCount 2 multiplicities =
      evenPresentMultiplicityCount multiplicities :=
  (divisiblePresentSizeCountAux_two_parity multiplicities).1

@[simp] theorem frequentMultiplicityCount_two (multiplicities : List ℕ) :
    frequentMultiplicityCount 2 multiplicities =
      repeatedSizeCount multiplicities := rfl

/-- Canonical multiplicity lists are nonempty and have positive final entry;
internal zero multiplicities are allowed. -/
def IsCanonicalMultiplicities : List ℕ → Prop
  | [] => False
  | [multiplicity] => multiplicity ≠ 0
  | _ :: second :: rest =>
      IsCanonicalMultiplicities (second :: rest)

def canonicalMultiplicitiesDecidable :
    (multiplicities : List ℕ) →
      Decidable (IsCanonicalMultiplicities multiplicities)
  | [] => isFalse id
  | [multiplicity] =>
      if hzero : multiplicity = 0 then
        isFalse (by simpa [IsCanonicalMultiplicities] using hzero)
      else
        isTrue (by simpa [IsCanonicalMultiplicities] using hzero)
  | _ :: second :: rest =>
      canonicalMultiplicitiesDecidable (second :: rest)

instance decidableCanonicalMultiplicities (multiplicities : List ℕ) :
    Decidable (IsCanonicalMultiplicities multiplicities) :=
  canonicalMultiplicitiesDecidable multiplicities

theorem isCanonical_iff_getLast?_ne_zero (multiplicities : List ℕ) :
    IsCanonicalMultiplicities multiplicities ↔
      ∃ last, multiplicities.getLast? = some last ∧ last ≠ 0 := by
  induction multiplicities with
  | nil =>
      simp [IsCanonicalMultiplicities]
  | cons head rest ih =>
      cases rest with
      | nil =>
          simp [IsCanonicalMultiplicities]
      | cons second rest =>
          simpa [IsCanonicalMultiplicities] using ih

/-- `length + sum` is largest part plus number of parts. -/
def multiplicityWeight (multiplicities : List ℕ) : ℕ :=
  multiplicities.length + multiplicities.sum

/-- Explicit inverse transformation.  Its recursive measure is `length + sum`;
the positive-head case reduces the leading multiplicity by one. -/
def multiplicityPsi : List ℕ → List ℕ
  | [] => []
  | [1] => [1]
  | 0 :: second :: rest =>
      (second + 1) :: multiplicityPsi rest
  | (multiplicity + 1) :: rest =>
      0 :: multiplicityPsi (multiplicity :: rest)
  | [0] => [0]
termination_by multiplicities => multiplicityWeight multiplicities
decreasing_by
  all_goals simp [multiplicityWeight]
  all_goals omega

theorem canonical_cons {multiplicities : List ℕ}
    (head : ℕ) (hcanonical : IsCanonicalMultiplicities multiplicities) :
    IsCanonicalMultiplicities (head :: multiplicities) := by
  cases multiplicities with
  | nil => contradiction
  | cons second rest =>
      cases rest <;> simpa [IsCanonicalMultiplicities] using hcanonical

theorem canonical_incrementHead {multiplicities : List ℕ}
    (hcanonical : IsCanonicalMultiplicities multiplicities) :
    IsCanonicalMultiplicities (incrementHead multiplicities) := by
  cases multiplicities with
  | nil => contradiction
  | cons head rest =>
      cases rest with
      | nil =>
          simp [incrementHead, IsCanonicalMultiplicities]
      | cons second rest =>
          simpa [incrementHead, IsCanonicalMultiplicities] using hcanonical

theorem multiplicityPsi_incrementHead {multiplicities : List ℕ}
    (hcanonical : IsCanonicalMultiplicities multiplicities) :
    multiplicityPsi (incrementHead multiplicities) =
      0 :: multiplicityPsi multiplicities := by
  cases multiplicities with
  | nil => contradiction
  | cons head rest =>
      cases rest with
      | nil =>
          cases head with
          | zero => simp [IsCanonicalMultiplicities] at hcanonical
          | succ head =>
              simp [incrementHead, multiplicityPsi]
      | cons second rest =>
          simp [incrementHead, multiplicityPsi]

theorem multiplicityWeight_incrementHead {multiplicities : List ℕ}
    (hnonempty : multiplicities ≠ []) :
    multiplicityWeight (incrementHead multiplicities) =
      multiplicityWeight multiplicities + 1 := by
  cases multiplicities with
  | nil => contradiction
  | cons head rest =>
      simp [incrementHead, multiplicityWeight]
      omega

@[simp] theorem presentAtParity_incrementHead_false (multiplicities : List ℕ) :
    presentAtParity false (incrementHead multiplicities) =
      presentAtParity false multiplicities := by
  cases multiplicities <;> simp [incrementHead, presentAtParity]

/-- Core statistic-preservation identity behind exact equality for `k = 2`. -/
theorem multiplicityPhi_preserves_statistic (multiplicities : List ℕ) :
    repeatedSizeCount multiplicities =
      evenPresentMultiplicityCount (multiplicityPhi multiplicities) := by
  induction multiplicities with
  | nil => simp [repeatedSizeCount, evenPresentMultiplicityCount,
      multiplicityPhi, presentAtParity]
  | cons multiplicity rest ih =>
      cases multiplicity with
      | zero =>
          change repeatedSizeCount rest =
            presentAtParity false (incrementHead (multiplicityPhi rest))
          rw [presentAtParity_incrementHead_false]
          exact ih
      | succ multiplicity =>
          cases rest with
          | nil =>
              cases multiplicity with
              | zero =>
                  simp [repeatedSizeCount, evenPresentMultiplicityCount,
                    multiplicityPhi, presentAtParity]
              | succ multiplicity =>
                  simp [repeatedSizeCount, evenPresentMultiplicityCount,
                    multiplicityPhi, presentAtParity]
          | cons next rest =>
              simp only [repeatedSizeCount, List.countP_cons,
                multiplicityPhi, evenPresentMultiplicityCount,
                presentAtParity, Bool.false_eq_true, Bool.not_false,
                Bool.not_true]
              simp only [false_and, true_and, if_false]
              have ih' :
                  (next :: rest).countP (fun value => 2 ≤ value) =
                    presentAtParity false
                      (multiplicityPhi (next :: rest)) :=
                ih
              rw [← ih']
              by_cases hm : multiplicity = 0
              · simp [hm, List.countP_cons, Nat.add_comm]
              · have hpositive : 1 ≤ multiplicity :=
                  Nat.one_le_iff_ne_zero.mpr hm
                have htwo : 2 ≤ multiplicity + 1 := by omega
                simp [hm, htwo, List.countP_cons, Nat.add_comm]

theorem multiplicityPhi_canonical {multiplicities : List ℕ}
    (hcanonical : IsCanonicalMultiplicities multiplicities) :
    IsCanonicalMultiplicities (multiplicityPhi multiplicities) := by
  induction multiplicities with
  | nil => contradiction
  | cons multiplicity rest ih =>
      cases multiplicity with
      | zero =>
          cases rest with
          | nil => simp [IsCanonicalMultiplicities] at hcanonical
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              exact canonical_incrementHead (ih htail)
      | succ multiplicity =>
          cases rest with
          | nil =>
              cases multiplicity with
              | zero => simp [multiplicityPhi, IsCanonicalMultiplicities]
              | succ multiplicity =>
                  simp [multiplicityPhi, IsCanonicalMultiplicities]
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              simpa [multiplicityPhi] using
                (canonical_cons 0 (canonical_cons multiplicity (ih htail)))

theorem multiplicityPhi_weight {multiplicities : List ℕ}
    (hcanonical : IsCanonicalMultiplicities multiplicities) :
    multiplicityWeight (multiplicityPhi multiplicities) =
      multiplicityWeight multiplicities := by
  induction multiplicities with
  | nil => contradiction
  | cons multiplicity rest ih =>
      cases multiplicity with
      | zero =>
          cases rest with
          | nil => simp [IsCanonicalMultiplicities] at hcanonical
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              rw [multiplicityPhi, multiplicityWeight_incrementHead
                (by
                  have := multiplicityPhi_canonical htail
                  intro hempty
                  rw [hempty] at this
                  exact this)]
              rw [ih htail]
              simp [multiplicityWeight]
              omega
      | succ multiplicity =>
          cases rest with
          | nil =>
              cases multiplicity with
              | zero => simp [multiplicityPhi, multiplicityWeight]
              | succ multiplicity =>
                  simp [multiplicityPhi, multiplicityWeight]
                  omega
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              simp only [multiplicityPhi]
              calc
                multiplicityWeight
                    (0 :: multiplicity ::
                      multiplicityPhi (second :: rest)) =
                    multiplicityWeight (multiplicityPhi (second :: rest)) +
                      multiplicity + 2 := by
                        simp [multiplicityWeight]
                        omega
                _ = multiplicityWeight (second :: rest) +
                      multiplicity + 2 := by rw [ih htail]
                _ = multiplicityWeight
                      ((multiplicity + 1) :: second :: rest) := by
                        simp [multiplicityWeight]
                        omega

theorem multiplicityPsi_leftInverse {multiplicities : List ℕ}
    (hcanonical : IsCanonicalMultiplicities multiplicities) :
    multiplicityPsi (multiplicityPhi multiplicities) = multiplicities := by
  induction multiplicities with
  | nil => contradiction
  | cons multiplicity rest ih =>
      cases multiplicity with
      | zero =>
          cases rest with
          | nil => simp [IsCanonicalMultiplicities] at hcanonical
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              rw [multiplicityPhi,
                multiplicityPsi_incrementHead
                  (multiplicityPhi_canonical htail),
                ih htail]
      | succ multiplicity =>
          cases rest with
          | nil =>
              cases multiplicity with
              | zero => simp [multiplicityPhi, multiplicityPsi]
              | succ multiplicity =>
                  simp [multiplicityPhi, multiplicityPsi]
          | cons second rest =>
              have htail : IsCanonicalMultiplicities (second :: rest) := by
                simpa [IsCanonicalMultiplicities] using hcanonical
              simp only [multiplicityPhi, multiplicityPsi]
              rw [ih htail]

theorem multiplicityPhi_injective_on_canonical
    {left right : List ℕ}
    (hleft : IsCanonicalMultiplicities left)
    (hright : IsCanonicalMultiplicities right)
    (hequal : multiplicityPhi left = multiplicityPhi right) :
    left = right := by
  calc
    left = multiplicityPsi (multiplicityPhi left) :=
      (multiplicityPsi_leftInverse hleft).symm
    _ = multiplicityPsi (multiplicityPhi right) := by rw [hequal]
    _ = right := multiplicityPsi_leftInverse hright

end FixedPerimeter
