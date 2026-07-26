# ageofresearch.github.io

This repository publishes the account-level website for
[Formagization](https://github.com/ageofresearch/formagization), a
Lean-first archive of reproducible, evidence-graded formal mathematics.

The public site is available at:

<https://ageofresearch.github.io>

## Source of record

The mathematical formalizations, evidence records, review state, and project
governance remain in the
[`ageofresearch/formagization`](https://github.com/ageofresearch/formagization)
repository. This repository contains only the static presentation layer and
its deployment automation.

## Local validation

```bash
node scripts/validate-site.mjs
```

The GitHub Pages workflow validates the site before every production
deployment.
