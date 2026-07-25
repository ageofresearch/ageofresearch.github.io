import FixedPerimeter.FixedJSeries
import FixedPerimeter.CountBridge

/-!
# Rational-series obligations for the executable counts

The formal recurrence criteria were first stated for canonical fibers.  The
representation equivalence now lets us state exactly the same criteria for
the `FO` and `FD` functions used by the application.
-/

set_option autoImplicit false

namespace FixedPerimeter

theorem FD_series_iff_recurrence
    (j k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (FD j k n : ℚ)) =
        rationalSeries
          (fdFixedJNumerator j k)
          (fdFixedJDenominator j k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (fdFixedJDenominator j k).coeff pair.1 *
            (FD j k pair.2 : ℚ)) =
        (fdFixedJNumerator j k).coeff n := by
  simpa only [FD_eq_CanonicalFD j k _ hk] using
    canonicalFD_series_iff_recurrence j k

theorem FO_series_iff_recurrence
    (j k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (FO j k n : ℚ)) =
        rationalSeries
          (foFixedJNumerator j k)
          (foFixedJDenominator j k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (foFixedJDenominator j k).coeff pair.1 *
            (FO j k pair.2 : ℚ)) =
        (foFixedJNumerator j k).coeff n := by
  simpa only [FO_eq_CanonicalFO] using
    canonicalFO_series_iff_recurrence j k hk

theorem FD_zero_series_iff_recurrence
    (k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (FD 0 k n : ℚ)) =
        rationalSeries (fdZeroNumerator k) (fdZeroDenominator k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (fdZeroDenominator k).coeff pair.1 *
            (FD 0 k pair.2 : ℚ)) =
        (fdZeroNumerator k).coeff n := by
  simpa only [FD_eq_CanonicalFD 0 k _ hk] using
    canonicalFD_zero_series_iff_recurrence k

theorem FO_zero_series_iff_recurrence
    (k : ℕ) (hk : 1 ≤ k) :
    seriesOf (fun n => (FO 0 k n : ℚ)) =
        rationalSeries (foZeroNumerator k) (foZeroDenominator k) ↔
      ∀ n : ℕ,
        (∑ pair ∈ Finset.antidiagonal n,
          (foZeroDenominator k).coeff pair.1 *
            (FO 0 k pair.2 : ℚ)) =
        (foZeroNumerator k).coeff n := by
  simpa only [FO_eq_CanonicalFO] using
    canonicalFO_zero_series_iff_recurrence k hk

end FixedPerimeter
