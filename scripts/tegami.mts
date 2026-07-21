// scripts/tegami.mts — Tegami versioning + publishing config.
//
// Run via `pnpm tegami` (see the "tegami" script in package.json). Requires
// Node.js 24+. Docs: https://tegami.fuma-nama.dev
import { tegami } from 'tegami';
import { createCli } from 'tegami/cli';
import { github } from 'tegami/plugins/github';

// The branch this run versions for. In CI this is the branch that triggered
// the workflow (canary or a preview-* branch); locally it falls back to
// canary.
const releaseBranch = process.env.GITHUB_REF_NAME ?? 'canary';

const paper = tegami({
  packages: {
    resend: {
      prerelease: 'preview-test',
    },
  },
  npm: {
    client: 'pnpm',
    // npm trusted publishing (OIDC) — no NPM_TOKEN secret needed. This only
    // takes effect once a trusted publisher is configured for the "resend"
    // package on npmjs.com, pointing at this exact workflow file
    // (.github/workflows/release.yml) in resend/resend-node.
    // https://docs.npmjs.com/trusted-publishers
    trustedPublish: {
      provider: 'github',
      workflow: 'release.yml',
    },
  },
  plugins: [
    github({
      repo: 'resend/resend-node',
      release: {
        // Default title is `formatPackageVersion(name, version, distTag)`
        // (e.g. "resend@6.17.0"), independent of the `git.tag` override
        // below. Reuse `tag` so the release title and its tag/URL match.
        create({ tag }) {
          return { title: tag };
        },
      },
      versionPr: {
        // Versioning happens per release branch (version.yml): the Version
        // Packages PR targets whichever branch triggered the run — canary or
        // a preview-* branch — with the bumped versions and the publish lock.
        // Publishing happens in release.yml: prereleases straight from their
        // own branch, stable versions from main once canary is promoted.
        //
        // To enter prerelease mode, add to the tegami() options above:
        //   packages: { resend: { prerelease: 'canary' } }
        // Bumps then produce x.y.z-canary.N under the "canary" npm dist-tag
        // (the dist-tag defaults to the prerelease name). Removing it
        // graduates the next release back to a stable version, replaying the
        // changelogs consumed during the prerelease cycle.
        //
        // Single-feature betas use the same mechanism on their own branch:
        // create preview-<feature> from canary and set
        //   packages: { resend: { prerelease: 'preview-<feature>' } }
        // there. Releases become x.y.z-preview-<feature>.N under the
        // "preview-<feature>" dist-tag, leaving canary and latest untouched.
        base: releaseBranch,
        // Head branch per release branch, so concurrent lines (canary plus a
        // preview) don't fight over a single tegami/version-packages branch.
        branch: `tegami/version-packages-${releaseBranch}`,
        // Put the release version in the Version Packages PR title (e.g.
        // "chore: release 6.17.0"), matching this repo's existing release
        // commit convention and its PR title check.
        //
        // Must be a method (not an arrow) so `this` binds to the
        // TegamiContext. `create` runs after the draft is applied, so the
        // graph already holds the bumped version — do not re-derive it with
        // bumpVersion(), which would double-count the bump.
        create() {
          const version = this.graph.get('npm:resend')?.version;
          return {
            title: version ? `chore: release ${version}` : 'chore: release',
          };
        },
      },
    }),
    {
      name: 'git-tag-format',
      // The github plugin's git tags default to `resend@6.17.0`. This repo
      // only ever publishes the one package, so drop that prefix and tag
      // `v6.17.0` instead, matching this repo's pre-Tegami tags. Runs after
      // the (enforce: "pre") git plugin's own `initPublishPlan`, which is
      // what sets `git.tag` in the first place.
      initPublishPlan({ plan }) {
        for (const [id, packagePlan] of plan.packages) {
          const version = this.graph.get(id)?.version;
          if (version)
            packagePlan.git = { ...packagePlan.git, tag: `v${version}` };
        }
      },
    },
  ],
});
void createCli(paper).parseAsync();
