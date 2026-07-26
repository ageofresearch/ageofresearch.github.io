import FixedPerimeter.MainTheorems

/-!
# Axiom audit

The three public conclusions are checked whenever this audit module is
elaborated. The expected dependencies are Mathlib's
standard classical foundations (`propext`, `Classical.choice`, and
`Quot.sound`); no conjecture-specific axiom is introduced. The guarded
messages make elaboration fail if the dependency list changes.
-/

/--
info: 'FixedPerimeter.fixedPerimeter_eq_two' depends on axioms: [propext, Classical.choice, Quot.sound]
-/
#guard_msgs in
#print axioms FixedPerimeter.fixedPerimeter_eq_two

/--
info: 'FixedPerimeter.fixedPerimeter_ratio_tendsto_zero' depends on axioms: [propext, Classical.choice, Quot.sound]
-/
#guard_msgs in
#print axioms FixedPerimeter.fixedPerimeter_ratio_tendsto_zero

/--
info: 'FixedPerimeter.fixedPerimeter_eventually_strict' depends on axioms: [propext, Classical.choice, Quot.sound]
-/
#guard_msgs in
#print axioms FixedPerimeter.fixedPerimeter_eventually_strict
