// scripts/preview-version.mjs — compute the version for a preview build.
//
// Preview builds (see the "preview" job in .github/workflows/release.yml) are
// published outside the tegami release train: nothing is committed, so the
// version is derived entirely from what already exists:
//
//   <base>-<branch>.<N>   e.g. 6.19.0-preview-widgets.0
//
//   - base: the branch's package.json version bumped by the largest bump
//     declared in the pending .tegami/*.md changesets — the same changesets
//     that will produce the real release when the branch merges to canary.
//   - N: one past the highest such build already on npm. The registry is the
//     counter state; a stale read can't double-publish (npm rejects
//     duplicate versions).
//
// Prints the version to stdout. Throws if there is no changeset: a preview
// branch must declare its bump (and its eventual release notes) before
// cutting builds.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';

const branch = process.env.GITHUB_REF_NAME;
if (!branch?.startsWith('preview-')) {
  throw new Error(`Preview builds only run on preview-* branches, got: ${branch}`);
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

const RANK = { patch: 1, minor: 2, major: 3 };
let bump;
for (const file of readdirSync('.tegami')) {
  if (!file.endsWith('.md')) continue;
  const text = readFileSync(`.tegami/${file}`, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  for (const [, found] of frontmatter.matchAll(/\b(patch|minor|major)\b/g)) {
    if (!bump || RANK[found] > RANK[bump]) bump = found;
  }
}
if (!bump) {
  throw new Error(
    'No changeset found — add a .tegami/*.md changeset declaring the bump before cutting a preview build.',
  );
}

const [major, minor, patch] = pkg.version.split('-')[0].split('.').map(Number);
const base =
  bump === 'major'
    ? `${major + 1}.0.0`
    : bump === 'minor'
      ? `${major}.${minor + 1}.0`
      : `${major}.${minor}.${patch + 1}`;

let published = [];
try {
  const out = execFileSync('npm', ['view', pkg.name, 'versions', '--json'], {
    encoding: 'utf8',
  });
  published = JSON.parse(out);
  if (!Array.isArray(published)) published = [published];
} catch (error) {
  // Unpublished package = no prior builds; anything else (network, auth) must
  // surface rather than silently restart the counter at .0.
  if (!`${error.stdout}${error.stderr}`.includes('E404')) throw error;
}

const prefix = `${base}-${branch}.`;
const next =
  published
    .filter((v) => v.startsWith(prefix))
    .map((v) => Number(v.slice(prefix.length)))
    .filter(Number.isInteger)
    .reduce((max, n) => Math.max(max, n), -1) + 1;

console.log(`${prefix}${next}`);
