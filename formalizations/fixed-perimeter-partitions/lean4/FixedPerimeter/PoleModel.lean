import FixedPerimeter.AsymptoticComparison
import Mathlib.Analysis.SpecialFunctions.Choose
import Mathlib.RingTheory.PowerSeries.WellKnown

/-!
# Coefficients of a pure pole

The principal part `(1-X/ρ)^-(j+1)` has exact binomial coefficients.  This
file proves their asymptotic form in the same `coefficientModel` representation
used by the final comparison theorem.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Asymptotics Filter

theorem isEquivalent_shifted_choose (j : ℕ) :
    (fun n : ℕ => ((n + j).choose j : ℝ)) ~[atTop]
      (fun n : ℕ => (n : ℝ) ^ j / j.factorial) := by
  have hshifted :=
    (isEquivalent_choose j).comp_tendsto
      (tendsto_add_atTop_nat j)
  change
    (fun n : ℕ => ((n + j).choose j : ℝ)) ~[atTop]
      (fun n : ℕ => ((n + j : ℕ) : ℝ) ^ j / j.factorial)
    at hshifted
  have hnorm :
      Tendsto (norm ∘ fun n : ℕ => (n : ℝ)) atTop atTop := by
    have heq :
        (norm ∘ fun n : ℕ => (n : ℝ)) =
          (fun n : ℕ => (n : ℝ)) := by
      funext n
      simp
    rw [heq]
    exact tendsto_natCast_atTop_atTop
  have hbase :
      (fun n : ℕ => (n : ℝ) + j) ~[atTop]
        (fun n : ℕ => (n : ℝ)) :=
    (IsEquivalent.refl : (fun n : ℕ => (n : ℝ)) ~[atTop]
      (fun n : ℕ => (n : ℝ))).add_const_of_norm_tendsto_atTop hnorm
  have hpower :
      (fun n : ℕ => ((n : ℝ) + j) ^ j) ~[atTop]
        (fun n : ℕ => (n : ℝ) ^ j) :=
    hbase.pow j
  have hquotient :
      (fun n : ℕ => ((n : ℝ) + j) ^ j / j.factorial) ~[atTop]
        (fun n : ℕ => (n : ℝ) ^ j / j.factorial) := by
    exact hpower.div IsEquivalent.refl
  apply hshifted.trans
  simpa [Nat.cast_add] using hquotient

/-- Formal expansion of `(1-X/ρ)^-(j+1)`. -/
noncomputable def purePoleSeries (j : ℕ) (radius : ℝ) :
    PowerSeries ℝ :=
  PowerSeries.rescale radius⁻¹
    (PowerSeries.invOneSubPow ℝ (j + 1)).val

theorem coeff_purePoleSeries (j n : ℕ) (radius : ℝ) :
    PowerSeries.coeff n (purePoleSeries j radius) =
      ((n + j).choose j : ℝ) * radius⁻¹ ^ n := by
  simp [purePoleSeries,
    PowerSeries.invOneSubPow_val_succ_eq_mk_add_choose,
    Nat.add_comm]
  ring

theorem purePole_coeff_isEquivalent (j : ℕ) {radius : ℝ}
    (hRadius : 0 < radius) :
    (fun n : ℕ => PowerSeries.coeff n (purePoleSeries j radius)) ~[atTop]
      coefficientModel (j.factorial : ℝ)⁻¹ j radius := by
  have hchoose := isEquivalent_shifted_choose j
  have hmul :
      (fun n : ℕ =>
        ((n + j).choose j : ℝ) * radius⁻¹ ^ n) ~[atTop]
      (fun n : ℕ =>
        ((n : ℝ) ^ j / j.factorial) * radius⁻¹ ^ n) :=
    hchoose.mul IsEquivalent.refl
  refine (hmul.congr_left ?_).congr_right ?_
  · filter_upwards [] with n
    exact (coeff_purePoleSeries j n radius).symm
  · filter_upwards [] with n
    unfold coefficientModel
    rw [inv_pow]
    ring

/-- A monomial numerator multiplying the pure pole. -/
noncomputable def monomialPoleSeries
    (shift j : ℕ) (radius coefficient : ℝ) : PowerSeries ℝ :=
  PowerSeries.C coefficient * PowerSeries.X ^ shift *
    purePoleSeries j radius

