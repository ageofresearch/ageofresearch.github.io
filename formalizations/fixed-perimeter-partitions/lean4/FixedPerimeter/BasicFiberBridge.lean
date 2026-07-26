import FixedPerimeter.Basic
import FixedPerimeter.Fiber
import FixedPerimeter.TrimTrailingZeros
import Mathlib.Combinatorics.Enumerative.Composition
import Mathlib.Data.List.OfFn

/-!
# From bounded multiplicities to canonical lists

This begins the semantic bridge from the executable `FO`/`FD` definitions to
the finite canonical fibers used by the generating-function development.
-/

set_option autoImplicit false

namespace FixedPerimeter

def boundedMultiplicityList {n : ℕ} (multiplicity : Multiplicity n) :
    List ℕ :=
  List.ofFn fun index => (multiplicity index : ℕ)

def canonicalMultiplicityValues {n : ℕ}
    (multiplicity : Multiplicity n) : List ℕ :=
  trimTrailingZeros (boundedMultiplicityList multiplicity)

theorem sum_boundedMultiplicityList {n : ℕ}
    (multiplicity : Multiplicity n) :
    (boundedMultiplicityList multiplicity).sum =
      numberOfParts multiplicity := by
  simp [boundedMultiplicityList, numberOfParts, List.sum_ofFn]

theorem sum_canonicalMultiplicityValues {n : ℕ}
    (multiplicity : Multiplicity n) :
    (canonicalMultiplicityValues multiplicity).sum =
      numberOfParts multiplicity := by
  rw [canonicalMultiplicityValues, sum_trimTrailingZeros,
    sum_boundedMultiplicityList]

theorem length_canonicalMultiplicityValues_le {n : ℕ}
    (multiplicity : Multiplicity n) :
    (canonicalMultiplicityValues multiplicity).length ≤ n := by
  calc
    (canonicalMultiplicityValues multiplicity).length ≤
        (boundedMultiplicityList multiplicity).length :=
      length_trimTrailingZeros_le _
    _ = n := by simp [boundedMultiplicityList]

