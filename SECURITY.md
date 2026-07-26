# Security policy

Do not report ordinary proof errors as security vulnerabilities; open a public
issue for those. Use
[GitHub private vulnerability reporting](https://github.com/ageofresearch/formagization/security/advisories/new)
for leaked credentials, malicious build scripts, dependency compromise, or
code execution beyond the documented verification process. Do not put secrets
or exploit details in a public issue.

Artifacts must build on GitHub-hosted runners with read-only repository
permissions. Workflows may not use secrets for pull requests, self-hosted
runners for untrusted contributions, or `pull_request_target`.