theorem coeff_monomialPoleSeries_add
    (shift j n : ℕ) (radius coefficient : ℝ) :
    PowerSeries.coeff (n + shift)
        (monomialPoleSeries shift j radius coefficient) =
      coefficient * ((n + j).choose j : ℝ) * radius⁻¹ ^ n := by
  rw [show monomialPoleSeries shift j radius coefficient =
      PowerSeries.C coefficient *
        (PowerSeries.X ^ shift * purePoleSeries j radius) by
    simp [monomialPoleSeries, mul_assoc]]
  rw [PowerSeries.coeff_C_mul]
  rw [PowerSeries.coeff_X_pow_mul]
  rw [coeff_purePoleSeries]
  ring

/-- Along the natural shifted indexing, a monomial numerator changes only the
principal constant; it does not change the pole order or radius. -/
theorem monomialPole_coeff_add_isEquivalent
    (shift j : ℕ) {radius coefficient : ℝ}
    (hRadius : 0 < radius) (hCoefficient : coefficient ≠ 0) :
    (fun n : ℕ =>
      PowerSeries.coeff (n + shift)
        (monomialPoleSeries shift j radius coefficient)) ~[atTop]
      coefficientModel
        (coefficient * (j.factorial : ℝ)⁻¹) j radius := by
  have hpure := purePole_coeff_isEquivalent j hRadius
  have hscaled :=
    (IsEquivalent.refl :
      (fun _n : ℕ => coefficient) ~[atTop]
        (fun _n : ℕ => coefficient)).mul hpure
  refine (hscaled.congr_left ?_).congr_right ?_
  · filter_upwards [] with n
    change coefficient * PowerSeries.coeff n (purePoleSeries j radius) =
      PowerSeries.coeff (n + shift)
        (monomialPoleSeries shift j radius coefficient)
    rw [coeff_purePoleSeries, coeff_monomialPoleSeries_add]
    ring
  · filter_upwards [] with n
    change coefficient *
        coefficientModel (j.factorial : ℝ)⁻¹ j radius n =
      coefficientModel
        (coefficient * (j.factorial : ℝ)⁻¹) j radius n
    unfold coefficientModel
    ring

/-- A finite polynomial numerator multiplying a pure pole. -/
noncomputable def polynomialPoleSeries
    (numerator : Polynomial ℝ) (j : ℕ) (radius : ℝ) :
    PowerSeries ℝ :=
  (numerator : PowerSeries ℝ) * purePoleSeries j radius

/-- Exact finite-convolution formula for a polynomial numerator over a pure
pole.  This is the algebraic coefficient-extraction step used before the
analytic remainder estimate. -/
theorem coeff_polynomialPoleSeries
    (numerator : Polynomial ℝ) (j n : ℕ) (radius : ℝ) :
    PowerSeries.coeff n (polynomialPoleSeries numerator j radius) =
      ∑ pair ∈ Finset.antidiagonal n,
        numerator.coeff pair.1 *
          (((pair.2 + j).choose j : ℝ) * radius⁻¹ ^ pair.2) := by
  simp only [polynomialPoleSeries, PowerSeries.coeff_mul,
    Polynomial.coeff_coe, coeff_purePoleSeries]

/-- Coefficients above the degree of the numerator can be written as a sum
over its fixed finite support. -/
theorem coeff_polynomialPoleSeries_eq_support_sum
    (numerator : Polynomial ℝ) (j n : ℕ) (radius : ℝ)
    (hn : numerator.natDegree ≤ n) :
    PowerSeries.coeff n (polynomialPoleSeries numerator j radius) =
      ∑ exponent ∈ numerator.support,
        numerator.coeff exponent *
          (((n - exponent + j).choose j : ℝ) *
            radius⁻¹ ^ (n - exponent)) := by
  rw [coeff_polynomialPoleSeries]
  calc
    (∑ pair ∈ Finset.antidiagonal n,
        numerator.coeff pair.1 *
          (((pair.2 + j).choose j : ℝ) * radius⁻¹ ^ pair.2)) =
      ∑ exponent ∈ Finset.range n.succ,
        numerator.coeff exponent *
          (((n - exponent + j).choose j : ℝ) *
            radius⁻¹ ^ (n - exponent)) := by
      exact Finset.Nat.sum_antidiagonal_eq_sum_range_succ
        (fun first second =>
          numerator.coeff first *
            (((second + j).choose j : ℝ) * radius⁻¹ ^ second)) n
    _ = ∑ exponent ∈ numerator.support,
        numerator.coeff exponent *
          (((n - exponent + j).choose j : ℝ) *
            radius⁻¹ ^ (n - exponent)) := by
      rw [← Finset.sum_subset (s₁ := numerator.support)
        (s₂ := Finset.range n.succ)]
      · intro exponent hexponent
        rw [Polynomial.mem_support_iff] at hexponent
        have hdegree : exponent ≤ numerator.natDegree :=
          Polynomial.le_natDegree_of_ne_zero hexponent
        simp only [Finset.mem_range]
        omega
      · intro exponent _ hexponentNotSupport
        have hcoeff : numerator.coeff exponent = 0 := by
          by_contra hne
          exact hexponentNotSupport
            (Polynomial.mem_support_iff.mpr hne)
        rw [hcoeff]
        simp

