# Reviewing an artifact

Review is divided into independent scopes. One reviewer may cover more than one
scope, but every report must say which scope it addresses.

## 1. Reproduction review

- Build from a clean checkout.
- Confirm the documented toolchain and dependency revisions.
- Record operating system, commands, elapsed time, commit, and result.
- Confirm that generated dependencies and caches are not required in the
  submitted archive.

## 2. Kernel and trusted-base review

- Confirm the public declarations compile.
- Inspect the axiom report.
- Search for placeholders, unsafe declarations, local axioms, and opaque
  external certificates.
- Describe the trusted computing base rather than saying only “verified.”

## 3. Semantic-alignment review

- Compare quantifier order, domains, hypotheses, definitions, edge cases, and
  conclusions against the cited source.
- Check that formal encodings do not silently strengthen hypotheses or weaken
  conclusions.
- Review coercions, indexing conventions, empty objects, and division by zero.

## 4. Subject-matter review

- Assess whether the formal statement captures the intended mathematics.
- Review imported mathematical facts and major proof reductions.
- Identify missing cases or unintentionally adjacent results.

## 5. Novelty review

- Search relevant literature and formal libraries.
- Distinguish novelty of the theorem, proof, formal encoding, and library
  infrastructure.
- A missing prior result is not evidence of novelty.

## Review records

Add append-only Markdown reports to the artifact's `reviews/` directory. Each
report must state:

- reviewer name and optional ORCID;
- affiliation, role, and conflicts of interest;
- artifact version and commit;
- review scope;
- methods and commands;
- findings and limitations;
- date and signature method.
