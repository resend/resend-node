/** biome-ignore-all lint/style/noNonNullAssertion: test code */
import type { Polly } from '@pollyjs/core';
import { Resend } from '../resend';
import { setupPolly } from '../test-utils/polly-setup';

describe('Audiences Integration Tests', () => {
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
    it('creates an audience', async () => {
      const result = await resend.audiences.create({
        name: 'Test Audience',
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.name).toBeTruthy();
      expect(result.data?.object).toBe('audience');
      const audienceId = result.data!.id;

      const removeResult = await resend.audiences.remove(audienceId);
      expect(removeResult.data?.deleted).toBe(true);
    });

    it('handles validation errors', async () => {
      // @ts-expect-error: Testing invalid input
      const result = await resend.audiences.create({});

      expect(result.error?.name).toBe('missing_required_field');
    });
  });

  // Needs to be run with an account that can have multiple audiences
  describe.todo('list', () => {
    it('lists audiences without pagination', async () => {
      const audienceIds: string[] = [];

      try {
        for (let i = 0; i < 6; i++) {
          const createResult = await resend.audiences.create({
            name: `Test audience ${i} for listing`,
          });

          expect(createResult.data?.id).toBeTruthy();
          audienceIds.push(createResult.data!.id);
        }

        const result = await resend.audiences.list();

        expect(result.data?.object).toBe('list');
        expect(result.data?.data.length).toBeGreaterThanOrEqual(6);
        expect(result.data?.has_more).toBe(false);
      } finally {
        for (const id of audienceIds) {
          const removeResult = await resend.audiences.remove(id);
          expect(removeResult.data?.deleted).toBe(true);
        }
      }
    });

    it('lists audiences with limit', async () => {
      const audienceIds: string[] = [];

      try {
        for (let i = 0; i < 6; i++) {
          const createResult = await resend.audiences.create({
            name: `Test audience ${i} for listing with limit`,
          });

          expect(createResult.data?.id).toBeTruthy();
          audienceIds.push(createResult.data!.id);
        }

        const result = await resend.audiences.list({ limit: 5 });

        expect(result.data?.data.length).toBe(5);
        expect(result.data?.has_more).toBe(true);
      } finally {
        for (const id of audienceIds) {
          const removeResult = await resend.audiences.remove(id);
          expect(removeResult.data?.deleted).toBe(true);
        }
      }
    });
  });

  describe('get', () => {
    it('retrieves an audience by id', async () => {
      const createResult = await resend.audiences.create({
        name: 'Test Audience for Get',
      });

      expect(createResult.data?.id).toBeTruthy();
      const audienceId = createResult.data!.id;

      try {
        const getResult = await resend.audiences.get(audienceId);

        expect(getResult.data?.id).toBe(audienceId);
        expect(getResult.data?.name).toBe('Test Audience for Get');
        expect(getResult.data?.object).toBe('audience');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('returns error for non-existent audience', async () => {
      const result = await resend.audiences.get(
        '00000000-0000-0000-0000-000000000000',
      );

      expect(result.error?.name).toBe('not_found');
    });
  });

  describe('remove', () => {
    it('removes an audience', async () => {
      const createResult = await resend.audiences.create({
        name: 'Test Audience to Remove',
      });

      expect(createResult.data?.id).toBeTruthy();
      const audienceId = createResult.data!.id;

      const removeResult = await resend.audiences.remove(audienceId);

      expect(removeResult.data?.deleted).toBe(true);

      const getResult = await resend.audiences.get(audienceId);
      expect(getResult.error?.name).toBe('not_found');
    });

    it('appears to remove an audience that never existed', async () => {
      const result = await resend.audiences.remove(
        '00000000-0000-0000-0000-000000000000',
      );

      expect(result.data?.deleted).toBe(true);
    });
  });
});
