#!/usr/bin/env bash
# Pull, build and publish the announcement gate on the VPS.
# Run from anywhere inside the repo checkout:  bash scripts/deploy.sh
# Override the publish folder with WEB_ROOT=/path bash scripts/deploy.sh
set -euo pipefail

WEB_ROOT="${WEB_ROOT:-/var/www/congthongtin-announcement-gate}"
BRANCH="${BRANCH:-main}"

cd "$(dirname "$0")/.."

if [ ! -d "$WEB_ROOT" ]; then
  echo "Publish folder $WEB_ROOT does not exist. Set WEB_ROOT to the folder nginx serves." >&2
  exit 1
fi

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "This checkout has local changes; refusing to pull over them:" >&2
  git status --short --untracked-files=no >&2
  exit 1
fi

echo "==> Pulling $BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"
git log -1 --oneline

echo "==> Installing dependencies"
npm ci

# Builds into dist/ and fails if the map worker is missing (scripts/verify-map-build.mjs).
echo "==> Building"
npm run build

echo "==> Publishing to $WEB_ROOT"
if [ -f "$WEB_ROOT/index.html" ]; then
  cp "$WEB_ROOT/index.html" "$WEB_ROOT/index.html.bak"
fi

# Assets first, keeping old hashed files so already-open tabs can still load their chunks.
mkdir -p "$WEB_ROOT/assets"
cp -r dist/assets/. "$WEB_ROOT/assets/"

# Remaining top-level files (public/ contents), index.html last so it only
# points at assets that are already in place.
find dist -mindepth 1 -maxdepth 1 ! -name assets ! -name index.html -exec cp -r {} "$WEB_ROOT/" \;
cp dist/index.html "$WEB_ROOT/index.html"

echo "==> Done. Deployed $(git rev-parse --short HEAD)."
echo "Roll back with: cp $WEB_ROOT/index.html.bak $WEB_ROOT/index.html"
