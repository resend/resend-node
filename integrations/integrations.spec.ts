import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

describe('integrations', () => {
  const sdkPath = path.resolve(__dirname, '..');

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

  /**
   * Create an extra temporary copy of the given integration so that there's `@react-email/render` module resolution from ../node_modules
   *
   * Also modifies the package.json to point to the SDK with an absolute path.
   */
  async function prepareTemporaryIntegrationCopy(integrationPath: string) {
    const temporaryIntegrationDir = await fs.promises.mkdtempDisposable(
      `resend-node-integration-${path.basename(integrationPath)}`,
    );
    await fs.promises.cp(
      path.resolve(__dirname, integrationPath),
      temporaryIntegrationDir.path,
      {
        recursive: true,
      },
    );

    const testingLockPackageJson: { dependencies: Record<string, string> } =
      JSON.parse(
        await fs.promises.readFile(
          path.resolve(temporaryIntegrationDir.path, 'package.json'),
          'utf8',
        ),
      );
    testingLockPackageJson.dependencies.resend = sdkPath;
    await fs.promises.writeFile(
      path.resolve(temporaryIntegrationDir.path, 'package.json'),
      JSON.stringify(testingLockPackageJson, null, 2),
    );

    return temporaryIntegrationDir;
  }

  test('nextjs', { timeout: 30_000 }, async () => {
    const temporaryNextApp = await prepareTemporaryIntegrationCopy('./nextjs');

    const buildInstall = spawnSync(
      'npm install --install-links && npm run build',
      {
        stdio: 'inherit',
        cwd: temporaryNextApp.path,
        shell: true,
      },
    );
    temporaryNextApp.remove();
    if (buildInstall.status !== 0) {
      throw new Error('next.js build failed');
    }
  });

  test('esbuild', { timeout: 30_000 }, async () => {
    const temporaryEsbuildApp =
      await prepareTemporaryIntegrationCopy('./esbuild');

    const buildInstall = spawnSync(
      'npm install --install-links && npm run build',
      {
        stdio: 'inherit',
        cwd: temporaryEsbuildApp.path,
        shell: true,
      },
    );
    temporaryEsbuildApp.remove();
    if (buildInstall.status !== 0) {
      throw new Error('esbuild build failed');
    }
  });
});
