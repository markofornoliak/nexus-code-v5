#!/usr/bin/env bash
set -euo pipefail

echo "[v5.1] Clone release branch"
gh auth setup-git
git clone --quiet --branch design-content-v51 "https://github.com/${GITHUB_REPOSITORY}.git" release
cd release

echo "[v5.1] Verify primary payload"
cat .v51-payload/part-* > /tmp/nexus-v51.patch.xz.b64
echo "db42e7e19e12d155b2a12ccb67b30266d789b54d1e5ec7ac05738d227bf2ed33  /tmp/nexus-v51.patch.xz.b64" | sha256sum -c -
base64 --decode /tmp/nexus-v51.patch.xz.b64 > /tmp/nexus-v51.patch.xz
echo "93d171ab35385c3e653a9d4339815a759e78b217a760b3dbdf5146b4e1dea896  /tmp/nexus-v51.patch.xz" | sha256sum -c -
xz -dc /tmp/nexus-v51.patch.xz > /tmp/nexus-v51.patch

python - <<'PY'
from pathlib import Path

skipped = {
    "README.md",
    "src/content/python/index.ts",
    "src/content/registry.test.ts",
    "src/lib/catalogSearch.test.ts",
    "src/pages/AtlasPage.test.tsx",
    "src/pages/LandingPage.tsx",
    "src/pages/ProjectsPage.tsx",
}
source = Path("/tmp/nexus-v51.patch").read_text()
blocks = source.split("diff -ruN ")
kept = []
for block in blocks[1:]:
    header = block.splitlines()[0]
    old_path = header.split(" ", 1)[0]
    prefix = "nexus_v5_publish/nexus-code-v5/"
    relative = old_path[len(prefix):] if old_path.startswith(prefix) else old_path
    if relative not in skipped:
        kept.append("diff -ruN " + block)
Path("/tmp/nexus-v51-filtered.patch").write_text("".join(kept))
print(f"[v5.1] Patch blocks: {len(kept)}; overlay files: {len(skipped)}")
PY

patch --batch --forward --fuzz=3 -p2 < /tmp/nexus-v51-filtered.patch > /tmp/patch.log

echo "[v5.1] Verify merged overlay"
cat .v51-overlay/part-* > /tmp/nexus-v51-overlay.tar.xz.b64
echo "d913eb0ca9aafc7219dfa9bba00300b9c4da200989dd3ac8a68bd956e5e174ef  /tmp/nexus-v51-overlay.tar.xz.b64" | sha256sum -c -
base64 --decode /tmp/nexus-v51-overlay.tar.xz.b64 > /tmp/nexus-v51-overlay.tar.xz
echo "99710ffc1a535de5a4af493bdd911231d4933876b9ee77429e14e321f15d533f  /tmp/nexus-v51-overlay.tar.xz" | sha256sum -c -
tar -xJf /tmp/nexus-v51-overlay.tar.xz -C .

echo "[v5.1] Install and format"
npm ci --silent
npm run format

echo "[v5.1] Validate curriculum"
npm run validate:content

echo "[v5.1] Commit source"
rm -rf .v51-payload .v51-overlay
rm -f .github/workflows/apply-v51-release.yml scripts/apply-v51-release.sh
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
git commit -m "Release NEXUS CODE v5.1 design and curriculum"
git push origin HEAD:design-content-v51
