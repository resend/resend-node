import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { build } from 'esbuild';

describe('integrations', () => {
  beforeAll(() => {
    const build = spawnSync('pnpm build', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      shell: true,
    });
    if (build.status !== 0) {
      throw new Error('SDK build failed');
    }
  });

  test.sequential('nextjs', { timeout: 20_000 }, () => {
    const build = spawnSync('pnpm integration:nextjs', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      shell: true,
    });
    if (build.status !== 0) {
      throw new Error('next.js build failed');
    }
  });

  test.sequential('esbuild', async () => {
    const result = await build({
      entryPoints: [path.resolve(__dirname, './esbuild/index.ts')],
      outfile: path.resolve(__dirname, './esbuild/index.js'),
      bundle: true,
      write: true,
      platform: 'node',
      format: 'esm',
    });
    expect(result.errors, 'There should be no errors').toEqual([]);
  });
});
