import FixedPerimeter.BasicFiberBridge

/-!
# Executable counts equal canonical fiber counts

The executable `FO` and `FD` definitions filter the finite bounded
multiplicity vectors.  The generating-function development counts canonical
multiplicity fibers instead.  This file transports the two statistics through
the equivalence between those representations.
-/

set_option autoImplicit false

namespace FixedPerimeter

def finsetFilterSubtypeEquiv {α : Type*} [DecidableEq α]
    (entries : Finset α) (predicate : α → Prop)
    [DecidablePred predicate] :
    {entry : α // entry ∈ entries.filter predicate} ≃
      {entry : {entry : α // entry ∈ entries} //
        predicate entry.1} where
  toFun entry :=
    ⟨⟨entry.1, (Finset.mem_filter.mp entry.2).1⟩,
      (Finset.mem_filter.mp entry.2).2⟩
  invFun entry :=
    ⟨entry.1.1,
      Finset.mem_filter.mpr ⟨entry.1.2, entry.2⟩⟩
  left_inv _ := rfl
  right_inv _ := rfl

noncomputable def foFilterFiberEquiv (j k n : ℕ) :
    {multiplicity : Multiplicity n //
      multiplicity ∈
        (fixedPerimeterPartitions n).filter
          (fun entry => divisiblePresentCount k entry = j)} ≃
      {fiber : MultiplicityFiber (n + 1) //
        divisiblePresentSizeCount k fiber.values = j} :=
  (finsetFilterSubtypeEquiv
      (fixedPerimeterPartitions n)
      (fun entry => divisiblePresentCount k entry = j)).trans
    ((fixedPerimeterPartitionFiberEquiv n).subtypeEquiv (fun partition => by
      change divisiblePresentCount k partition.1 = j ↔
        divisiblePresentSizeCount k
          (canonicalMultiplicityValues partition.1) = j
      rw [divisiblePresentSizeCount_canonicalMultiplicityValues]))

noncomputable def fdFilterFiberEquiv
    (j k n : ℕ) (hk : 1 ≤ k) :
    {multiplicity : Multiplicity n //
      multiplicity ∈
        (fixedPerimeterPartitions n).filter
          (fun entry => frequentSizeCount k entry = j)} ≃
      {fiber : MultiplicityFiber (n + 1) //
        frequentMultiplicityCount k fiber.values = j} :=
  (finsetFilterSubtypeEquiv
      (fixedPerimeterPartitions n)
      (fun entry => frequentSizeCount k entry = j)).trans
    ((fixedPerimeterPartitionFiberEquiv n).subtypeEquiv (fun partition => by
      change frequentSizeCount k partition.1 = j ↔
        frequentMultiplicityCount k
          (canonicalMultiplicityValues partition.1) = j
      rw [frequentMultiplicityCount_canonicalMultiplicityValues hk]))

theorem FO_eq_CanonicalFO (j k n : ℕ) :
    FO j k n = CanonicalFO j k n := by
  unfold FO CanonicalFO
  rw [← Fintype.card_coe]
  exact Fintype.card_congr (foFilterFiberEquiv j k n)

theorem FD_eq_CanonicalFD
    (j k n : ℕ) (hk : 1 ≤ k) :
    FD j k n = CanonicalFD j k n := by
  unfold FD CanonicalFD
  rw [← Fintype.card_coe]
  exact Fintype.card_congr (fdFilterFiberEquiv j k n hk)

/-- The exact `k = 2` identity for the executable fixed-perimeter counts. -/
theorem fixedPerimeter_eq_two (j n : ℕ) :
    FD j 2 n = FO j 2 n := by
  rw [FD_eq_CanonicalFD j 2 n (by omega),
    FO_eq_CanonicalFO,
    canonical_fixedPerimeter_eq_two]

end FixedPerimeter
