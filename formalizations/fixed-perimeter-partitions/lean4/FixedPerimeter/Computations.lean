import FixedPerimeter.Basic
import FixedPerimeter.BoundaryWords

/-!
# Executable definition checks

These computations are diagnostics, not premises of the final proof.  They
exercise the bounded partition representation and make indexing mistakes
visible early.
-/

set_option autoImplicit false

namespace FixedPerimeter

/-- All nonzero `(j, FO, FD)` entries for fixed `k,n`. -/
def comparisonRow (k n : ℕ) : List (ℕ × ℕ × ℕ) :=
  (List.range (n + 1)).filterMap fun j =>
    let fo := FO j k n
    let fd := FD j k n
    if fo = 0 ∧ fd = 0 then none else some (j, fo, fd)

#eval comparisonRow 2 1
#eval comparisonRow 2 2
#eval comparisonRow 2 3
#eval comparisonRow 2 4
#eval comparisonRow 2 5
#eval comparisonRow 3 5
#eval comparisonRow 3 6

#eval List.range 8 |>.map fun n =>
  (n, boundaryPhiInverseCheck n, boundaryPhiStatisticCheck n)

end FixedPerimeter
