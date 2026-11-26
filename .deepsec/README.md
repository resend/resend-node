# deepsec

This directory holds the [deepsec](https://www.npmjs.com/package/deepsec)
config for the parent repo. Checked into git so teammates inherit
project context (auth shape, threat model, custom matchers); generated
scan output is gitignored.

Currently configured project: `resend-node` (target: `..`).

## Setup

This workspace was scaffolded with `deepsec init --scaffold-only`. To set
it up on your machine, run from this directory:

```bash
pnpm install
pnpm deepsec setup
```

`setup` links a Vercel project, probes Sandbox and model access,
inventories the codebase's surfaces, runs coverage-guided scans, generates
matchers where coverage has gaps, and starts the first AI processing run.
Setup calls the AI model, and the processing run is where most of the cost
is; pass `--max-cost-usd <n>` to cap that run. Setup is resumable:
checkpoints in `data/resend-node/setup/setup-state.json` skip completed
work, so run it again if it is interrupted. The linked Vercel project is
always in Sandbox scope.

Run deepsec as `pnpm deepsec` from this directory. That uses the version
pinned in `package.json` and `pnpm-lock.yaml`. From the repository root,
`npx deepsec` downloads and runs the latest release instead.

Use `--model-auth direct --ai-provider <provider>
--ai-api-key-env <ENV_NAME>` to use a user-owned model credential; secret
values remain in the environment or `.env.local`. Use `--model-auth local`
to rely on a machine-wide `claude`/`codex` login instead — no API key or
env vars needed.

## Daily commands

```bash
pnpm deepsec scan
pnpm deepsec process     --concurrency 5
pnpm deepsec revalidate  --concurrency 5                  # cuts FP rate
pnpm deepsec export      --format md-dir --out ./findings
```

`--project-id` is auto-resolved while there's only one project in
`deepsec.config.ts`. Once you've added a second project, pass
`--project-id resend-node` (or whichever id you want) explicitly.

`scan` is free (regex only). `process` is the AI stage (≈$0.30/file
on Opus by default). Run state goes to `data/resend-node/`.

## Credentials in the Git remote

When deepsec creates `data/resend-node/project.json`, it copies the
`origin` remote URL into the `githubUrl` field, and `deepsec export` uses
that URL in every finding's link. If the remote URL embeds a token, as in
some CI and agent environments, the token ends up in both. Before you
export or share findings from such an environment, set `githubUrl` in
`project.json` to `https://github.com/resend/resend-node/blob/canary`.

## Adding another project

To scan another codebase from this same `.deepsec/`:

```bash
pnpm deepsec init-project ../some-other-package   # path relative to .deepsec/
```

Appends an entry to `deepsec.config.ts` and writes
`data/<id>/{INFO.md,SETUP.md,project.json}`. Open the new SETUP.md
in your agent to fill in INFO.md.

## Layout

```
deepsec.config.ts        Project list (one entry per scanned repo)
data/resend-node/
  INFO.md                Repo context — checked into git, hand-curated
  project.json           Generated (gitignored)
  files/                 One JSON per scanned source file (gitignored)
  runs/                  Run metadata (gitignored)
  reports/               Generated markdown reports (gitignored)
AGENTS.md                Pointer for coding agents
.env.local               Tokens (gitignored)
```

## Docs

After `pnpm install`:

- Skill: `node_modules/deepsec/SKILL.md`
- Full docs: `node_modules/deepsec/dist/docs/{getting-started,configuration,models,writing-matchers,plugins,architecture,data-layout,vercel-setup,faq}.md`

Or browse on
[GitHub](https://github.com/vercel/deepsec/tree/main/docs).
