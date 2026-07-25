import FixedPerimeter.AsymptoticComparison
import FixedPerimeter.CompositionModel
import FixedPerimeter.CountBridge
import FixedPerimeter.EnumerativeFOPositive

/-!
# Main conclusions from the coefficient asymptotics

At this point all analytic comparison logic is unconditional.  The theorem
below isolates the remaining enumerative/transfer obligation: positive
asymptotic equivalents for the two canonical counting sequences.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter
open scoped Topology

theorem canonical_ratio_zero_and_eventually_strict_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    Tendsto
        (fun n =>
          (CanonicalFO j k n : ℝ) /
            (CanonicalFD j k n : ℝ))
        atTop (𝓝 0) ∧
      ∃ threshold : ℕ, ∀ n ≥ threshold,
        CanonicalFO j k n < CanonicalFD j k n := by
  have hfdRootPos : 0 < adRoot k (by omega) := by
    have hrootOpen := adRoot_mem_Ioo k (by omega)
    exact lt_trans (by norm_num) hrootOpen.1
  exact ratio_zero_and_eventually_strict_of_isEquivalent
    j hFOConstant hFDConstant hfdRootPos
      (adRoot_lt_aoRoot k hk) hFO hFD

theorem canonical_ratio_tendsto_zero_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    Tendsto
      (fun n =>
        (CanonicalFO j k n : ℝ) /
          (CanonicalFD j k n : ℝ))
      atTop (𝓝 0) :=
  (canonical_ratio_zero_and_eventually_strict_of_asymptotics
    j k hk hFOConstant hFDConstant hFO hFD).1

theorem canonical_eventually_strict_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    ∃ threshold : ℕ, ∀ n ≥ threshold,
      CanonicalFO j k n < CanonicalFD j k n :=
  (canonical_ratio_zero_and_eventually_strict_of_asymptotics
    j k hk hFOConstant hFDConstant hFO hFD).2

/-- Transport the canonical asymptotic comparison all the way back to the
executable `FO` and `FD` definitions. -/
theorem fixedPerimeter_ratio_zero_and_eventually_strict_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    Tendsto
        (fun n => (FO j k n : ℝ) / (FD j k n : ℝ))
        atTop (𝓝 0) ∧
      ∃ threshold : ℕ, ∀ n ≥ threshold,
        FO j k n < FD j k n := by
  have hcanonical :=
    canonical_ratio_zero_and_eventually_strict_of_asymptotics
      j k hk hFOConstant hFDConstant hFO hFD
  constructor
  · simpa only [FO_eq_CanonicalFO,
      FD_eq_CanonicalFD j k _ (by omega)] using hcanonical.1
  · rcases hcanonical.2 with ⟨threshold, hthreshold⟩
    refine ⟨threshold, ?_⟩
    intro n hn
    simpa only [FO_eq_CanonicalFO,
      FD_eq_CanonicalFD j k n (by omega)] using hthreshold n hn

theorem fixedPerimeter_ratio_tendsto_zero_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    Tendsto
      (fun n => (FO j k n : ℝ) / (FD j k n : ℝ))
      atTop (𝓝 0) :=
  (fixedPerimeter_ratio_zero_and_eventually_strict_of_asymptotics
    j k hk hFOConstant hFDConstant hFO hFD).1

theorem fixedPerimeter_eventually_strict_of_asymptotics
    (j k : ℕ) (hk : 3 ≤ k)
    {foConstant fdConstant : ℝ}
    (hFOConstant : 0 < foConstant)
    (hFDConstant : 0 < fdConstant)
    (hFO :
      (fun n => (CanonicalFO j k n : ℝ)) ~[atTop]
        coefficientModel foConstant j (aoRoot k (by omega)))
    (hFD :
      (fun n => (CanonicalFD j k n : ℝ)) ~[atTop]
        coefficientModel fdConstant j (adRoot k (by omega))) :
    ∃ threshold : ℕ, ∀ n ≥ threshold,
      FO j k n < FD j k n :=
  (fixedPerimeter_ratio_zero_and_eventually_strict_of_asymptotics
    j k hk hFOConstant hFDConstant hFO hFD).2

theorem fixedPerimeter_ratio_zero_and_eventually_strict
    (j k : ℕ) (hk : 3 ≤ k) :
    Tendsto
        (fun n => (FO j k n : ℝ) / (FD j k n : ℝ))
        atTop (𝓝 0) ∧
      ∃ threshold : ℕ, ∀ n ≥ threshold,
        FO j k n < FD j k n := by
  cases j with
  | zero =>
      exact
        fixedPerimeter_ratio_zero_and_eventually_strict_of_asymptotics
          0 k hk
          (foZeroLeadingConstant_pos k (by omega))
          (fdZeroLeadingConstant_pos k (by omega))
          (canonicalFO_zero_asymptotic k (by omega))
          (canonicalFD_zero_asymptotic k (by omega))
  | succ j =>
      exact
        fixedPerimeter_ratio_zero_and_eventually_strict_of_asymptotics
          (j + 1) k hk
          (foLeadingConstant_pos (j + 1) k (by omega))
          (fdLeadingConstant_pos (j + 1) k (by omega))
          (canonicalFO_asymptotic
            (j + 1) k (by omega) (by omega))
          (canonicalFD_asymptotic
            (j + 1) k (by omega) (by omega))

theorem fixedPerimeter_ratio_tendsto_zero
    (j k : ℕ) (hk : 3 ≤ k) :
    Tendsto
      (fun n => (FO j k n : ℝ) / (FD j k n : ℝ))
      atTop (𝓝 0) :=
  (fixedPerimeter_ratio_zero_and_eventually_strict
    j k hk).1

theorem fixedPerimeter_eventually_strict
    (j k : ℕ) (hk : 3 ≤ k) :
    ∃ threshold : ℕ, ∀ n ≥ threshold,
      FO j k n < FD j k n :=
  (fixedPerimeter_ratio_zero_and_eventually_strict
    j k hk).2

end FixedPerimeter
