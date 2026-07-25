# Archive charter

## Purpose

Formagization preserves reviewable, reproducible formal artifacts produced
with material AI assistance. Its purpose is to make the evidence behind
formalization claims inspectable.

## Principles

1. **Evidence dimensions remain separate.** A passing kernel check is not a
   semantic review, novelty determination, publication decision, or
   reproduction.
2. **Statements come before tactics.** Every artifact documents the mapping
   from its informal source to formal definitions and theorem declarations.
3. **Environments are pinned.** Proof assistant, dependency revisions, and
   build commands are versioned with the source.
4. **AI assistance is disclosed.** Models are tools, not authors. Accountable
   human maintainers accept responsibility for submitted artifacts.
5. **Review is attributable.** Reviews identify their scope, reviewer,
   conflicts, date, artifact version, and evidence.
6. **Corrections are append-only.** Released artifacts and reviews are not
   silently replaced. Corrections receive a new version.
7. **Negative evidence is preserved.** Failed reproduction, disputes, and
   withdrawals remain visible with explanations.

## Scope

The archive accepts formal mathematical statements, proofs, counterexamples,
computational certificates with independently checkable verifiers, and
reusable formalization infrastructure. It is proof-assistant agnostic.

The archive does not treat a model transcript, natural-language proof, finite
experiment, or unreviewed translation as a formal proof.
