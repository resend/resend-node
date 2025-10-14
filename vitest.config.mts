import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['vitest.setup.mts'],

    /**
     * When recording API responses on a rate-limited account, it's useful to
     * add a timeout within `Resend.fetchRequest` and uncomment the following:
     */
    // testTimeout: 30_000,
    // poolOptions: {
    //   forks: { singleFork: true },
    // },
  },
});
