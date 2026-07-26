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

## Aristotle workspace

The page at <https://ageofresearch.github.io/aristotle/> accepts either a
plain-text mathematical request or one standalone official ChatGPT Share
link. After a standalone link is pasted, **Test of link** reads the public
conversation and replaces the request field with conversation-only `PERSON:`
and `LLM:` turns; text that merely contains a link is left unchanged. The
Aristotle key is never sent during conversation import, and an untested raw
Share link is blocked at submission.

During the Aristotle relay deployment, pin validation to the intended
production origin so the placeholder cannot pass:

```bash
EXPECTED_ARISTOTLE_PROXY_URL=https://example.chatgpt.site node scripts/validate-site.mjs
```

The configured relay must be an HTTPS `*.chatgpt.site` origin. The undeployed
placeholder is accepted only when `EXPECTED_ARISTOTLE_PROXY_URL` is unset.
