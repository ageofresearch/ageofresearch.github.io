# ageofresearch.github.io

This repository is the account-level publishing mirror for
[Formagization](https://github.com/ageofresearch/formagization), a
Lean-first archive of reproducible, evidence-graded formal mathematics.

The public site is available at:

<https://ageofresearch.github.io>

## Source of record

The canonical mathematical formalizations, evidence records, review state,
and project governance remain in the
[`ageofresearch/formagization`](https://github.com/ageofresearch/formagization)
repository. This mirror retains the imported project history for provenance,
while its GitHub Pages workflow publishes the root-domain presentation layer
from `site/`.

## Local validation

```bash
node scripts/test-aristotle.mjs
node scripts/validate-site.mjs
```

The GitHub Pages workflow validates the site before every production
deployment.

During the Aristotle relay deployment, pin validation to the intended
production origin so the placeholder cannot pass:

```bash
EXPECTED_ARISTOTLE_PROXY_URL=https://example.chatgpt.site node scripts/validate-site.mjs
```

The configured relay must be an HTTPS `*.chatgpt.site` origin. The undeployed
placeholder is accepted only when `EXPECTED_ARISTOTLE_PROXY_URL` is unset.
