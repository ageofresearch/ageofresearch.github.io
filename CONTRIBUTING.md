# Contributing

Contributions are welcome from mathematicians, formal-methods researchers, and
AI-assisted formalization teams.

## Required artifact layout

Create `formalizations/<stable-id>/` containing:

- `README.md`;
- `metadata.json` conforming to `registry/artifact.schema.json`;
- `STATEMENT_MAPPING.md`;
- `PROOF_OVERVIEW.md`;
- `REPRODUCIBILITY.md`;
- `AI_DISCLOSURE.md`;
- `CHANGELOG.md`;
- `CITATION.cff`;
- `references.bib`;
- a `reviews/` directory;
- one or more self-contained proof-assistant project directories.

Add a matching entry to `registry/artifacts.json`.

## Admission requirements

Every submitted artifact must:

1. identify the exact informal source and preserve a URL, version, date, and
   hash when legally and technically possible;
2. state all public theorem declarations in plain mathematical language;
3. pin its proof assistant and dependencies;
4. provide a clean-machine build command;
5. contain no `sorry`, `admit`, or equivalent unchecked placeholder;
6. disclose axioms and the trusted computing base;
7. disclose AI provider, model, interface, dates, and scope of assistance;
8. identify an accountable human maintainer;
9. record semantic, formal-methods, subject-matter, novelty, and independent
   reproduction status separately;
10. use a license compatible with public review and redistribution;
11. add or extend an artifact-specific CI workflow that checks the complete
    public project in a clean, pinned environment.

## Pull requests

Pull requests should modify one artifact at a time unless they change archive
infrastructure. Include:

- the mathematical motivation;
- the exact evidence dimensions affected;
- the commands run;
- any change to theorem statements or assumptions;
- any conflicts of interest.

Do not describe an artifact as simply “verified.” Name the exact evidence:
for example, “Lean build passed at commit …” or “semantic alignment reviewed by
…”.

## Generated and private material

Do not commit dependency caches, compiled proof objects that can be recreated,
API keys, private conversations, hidden model traces, or source material that
cannot legally be redistributed.
