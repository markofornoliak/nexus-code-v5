# GitHub verification

This file records the repository-level verification path for NEXUS CODE v5.

The release source tree was reconstructed from the NEXUS CODE v4 baseline through a binary Git patch and accepted only after all of the following checks passed:

- 12 payload chunks matched their expected SHA-256 digests;
- the combined encoded payload matched its release checksum;
- the compressed patch matched its release checksum;
- the patch applied cleanly to the pinned v4 release commit;
- the reconstructed repository contained exactly 176 release files;
- the canonical source-tree digest matched the locally verified v5 tree.

The permanent GitHub Actions quality gate performs a clean npm installation, production dependency audit, TypeScript validation, ESLint validation, Prettier verification, Vitest execution, repository-subpath production build, and static end-to-end smoke checks.

A release is considered verified only when the GitHub Actions quality-gate pull request passes and the GitHub Pages deployment succeeds from the resulting `main` commit.

Repository: `markofornoliak/nexus-code-v5`.
