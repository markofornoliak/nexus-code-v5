# GitHub verification

This file records the repository-level verification path for NEXUS CODE v5.

The release source tree was reconstructed from the NEXUS CODE v4 baseline through a verified Git patch and accepted only after all of the following checks passed:

- 12 payload chunks matched their expected SHA-256 digests;
- the combined encoded payload matched its release checksum;
- the compressed patch matched its release checksum;
- the patch applied cleanly to the pinned v4 release commit;
- the reconstructed repository contained exactly 176 release files;
- the canonical source-tree digest matched the locally verified v5 tree.

The permanent GitHub Actions quality gate performs a clean npm installation, production dependency audit, TypeScript validation, ESLint validation, Prettier verification, Vitest execution, repository-subpath production build, and static end-to-end smoke checks.

The source release is verified when that complete quality gate passes. A public Pages release additionally requires a successful deployment and the post-deployment live-site smoke check.

Current state:

- source release: verified;
- 80 Vitest tests: passed;
- repository-subpath production build: passed;
- Pages artifact construction and upload: passed;
- GitHub Pages publishing source: activated on 2026-07-27;
- production Pages deployment: initiated by the activation-record merge to `main`.

Repository: `markofornoliak/nexus-code-v5`.

The duplicate-ID regression was corrected while preserving all released v4 identifiers. Temporary bootstrap, repair, and diagnostic workflows were removed; only the permanent least-privilege release workflows remain.
