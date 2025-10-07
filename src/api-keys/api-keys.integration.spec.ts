/** biome-ignore-all lint/style/noNonNullAssertion: test code */
import type { Polly } from '@pollyjs/core';
import { Resend } from '../resend';
import { setupPolly } from '../test-utils/polly-setup';

describe('API Keys Integration Tests', () => {
  let polly: Polly;
  let resend: Resend;

  beforeEach(() => {
    polly = setupPolly();
    resend = new Resend(process.env.RESEND_API_KEY || 're_fake_key');
  });

  afterEach(async () => {
    await polly.stop();
  });

  describe('create', () => {
    it('creates an API key with full access', async () => {
      const result = await resend.apiKeys.create({
        name: 'Integration Test Key',
        permission: 'full_access',
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.token).toBeTruthy();
      const keyId = result.data!.id;

      const removeResult = await resend.apiKeys.remove(keyId);
      expect(removeResult.data).toBeTruthy();
    });

    it('creates an API key with sending access', async () => {
      const result = await resend.apiKeys.create({
        name: 'Integration Test Sending Key',
        permission: 'sending_access',
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.token).toBeTruthy();
      const keyId = result.data!.id;

      const removeResult = await resend.apiKeys.remove(keyId);
      expect(removeResult.data).toBeTruthy();
    });

    it('allows creating an API key with an empty name', async () => {
      const result = await resend.apiKeys.create({
        name: '',
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.token).toBeTruthy();
      const keyId = result.data!.id;

      const removeResult = await resend.apiKeys.remove(keyId);
      expect(removeResult.data).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('removes an API key', async () => {
      const createResult = await resend.apiKeys.create({
        name: 'Integration Test Key to Remove',
      });

      expect(createResult.data?.id).toBeTruthy();
      const keyId = createResult.data!.id;

      const removeResult = await resend.apiKeys.remove(keyId);

      expect(removeResult.data).toBeTruthy();
    });

    it('returns error for non-existent API key', async () => {
      const result = await resend.apiKeys.remove(
        '00000000-0000-0000-0000-000000000000',
      );

      expect(result.error?.name).toBe('not_found');
    });
  });
});
