// scripts/tegami.mts — Tegami versioning + publishing config.
//
// Run via `pnpm tegami` (see the "tegami" script in package.json). Requires
// Node.js 24+. Docs: https://tegami.fuma-nama.dev
import { tegami } from 'tegami';
import { createCli } from 'tegami/cli';
import { github } from 'tegami/plugins/github';

const paper = tegami({
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
      versionPr: {
        base: 'main',
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
          return { title: version ? `chore: release ${version}` : 'chore: release' };
        },
      },
    }),
  ],
});
void createCli(paper).parseAsync();

