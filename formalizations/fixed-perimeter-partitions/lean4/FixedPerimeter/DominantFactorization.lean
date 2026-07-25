import FixedPerimeter.RemainderBounds

/-!
# Factoring at the dominant root

This file turns the already-proved simple dominant roots into exact polynomial
factorizations by the normalized pole factor `1 - X / ρ`.
-/

set_option autoImplicit false

namespace FixedPerimeter

open Polynomial

/-- The quotient after removing the linear factor at `root`. -/
noncomputable def rootCofactor
    (polynomial : Polynomial ℝ) (root : ℝ) : Polynomial ℝ :=
  polynomial /ₘ (X - C root)

theorem rootFactor_mul_rootCofactor
    {polynomial : Polynomial ℝ} {root : ℝ}
    (hRoot : polynomial.IsRoot root) :
    (X - C root) * rootCofactor polynomial root = polynomial := by
  exact mul_divByMonic_eq_iff_isRoot.mpr hRoot

/-- Evaluating the cofactor at the removed root gives the derivative there. -/
theorem rootCofactor_eval_eq_derivative_eval
    (polynomial : Polynomial ℝ) (root : ℝ) :
    (rootCofactor polynomial root).eval root =
      (derivative polynomial).eval root := by
  have hidentity :=
    divByMonic_add_X_sub_C_mul_derivative_divByMonic_eq_derivative
      polynomial root
  have heval := congrArg (Polynomial.eval root) hidentity
  simpa [rootCofactor] using heval

/-- The normalized linear factor whose inverse is the pure pole series. -/
noncomputable def normalizedPoleFactor (root : ℝ) : Polynomial ℝ :=
  1 - C root⁻¹ * X

/-- Cofactor normalized so that multiplication by `1-X/root` recovers the
original polynomial. -/
noncomputable def normalizedRootCofactor
    (polynomial : Polynomial ℝ) (root : ℝ) : Polynomial ℝ :=
  C (-root) * rootCofactor polynomial root

theorem normalizedPoleFactor_mul_cofactor
    {polynomial : Polynomial ℝ} {root : ℝ}
    (hRoot : polynomial.IsRoot root) (hRootNe : root ≠ 0) :
    normalizedPoleFactor root *
        normalizedRootCofactor polynomial root =
      polynomial := by
  have hab :
      (C root⁻¹ * X) * C (-root) = -(X : Polynomial ℝ) := by
    calc
      (C root⁻¹ * X) * C (-root) =
          (C root⁻¹ * C (-root)) * X := by ring
      _ = C (root⁻¹ * (-root)) * X := by rw [map_mul]
      _ = -X := by simp [hRootNe]
  calc
    normalizedPoleFactor root *
        normalizedRootCofactor polynomial root =
      (C (-root) - (C root⁻¹ * X) * C (-root)) *
        rootCofactor polynomial root := by
          simp only [normalizedPoleFactor, normalizedRootCofactor]
          ring
    _ = (C (-root) - (-X)) * rootCofactor polynomial root := by
          rw [hab]
    _ = (X - C root) * rootCofactor polynomial root := by
          congr 1
          simp
          abel
    _ = polynomial := rootFactor_mul_rootCofactor hRoot

theorem normalizedRootCofactor_eval_ne_zero
    {polynomial : Polynomial ℝ} {root : ℝ}
    (hRootNe : root ≠ 0)
    (hDerivative : (derivative polynomial).eval root ≠ 0) :
    (normalizedRootCofactor polynomial root).eval root ≠ 0 := by
  rw [normalizedRootCofactor, eval_mul, eval_C,
    rootCofactor_eval_eq_derivative_eval]
  exact mul_ne_zero (neg_ne_zero.mpr hRootNe) hDerivative

/-- Normalized cofactor of `A_D` at its positive dominant root. -/
noncomputable def adDominantCofactor (k : ℕ) (hk : 1 ≤ k) :
    Polynomial ℝ :=
  normalizedRootCofactor (ADReal k) (adRoot k hk)

/-- Normalized cofactor of `A_O` at its positive dominant root. -/
noncomputable def aoDominantCofactor (k : ℕ) (hk : 2 ≤ k) :
    Polynomial ℝ :=
  normalizedRootCofactor (AOReal k) (aoRoot k hk)

theorem adRoot_pos (k : ℕ) (hk : 1 ≤ k) :
    0 < adRoot k hk := by
  exact lt_of_lt_of_le (by norm_num) (adRoot_mem k hk).1

theorem aoRoot_pos (k : ℕ) (hk : 2 ≤ k) :
    0 < aoRoot k hk := by
  exact lt_of_lt_of_le (by norm_num) (aoRoot_mem k hk).1

theorem ADReal_dominant_factorization (k : ℕ) (hk : 1 ≤ k) :
    normalizedPoleFactor (adRoot k hk) *
        adDominantCofactor k hk =
      ADReal k := by
  exact normalizedPoleFactor_mul_cofactor
    (ADReal_isRoot k hk) (adRoot_pos k hk).ne'

theorem AOReal_dominant_factorization (k : ℕ) (hk : 2 ≤ k) :
    normalizedPoleFactor (aoRoot k hk) *
        aoDominantCofactor k hk =
      AOReal k := by
  exact normalizedPoleFactor_mul_cofactor
    (AOReal_isRoot k hk) (aoRoot_pos k hk).ne'

theorem adDominantCofactor_eval_ne_zero (k : ℕ) (hk : 1 ≤ k) :
    (adDominantCofactor k hk).eval (adRoot k hk) ≠ 0 := by
  exact normalizedRootCofactor_eval_ne_zero
    (adRoot_pos k hk).ne'
    (derivative_ADReal_at_root_ne_zero k hk)

theorem aoDominantCofactor_eval_ne_zero (k : ℕ) (hk : 2 ≤ k) :
    (aoDominantCofactor k hk).eval (aoRoot k hk) ≠ 0 := by
  exact normalizedRootCofactor_eval_ne_zero
    (aoRoot_pos k hk).ne'
    (derivative_AOReal_at_root_ne_zero k hk)

theorem adDominantCofactor_eval_zero
    (k : ℕ) (hk : 1 ≤ k) :
    (adDominantCofactor k hk).eval 0 = 1 := by
  have hfactorization :=
    congrArg (Polynomial.eval (0 : ℝ))
      (ADReal_dominant_factorization k hk)
  simpa [normalizedPoleFactor, ADReal, AD,
    Polynomial.eval_finsetSum] using
    hfactorization

theorem aoDominantCofactor_eval_zero
    (k : ℕ) (hk : 2 ≤ k) :
    (aoDominantCofactor k hk).eval 0 = 1 := by
  have hfactorization :=
    congrArg (Polynomial.eval (0 : ℝ))
      (AOReal_dominant_factorization k hk)
  have hkNe : k ≠ 0 := by omega
  simpa [normalizedPoleFactor, AOReal, AO, hkNe] using
    hfactorization

end FixedPerimeter
