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
   * Create an extra temporary copy of the given integration so that there's @react-email/render module resolution from ../node_modules
   *
   * Also modifies the package.json to point to the SDK with an absolute path.
   */
  async function prepareTemporaryIntegrationCopy(integrationPath: string) {
    const temporaryIntegrationPath = path.resolve(
      os.tmpdir(),
      `resend-node-integration-${path.basename(integrationPath)}`,
    );
    if (fs.existsSync(temporaryIntegrationPath)) {
      await fs.promises.rm(temporaryIntegrationPath, {
        recursive: true,
        force: true,
      });
    }
    await fs.promises.mkdir(temporaryIntegrationPath, { recursive: true });
    await fs.promises.cp(
      path.resolve(__dirname, integrationPath),
      temporaryIntegrationPath,
      {
        recursive: true,
      },
    );

    const testingLockPackageJson: { dependencies: Record<string, string> } =
      JSON.parse(
        await fs.promises.readFile(
          path.resolve(temporaryIntegrationPath, 'package.json'),
          'utf8',
        ),
      );
    testingLockPackageJson.dependencies.resend = sdkPath;
    await fs.promises.writeFile(
      path.resolve(temporaryIntegrationPath, 'package.json'),
      JSON.stringify(testingLockPackageJson, null, 2),
    );

    return temporaryIntegrationPath;
  }

  test('nextjs', { timeout: 30_000 }, async () => {
    const temporaryNextApp = await prepareTemporaryIntegrationCopy('./nextjs');

    const buildInstall = spawnSync(
      'npm install --install-links && npm run build',
      {
        stdio: 'inherit',
        cwd: temporaryNextApp,
        shell: true,
      },
    );
    if (buildInstall.status !== 0) {
      throw new Error('next.js build failed');
    }
  });

  test('esbuild', { timeout: 30_000 }, async () => {
    const temporaryIntegration =
      await prepareTemporaryIntegrationCopy('./esbuild');

    const buildInstall = spawnSync(
      'npm install --install-links && npm run build',
      {
        stdio: 'inherit',
        cwd: temporaryIntegration,
        shell: true,
      },
    );
    if (buildInstall.status !== 0) {
      throw new Error('next.js build failed');
    }
  });
});