/-- Shifting the index by a fixed amount contributes the expected factor
`radius ^ shift` to the principal constant. -/
theorem shifted_purePole_term_isEquivalent
    (shift j : ℕ) {radius : ℝ} (hRadius : 0 < radius) :
    (fun n : ℕ =>
      (((n - shift + j).choose j : ℝ) *
        radius⁻¹ ^ (n - shift))) ~[atTop]
      coefficientModel
        (radius ^ shift * (j.factorial : ℝ)⁻¹) j radius := by
  have hchooseShift :=
    (isEquivalent_shifted_choose j).comp_tendsto
      (tendsto_sub_atTop_nat shift)
  change
    (fun n : ℕ => (((n - shift + j).choose j : ℝ))) ~[atTop]
      (fun n : ℕ => ((n - shift : ℕ) : ℝ) ^ j / j.factorial)
    at hchooseShift
  have hnorm :
      Tendsto (norm ∘ fun n : ℕ => (n : ℝ)) atTop atTop := by
    have heq :
        (norm ∘ fun n : ℕ => (n : ℝ)) =
          (fun n : ℕ => (n : ℝ)) := by
      funext n
      simp
    rw [heq]
    exact tendsto_natCast_atTop_atTop
  have hbase :
      (fun n : ℕ => (n : ℝ) + (-(shift : ℝ))) ~[atTop]
        (fun n : ℕ => (n : ℝ)) :=
    (IsEquivalent.refl : (fun n : ℕ => (n : ℝ)) ~[atTop]
      (fun n : ℕ => (n : ℝ))).add_const_of_norm_tendsto_atTop hnorm
  have hnatShift :
      (fun n : ℕ => ((n - shift : ℕ) : ℝ)) ~[atTop]
        (fun n : ℕ => (n : ℝ)) := by
    apply hbase.congr_left
    filter_upwards [eventually_ge_atTop shift] with n hn
    rw [Nat.cast_sub hn]
    ring
  have hpower := hnatShift.pow j
  have hquotient :
      (fun n : ℕ =>
        ((n - shift : ℕ) : ℝ) ^ j / j.factorial) ~[atTop]
      (fun n : ℕ => (n : ℝ) ^ j / j.factorial) := by
    exact hpower.div IsEquivalent.refl
  have hchoose :
      (fun n : ℕ => (((n - shift + j).choose j : ℝ))) ~[atTop]
        (fun n : ℕ => (n : ℝ) ^ j / j.factorial) :=
    hchooseShift.trans hquotient
  have hmul :=
    hchoose.mul
      (IsEquivalent.refl :
        (fun n : ℕ => radius⁻¹ ^ (n - shift)) ~[atTop]
          (fun n : ℕ => radius⁻¹ ^ (n - shift)))
  apply hmul.congr_right
  filter_upwards [eventually_ge_atTop shift] with n hn
  change ((n : ℝ) ^ j / j.factorial) *
      radius⁻¹ ^ (n - shift) =
    coefficientModel
      (radius ^ shift * (j.factorial : ℝ)⁻¹) j radius n
  unfold coefficientModel
  rw [inv_pow_sub₀ hRadius.ne' hn]
  field_simp

/-- Finite sums of terms with a common pole order and radius have the sum of
their principal constants as principal constant, provided it does not cancel.
-/
theorem finset_sum_coefficientModel_isEquivalent
    {ι : Type*} [DecidableEq ι]
    (indices : Finset ι) (term : ι → ℕ → ℝ)
    (constant : ι → ℝ) (j : ℕ) (radius : ℝ)
    (hTotal : (∑ i ∈ indices, constant i) ≠ 0)
    (hTerm : ∀ i ∈ indices,
      term i ~[atTop] coefficientModel (constant i) j radius) :
    (fun n : ℕ => ∑ i ∈ indices, term i n) ~[atTop]
      coefficientModel (∑ i ∈ indices, constant i) j radius := by
  let base : ℕ → ℝ := coefficientModel 1 j radius
  have hErrors :
      ∀ i ∈ indices,
        (term i - coefficientModel (constant i) j radius) =o[atTop]
          base := by
    intro i hi
    have hmodel :
        coefficientModel (constant i) j radius =O[atTop] base := by
      have hscaled :=
        isBigO_const_mul_self (constant i) base atTop
      apply hscaled.congr'
      · filter_upwards [] with n
        unfold base coefficientModel
        ring
      · exact EventuallyEq.rfl
    exact (hTerm i hi).isLittleO.trans_isBigO hmodel
  have hsum :
      (fun n : ℕ =>
        ∑ i ∈ indices,
          (term i - coefficientModel (constant i) j radius) n) =o[atTop]
        base :=
    IsLittleO.sum hErrors
  have htoTarget :=
    hsum.trans_isBigO
      (isBigO_self_const_mul hTotal base atTop)
  rw [IsEquivalent]
  have hTarget :
      coefficientModel (∑ i ∈ indices, constant i) j radius =
        (fun n => (∑ i ∈ indices, constant i) * base n) := by
    funext n
    unfold base coefficientModel
    ring
  rw [hTarget]
  have hLeft :
      (fun n => ∑ i ∈ indices, term i n) -
          (fun n => (∑ i ∈ indices, constant i) * base n) =
        (fun n =>
          ∑ i ∈ indices,
            (term i - coefficientModel (constant i) j radius) n) := by
    funext n
    simp only [Pi.sub_apply, Finset.sum_sub_distrib]
    unfold base coefficientModel
    rw [Finset.sum_mul]
    congr 1
    apply Finset.sum_congr rfl
    intro i _
    ring
  rw [hLeft]
  exact htoTarget

/-- A polynomial numerator contributes its value at the dominant pole to the
principal coefficient constant.  This is the complete asymptotic theorem for
a polynomial times a pure pole. -/
theorem polynomialPole_coeff_isEquivalent
    (numerator : Polynomial ℝ) (j : ℕ) {radius : ℝ}
    (hRadius : 0 < radius) (hEval : numerator.eval radius ≠ 0) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (polynomialPoleSeries numerator j radius)) ~[atTop]
      coefficientModel
        (numerator.eval radius * (j.factorial : ℝ)⁻¹) j radius := by
  let term : ℕ → ℕ → ℝ := fun exponent n =>
    numerator.coeff exponent *
      (((n - exponent + j).choose j : ℝ) *
        radius⁻¹ ^ (n - exponent))
  let constant : ℕ → ℝ := fun exponent =>
    numerator.coeff exponent *
      (radius ^ exponent * (j.factorial : ℝ)⁻¹)
  have hTerm :
      ∀ exponent ∈ numerator.support,
        term exponent ~[atTop]
          coefficientModel (constant exponent) j radius := by
    intro exponent _
    have hscaled :=
      (IsEquivalent.refl :
        (fun _n : ℕ => numerator.coeff exponent) ~[atTop]
          (fun _n : ℕ => numerator.coeff exponent)).mul
        (shifted_purePole_term_isEquivalent exponent j hRadius)
    refine (hscaled.congr_left ?_).congr_right ?_
    · filter_upwards [] with n
      change numerator.coeff exponent *
          (((n - exponent + j).choose j : ℝ) *
            radius⁻¹ ^ (n - exponent)) =
        term exponent n
      rfl
    · filter_upwards [] with n
      change numerator.coeff exponent *
          coefficientModel
            (radius ^ exponent * (j.factorial : ℝ)⁻¹) j radius n =
        coefficientModel (constant exponent) j radius n
      unfold constant coefficientModel
      ring
  have hConstantSum :
      (∑ exponent ∈ numerator.support, constant exponent) =
        numerator.eval radius * (j.factorial : ℝ)⁻¹ := by
    unfold constant
    calc
      (∑ exponent ∈ numerator.support,
        numerator.coeff exponent *
          (radius ^ exponent * (j.factorial : ℝ)⁻¹)) =
          ∑ exponent ∈ numerator.support,
            (numerator.coeff exponent * radius ^ exponent) *
              (j.factorial : ℝ)⁻¹ := by
            apply Finset.sum_congr rfl
            intro exponent _
            ring
      _ = (∑ exponent ∈ numerator.support,
            numerator.coeff exponent * radius ^ exponent) *
              (j.factorial : ℝ)⁻¹ := by
            rw [Finset.sum_mul]
      _ = numerator.eval radius * (j.factorial : ℝ)⁻¹ := by
            have hEvalSum :
                (∑ exponent ∈ numerator.support,
                  numerator.coeff exponent * radius ^ exponent) =
                  numerator.eval radius := by
              rw [Polynomial.eval_eq_sum, Polynomial.sum_def]
            rw [hEvalSum]
  have hTotal :
      (∑ exponent ∈ numerator.support, constant exponent) ≠ 0 := by
    rw [hConstantSum]
    exact mul_ne_zero hEval (inv_ne_zero (Nat.cast_ne_zero.mpr
      (Nat.factorial_ne_zero j)))
  have hsum :=
    finset_sum_coefficientModel_isEquivalent
      numerator.support term constant j radius hTotal hTerm
  refine (hsum.congr_left ?_).congr_right ?_
  · filter_upwards [eventually_ge_atTop numerator.natDegree] with n hn
    change (∑ exponent ∈ numerator.support, term exponent n) =
      PowerSeries.coeff n
        (polynomialPoleSeries numerator j radius)
    exact
      (coeff_polynomialPoleSeries_eq_support_sum
        numerator j n radius hn).symm
  · filter_upwards [] with n
    change coefficientModel
        (∑ exponent ∈ numerator.support, constant exponent)
          j radius n =
      coefficientModel
        (numerator.eval radius * (j.factorial : ℝ)⁻¹)
          j radius n
    rw [hConstantSum]

