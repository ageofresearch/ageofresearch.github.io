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
link. A standalone link changes the primary action to **Send Link**. That
first action imports conversation-only `PERSON:` and `LLM:` turns, locks the
request field while preserving its internal scroll, and returns the action to
**Submit to Aristotle**. Plain text remains editable, and text that merely
contains a link is left unchanged. Transient reader and network failures are
retried automatically while the loading animation remains active. The
Aristotle key is never sent during conversation import.

Every final run is archived under [`submissions/`](submissions/). Exact
`COMPLETE` tasks go to `submissions/successes/`; final `FAILED` and `CANCELED`
tasks go to `submissions/failures/`. Each record contains normalized metadata,
the exact submitted prompt or imported conversation, sanitized status and
archival logs, and the Aristotle `.tar.gz` result when available. Credentials
are excluded.

`COMPLETE_WITH_ERRORS` and `OUT_OF_BUDGET` are treated as resumable
checkpoints rather than final archive states. While the browser tab remains
open, the workspace automatically sends an `INSTRUCT` continuation to the
same Aristotle project, retains the continuation count in tab-scoped storage,
and keeps polling even when the tab is in the background (subject to browser
throttling). Users can pause automatic continuation or retry a checkpoint
manually. Each follow-up consumes the user’s Aristotle quota. Exact `COMPLETE`,
`FAILED`, and `CANCELED` states end the workflow.

The page at <https://ageofresearch.github.io/aristotle/successes/> reads only
the append-oriented success index. Failure records remain public in GitHub for
diagnosis, but are never included in that webpage.

During the Aristotle relay deployment, pin validation to the intended
production origin so the placeholder cannot pass:

```bash
EXPECTED_ARISTOTLE_PROXY_URL=https://example.chatgpt.site node scripts/validate-site.mjs
```

The configured relay must be an HTTPS `*.chatgpt.site` origin. The undeployed
placeholder is accepted only when `EXPECTED_ARISTOTLE_PROXY_URL` is unset.
