# Pages live verification

The repository includes a permanent GitHub Actions smoke test for the published NEXUS CODE v5 application. It verifies the live HTML response, v5 metadata, repository-subpath asset references, and successful delivery of the emitted JavaScript and CSS bundles.

A controlled repair deployment is also validated through the repository's `github-pages` environment.
The repair workflow now attempts to enable the workflow-based Pages source through the authenticated GitHub API before deployment.