/-- Adding a coefficient sequence that is little-o of the dominant
polynomial-pole model does not change the asymptotic equivalent. -/
theorem polynomialPole_add_remainder_coeff_isEquivalent
    (numerator : Polynomial ℝ) (j : ℕ) {radius : ℝ}
    (remainder : PowerSeries ℝ)
    (hRadius : 0 < radius) (hEval : numerator.eval radius ≠ 0)
    (hRemainder :
      (fun n : ℕ => PowerSeries.coeff n remainder) =o[atTop]
        coefficientModel
          (numerator.eval radius * (j.factorial : ℝ)⁻¹) j radius) :
    (fun n : ℕ =>
      PowerSeries.coeff n
        (polynomialPoleSeries numerator j radius + remainder)) ~[atTop]
      coefficientModel
        (numerator.eval radius * (j.factorial : ℝ)⁻¹) j radius := by
  have hprincipal :=
    polynomialPole_coeff_isEquivalent numerator j hRadius hEval
  have hadd := hprincipal.add_isLittleO hRemainder
  apply hadd.congr_left
  filter_upwards [] with n
  simp

/-- Abstract principal-part interface for a rational power series: once an
exact decomposition and a little-o remainder estimate are supplied, the
dominant coefficient asymptotic follows immediately. -/
theorem coeff_isEquivalent_of_principal_part
    (series : PowerSeries ℝ) (numerator : Polynomial ℝ)
    (j : ℕ) {radius : ℝ} (remainder : PowerSeries ℝ)
    (hRadius : 0 < radius) (hEval : numerator.eval radius ≠ 0)
    (hDecomposition :
      series = polynomialPoleSeries numerator j radius + remainder)
    (hRemainder :
      (fun n : ℕ => PowerSeries.coeff n remainder) =o[atTop]
        coefficientModel
          (numerator.eval radius * (j.factorial : ℝ)⁻¹) j radius) :
    (fun n : ℕ => PowerSeries.coeff n series) ~[atTop]
      coefficientModel
        (numerator.eval radius * (j.factorial : ℝ)⁻¹) j radius := by
  rw [hDecomposition]
  exact polynomialPole_add_remainder_coeff_isEquivalent
    numerator j remainder hRadius hEval hRemainder

end FixedPerimeter