theorem canonicalMultiplicityValues_ne_nil {n : ℕ}
    {multiplicity : Multiplicity n}
    (hPartition : IsPartition multiplicity) :
    canonicalMultiplicityValues multiplicity ≠ [] := by
  rcases hPartition with ⟨index, hindex⟩
  have hvalue : (multiplicity index : ℕ) ≠ 0 := by
    exact_mod_cast (mem_support_iff.mp hindex)
  have hinBounded :
      (multiplicity index : ℕ) ∈
        boundedMultiplicityList multiplicity := by
    rw [boundedMultiplicityList, List.mem_ofFn']
    exact ⟨index, rfl⟩
  have hinCanonical :
      (multiplicity index : ℕ) ∈
        canonicalMultiplicityValues multiplicity := by
    rw [canonicalMultiplicityValues,
      mem_trimTrailingZeros_iff_of_ne_zero hvalue]
    exact hinBounded
  intro hempty
  rw [hempty] at hinCanonical
  simp at hinCanonical

theorem canonical_canonicalMultiplicityValues {n : ℕ}
    {multiplicity : Multiplicity n}
    (hPartition : IsPartition multiplicity) :
    IsCanonicalMultiplicities
      (canonicalMultiplicityValues multiplicity) := by
  rcases trimTrailingZeros_nil_or_canonical
      (boundedMultiplicityList multiplicity) with hempty | hcanonical
  · exact False.elim
      (canonicalMultiplicityValues_ne_nil hPartition
        (by simpa [canonicalMultiplicityValues] using hempty))
  · simpa [canonicalMultiplicityValues] using hcanonical

theorem length_canonicalMultiplicityValues_eq_largestPart
    {n : ℕ} {multiplicity : Multiplicity n}
    (hPartition : IsPartition multiplicity) :
    (canonicalMultiplicityValues multiplicity).length =
      largestPart multiplicity := by
  let values := canonicalMultiplicityValues multiplicity
  have hvaluesNe : values ≠ [] :=
    canonicalMultiplicityValues_ne_nil hPartition
  have hvaluesPos : 0 < values.length :=
    List.length_pos_iff.mpr hvaluesNe
  have hvaluesLength :
      values.length ≤ n :=
    length_canonicalMultiplicityValues_le multiplicity
  change values.length = largestPart multiplicity
  apply le_antisymm
  · have hcanonical :=
      canonical_canonicalMultiplicityValues hPartition
    rcases (isCanonical_iff_getLast?_ne_zero values).mp hcanonical with
      ⟨last, hlast, hlastNe⟩
    have hlastGet :
        values[values.length - 1]? = some last := by
      rw [← List.getLast?_eq_getElem?]
      exact hlast
    rcases exists_eq_trimTrailingZeros_append_replicate_zero
        (boundedMultiplicityList multiplicity) with
      ⟨count, hdecomposition⟩
    have htrimValues :
        trimTrailingZeros (boundedMultiplicityList multiplicity) =
          values := rfl
    have hboundedGet :
        (boundedMultiplicityList multiplicity)[values.length - 1]? =
          some last := by
      rw [hdecomposition]
      rw [htrimValues]
      rw [List.getElem?_append_left (by omega)]
      exact hlastGet
    let index : Fin n :=
      ⟨values.length - 1, by omega⟩
    have hindexValue : (multiplicity index : ℕ) = last := by
      rw [List.getElem?_eq_some_iff] at hboundedGet
      rcases hboundedGet with ⟨hindex, hget⟩
      simpa [boundedMultiplicityList, index] using hget
    have hindexSupport : index ∈ support multiplicity := by
      rw [mem_support_iff]
      exact_mod_cast (hindexValue ▸ hlastNe)
    have hle :
        index.val + 1 ≤ largestPart multiplicity :=
      Finset.le_sup (f := fun i : Fin n => i.val + 1)
        hindexSupport
    have hindexSucc : index.val + 1 = values.length := by
      simp only [index]
      omega
    rw [hindexSucc] at hle
    exact hle
  · apply Finset.sup_le
    intro index hindexSupport
    by_contra hnot
    have hlengthLe : values.length ≤ index.val := by omega
    have hzero :=
      getElem_eq_zero_of_trimTrailingZeros_length_le
        (boundedMultiplicityList multiplicity) index.val
        (by simp [boundedMultiplicityList])
        (by simpa [values, canonicalMultiplicityValues] using hlengthLe)
    have hvalueZero : (multiplicity index : ℕ) = 0 := by
      simpa [boundedMultiplicityList] using hzero
    have hvalueNe : multiplicity index ≠ 0 :=
      mem_support_iff.mp hindexSupport
    exact hvalueNe (by exact_mod_cast hvalueZero)

/-- A bounded fixed-perimeter partition, converted to its canonical finite
multiplicity fiber. -/
def fixedPerimeterPartitionToFiber {n : ℕ}
    (partition :
      {multiplicity : Multiplicity n //
        multiplicity ∈ fixedPerimeterPartitions n}) :
    MultiplicityFiber (n + 1) where
  values := canonicalMultiplicityValues partition.1
  canonical := by
    exact canonical_canonicalMultiplicityValues
      (mem_fixedPerimeterPartitions_iff.mp partition.2).1
  weight_eq := by
    have hpartition :=
      mem_fixedPerimeterPartitions_iff.mp partition.2
    calc
      multiplicityWeight
          (canonicalMultiplicityValues partition.1) =
        largestPart partition.1 + numberOfParts partition.1 := by
          rw [multiplicityWeight,
            length_canonicalMultiplicityValues_eq_largestPart
              hpartition.1,
            sum_canonicalMultiplicityValues]
      _ = perimeter partition.1 + 1 :=
        (perimeter_eq_add_sub_one hpartition.1).symm
      _ = n + 1 := by rw [hpartition.2]

theorem fixedPerimeterPartitionToFiber_injective (n : ℕ) :
    Function.Injective
      (fixedPerimeterPartitionToFiber :
        {multiplicity : Multiplicity n //
          multiplicity ∈ fixedPerimeterPartitions n} →
        MultiplicityFiber (n + 1)) := by
  intro left right hequal
  have hvalues :=
    congrArg MultiplicityFiber.values hequal
  change canonicalMultiplicityValues left.1 =
    canonicalMultiplicityValues right.1 at hvalues
  have hlists :
      boundedMultiplicityList left.1 =
        boundedMultiplicityList right.1 := by
    apply trimTrailingZeros_injective_of_length_eq
    · simp [boundedMultiplicityList]
    · exact hvalues
  have hfunctions :
      (fun index => (left.1 index : ℕ)) =
        (fun index => (right.1 index : ℕ)) := by
    apply List.ofFn_injective
    simpa [boundedMultiplicityList] using hlists
  apply Subtype.ext
  funext index
  apply Fin.ext
  exact congrFun hfunctions index

theorem list_getD_le_sum (values : List ℕ) (index : ℕ) :
    values.getD index 0 ≤ values.sum := by
  by_cases hindex : index < values.length
  · rw [List.getD, List.getElem?_eq_getElem hindex]
    simp only [Option.getD_some]
    exact List.le_sum_of_mem (List.get_mem values ⟨index, hindex⟩)
  · have hnone : values[index]? = none := by
      exact List.getElem?_eq_none (by omega)
    rw [List.getD, hnone]
    simp

theorem multiplicityFiber_values_length_pos {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    0 < fiber.values.length := by
  rcases (isCanonical_iff_getLast?_ne_zero fiber.values).mp
      fiber.canonical with
    ⟨last, hlast, _⟩
  apply List.length_pos_iff.mpr
  intro hempty
  rw [hempty] at hlast
  simp at hlast

theorem multiplicityFiber_values_sum_le {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    fiber.values.sum ≤ n := by
  have hlength := multiplicityFiber_values_length_pos fiber
  have hweight := fiber.weight_eq
  unfold multiplicityWeight at hweight
  omega

/-- Zero-pad a canonical fiber back to the executable ambient multiplicity
vector. -/
def multiplicityFiberToMultiplicity {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    Multiplicity n :=
  fun index =>
    ⟨fiber.values.getD index.val 0,
      lt_of_le_of_lt
        (list_getD_le_sum fiber.values index.val)
        (Nat.lt_succ_of_le
          (multiplicityFiber_values_sum_le fiber))⟩

theorem multiplicityFiber_values_sum_pos {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    0 < fiber.values.sum := by
  rcases (isCanonical_iff_getLast?_ne_zero fiber.values).mp
      fiber.canonical with
    ⟨last, hlast, hlastNe⟩
  have hvaluesNe : fiber.values ≠ [] := by
    intro hempty
    rw [hempty] at hlast
    simp at hlast
  have hlastMem : last ∈ fiber.values := by
    have hmem := List.getLast_mem hvaluesNe
    rw [List.getLast_of_getLast?_eq_some hlast] at hmem
    exact hmem
  by_contra hnot
  have hsumZero : fiber.values.sum = 0 := by omega
  rw [List.sum_eq_zero_iff] at hsumZero
  exact hlastNe (hsumZero last hlastMem)

theorem multiplicityFiber_values_length_le {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    fiber.values.length ≤ n := by
  have hsum := multiplicityFiber_values_sum_pos fiber
  have hweight := fiber.weight_eq
  unfold multiplicityWeight at hweight
  omega

theorem boundedMultiplicityList_fiberToMultiplicity {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    boundedMultiplicityList (multiplicityFiberToMultiplicity fiber) =
      fiber.values ++
        List.replicate (n - fiber.values.length) 0 := by
  apply List.ext_getElem
  · simp [boundedMultiplicityList,
      multiplicityFiber_values_length_le fiber]
  · intro index hleft hright
    by_cases hindex : index < fiber.values.length
    · rw [List.getElem_append_left hindex]
      simp [boundedMultiplicityList, multiplicityFiberToMultiplicity,
        List.getD, List.getElem?_eq_getElem hindex]
    · have hlengthLe : fiber.values.length ≤ index := by omega
      rw [List.getElem_append_right hlengthLe]
      rw [List.getElem_replicate]
      have hnone : fiber.values[index]? = none :=
        List.getElem?_eq_none hlengthLe
      simp [boundedMultiplicityList, multiplicityFiberToMultiplicity,
        List.getD, hnone]

theorem canonicalMultiplicityValues_fiberToMultiplicity {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    canonicalMultiplicityValues
        (multiplicityFiberToMultiplicity fiber) =
      fiber.values := by
  rw [canonicalMultiplicityValues,
    boundedMultiplicityList_fiberToMultiplicity,
    trimTrailingZeros_append_replicate_zero,
    trimTrailingZeros_eq_self_of_canonical fiber.canonical]

theorem isPartition_fiberToMultiplicity {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    IsPartition (multiplicityFiberToMultiplicity fiber) := by
  rcases (isCanonical_iff_getLast?_ne_zero fiber.values).mp
      fiber.canonical with
    ⟨last, hlast, hlastNe⟩
  have hvaluesNe : fiber.values ≠ [] := by
    intro hempty
    rw [hempty] at hlast
    simp at hlast
  have hlastMem : last ∈ fiber.values := by
    have hmem := List.getLast_mem hvaluesNe
    rw [List.getLast_of_getLast?_eq_some hlast] at hmem
    exact hmem
  have hboundedMem :
      last ∈ boundedMultiplicityList
        (multiplicityFiberToMultiplicity fiber) := by
    rw [boundedMultiplicityList_fiberToMultiplicity]
    exact List.mem_append_left _ hlastMem
  rw [boundedMultiplicityList, List.mem_ofFn'] at hboundedMem
  rcases hboundedMem with ⟨index, hindex⟩
  refine ⟨index, ?_⟩
  rw [mem_support_iff]
  intro hzero
  have hnatZero :
      ((multiplicityFiberToMultiplicity fiber index : Fin (n + 1)) :
        ℕ) = 0 := by rw [hzero]; rfl
  have : last = 0 := by
    rw [← hindex]
    exact hnatZero
  exact hlastNe this

theorem perimeter_fiberToMultiplicity {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    perimeter (multiplicityFiberToMultiplicity fiber) = n := by
  have hpartition := isPartition_fiberToMultiplicity fiber
  have hperimeter :=
    perimeter_eq_add_sub_one hpartition
  have hlength :=
    length_canonicalMultiplicityValues_eq_largestPart hpartition
  have hsum :=
    sum_canonicalMultiplicityValues
      (multiplicityFiberToMultiplicity fiber)
  have hcanonical :=
    canonicalMultiplicityValues_fiberToMultiplicity fiber
  have hweight := fiber.weight_eq
  unfold multiplicityWeight at hweight
  rw [← hlength, ← hsum, hcanonical] at hperimeter
  omega

/-- A canonical fiber, zero-padded back into the executable fixed-perimeter
partition subtype. -/
def multiplicityFiberToFixedPerimeterPartition {n : ℕ}
    (fiber : MultiplicityFiber (n + 1)) :
    {multiplicity : Multiplicity n //
      multiplicity ∈ fixedPerimeterPartitions n} :=
  ⟨multiplicityFiberToMultiplicity fiber,
    mem_fixedPerimeterPartitions_iff.mpr
      ⟨isPartition_fiberToMultiplicity fiber,
        perimeter_fiberToMultiplicity fiber⟩⟩

theorem fixedPerimeterPartitionToFiber_fiberToPartition
    {n : ℕ} (fiber : MultiplicityFiber (n + 1)) :
    fixedPerimeterPartitionToFiber
        (multiplicityFiberToFixedPerimeterPartition fiber) =
      fiber := by
  apply MultiplicityFiber.ext
  exact canonicalMultiplicityValues_fiberToMultiplicity fiber

theorem multiplicityFiberToPartition_partitionToFiber
    {n : ℕ}
    (partition :
      {multiplicity : Multiplicity n //
        multiplicity ∈ fixedPerimeterPartitions n}) :
    multiplicityFiberToFixedPerimeterPartition
        (fixedPerimeterPartitionToFiber partition) =
      partition := by
  apply fixedPerimeterPartitionToFiber_injective n
  rw [fixedPerimeterPartitionToFiber_fiberToPartition]

noncomputable def fixedPerimeterPartitionFiberEquiv (n : ℕ) :
    {multiplicity : Multiplicity n //
      multiplicity ∈ fixedPerimeterPartitions n} ≃
      MultiplicityFiber (n + 1) where
  toFun := fixedPerimeterPartitionToFiber
  invFun := multiplicityFiberToFixedPerimeterPartition
  left_inv := multiplicityFiberToPartition_partitionToFiber
  right_inv := fixedPerimeterPartitionToFiber_fiberToPartition

theorem countP_ofFn_eq_card_filter {n : ℕ}
    (predicate : ℕ → Bool) (values : Fin n → ℕ) :
    (List.ofFn values).countP predicate =
      (Finset.univ.filter fun index =>
        predicate (values index) = true).card := by
  induction n with
  | zero => simp
  | succ n ih =>
      rw [List.ofFn_succ, Finset.card_filter, Fin.sum_univ_succ]
      simp only [List.countP_cons]
      rw [ih (fun index => values index.succ)]
      rw [Finset.card_filter]
      omega

theorem countP_trimTrailingZeros
    (predicate : ℕ → Bool)
    (hzero : predicate 0 = false)
    (values : List ℕ) :
    (trimTrailingZeros values).countP predicate =
      values.countP predicate := by
  rcases exists_eq_trimTrailingZeros_append_replicate_zero values with
    ⟨count, hvalues⟩
  have hcount :=
    congrArg (fun entries => entries.countP predicate) hvalues
  rw [List.countP_append, List.countP_replicate, hzero] at hcount
  simpa using hcount.symm

theorem divisiblePresentSizeCountAux_append_replicate_zero
    (k size : ℕ) (values : List ℕ) (count : ℕ) :
    divisiblePresentSizeCountAux k size
        (values ++ List.replicate count 0) =
      divisiblePresentSizeCountAux k size values := by
  induction values generalizing size with
  | nil =>
      induction count generalizing size with
      | zero => rfl
      | succ count ih =>
          simp only [List.nil_append, List.replicate_succ,
            divisiblePresentSizeCountAux]
          simp only [ne_eq, not_true_eq_false, false_and, if_false,
            zero_add]
          exact ih (size + 1)
  | cons value values ih =>
      simp only [List.cons_append, divisiblePresentSizeCountAux]
      rw [ih]

theorem frequentMultiplicityCount_canonicalMultiplicityValues
    {n k : ℕ} (hk : 1 ≤ k) (multiplicity : Multiplicity n) :
    frequentMultiplicityCount k
        (canonicalMultiplicityValues multiplicity) =
      frequentSizeCount k multiplicity := by
  unfold frequentMultiplicityCount
  rw [canonicalMultiplicityValues,
    countP_trimTrailingZeros
      (fun value => decide (k ≤ value))
      (by simp [show ¬k ≤ 0 by omega])]
  rw [boundedMultiplicityList, countP_ofFn_eq_card_filter]
  unfold frequentSizeCount support
  congr 1
  ext index
  simp only [Finset.mem_filter, Finset.mem_univ, true_and,
    decide_eq_true_eq]
  constructor
  · intro hfrequent
    exact ⟨by
      intro hzero
      have : (multiplicity index : ℕ) = 0 := by
        exact_mod_cast hzero
      omega, hfrequent⟩
  · exact fun h => h.2

theorem divisiblePresentSizeCountAux_ofFn_eq_card_filter
    {n : ℕ} (k size : ℕ) (values : Fin n → ℕ) :
    divisiblePresentSizeCountAux k size (List.ofFn values) =
      (Finset.univ.filter fun index =>
        values index ≠ 0 ∧ k ∣ size + index.val).card := by
  induction n generalizing size with
  | zero => simp [divisiblePresentSizeCountAux]
  | succ n ih =>
      rw [List.ofFn_succ, Finset.card_filter, Fin.sum_univ_succ]
      simp only [divisiblePresentSizeCountAux]
      rw [ih (size := size + 1)
        (values := fun index => values index.succ)]
      rw [Finset.card_filter]
      simp only [Fin.val_zero, Nat.add_zero, Fin.val_succ]
      apply congrArg (fun tail =>
        (if values 0 ≠ 0 ∧ k ∣ size then 1 else 0) + tail)
      apply Finset.sum_congr rfl
      intro index _
      have hsize : size + 1 + index.val =
          size + index.val.succ := by omega
      rw [hsize]
      simp only [Nat.succ_eq_add_one]
      rfl

theorem divisiblePresentSizeCount_canonicalMultiplicityValues
    {n : ℕ} (k : ℕ) (multiplicity : Multiplicity n) :
    divisiblePresentSizeCount k
        (canonicalMultiplicityValues multiplicity) =
      divisiblePresentCount k multiplicity := by
  have htrim :
      divisiblePresentSizeCount k
          (canonicalMultiplicityValues multiplicity) =
        divisiblePresentSizeCount k
          (boundedMultiplicityList multiplicity) := by
    rcases exists_eq_trimTrailingZeros_append_replicate_zero
        (boundedMultiplicityList multiplicity) with
      ⟨count, hvalues⟩
    unfold divisiblePresentSizeCount
    have hzeroTail :=
      divisiblePresentSizeCountAux_append_replicate_zero
        k 1
        (trimTrailingZeros (boundedMultiplicityList multiplicity))
        count
    rw [← hvalues] at hzeroTail
    simpa [canonicalMultiplicityValues] using hzeroTail.symm
  rw [htrim]
  unfold divisiblePresentSizeCount
  rw [boundedMultiplicityList,
    divisiblePresentSizeCountAux_ofFn_eq_card_filter]
  unfold divisiblePresentCount support
  congr 1
  ext index
  simp only [Finset.mem_filter, Finset.mem_univ, true_and]
  constructor
  · intro h
    exact ⟨by
      intro hzero
      apply h.1
      exact_mod_cast hzero, by simpa [Nat.add_comm] using h.2⟩
  · intro h
    exact ⟨by
      intro hzero
      apply h.1
      exact_mod_cast hzero, by simpa [Nat.add_comm] using h.2⟩

end FixedPerimeter
