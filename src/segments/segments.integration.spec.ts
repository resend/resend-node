/** biome-ignore-all lint/style/noNonNullAssertion: test code */
import type { Polly } from '@pollyjs/core';
import { Resend } from '../resend';
import { setupPolly } from '../test-utils/polly-setup';

describe('Segments Integration Tests', () => {
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
    it('creates a segment', async () => {
      const result = await resend.segments.create({
        name: 'Test Segment',
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.name).toBeTruthy();
      expect(result.data?.object).toBe('audience');
      const segmentId = result.data!.id;

      const removeResult = await resend.segments.remove(segmentId);
      expect(removeResult.data?.deleted).toBe(true);
    });

    it('handles validation errors', async () => {
      // @ts-expect-error: Testing invalid input
      const result = await resend.segments.create({});

      expect(result.error?.name).toBe('missing_required_field');
    });
  });

  // Needs to be run with an account that can have multiple segments
  describe.todo('list', () => {
    it('lists segments without pagination', async () => {
      const segmentIds: string[] = [];

      try {
        for (let i = 0; i < 6; i++) {
          const createResult = await resend.segments.create({
            name: `Test segment ${i} for listing`,
          });

          expect(createResult.data?.id).toBeTruthy();
          segmentIds.push(createResult.data!.id);
        }

        const result = await resend.segments.list();

        expect(result.data?.object).toBe('list');
        expect(result.data?.data.length).toBeGreaterThanOrEqual(6);
        expect(result.data?.has_more).toBe(false);
      } finally {
        for (const id of segmentIds) {
          const removeResult = await resend.segments.remove(id);
          expect(removeResult.data?.deleted).toBe(true);
        }
      }
    });

    it('lists segments with limit', async () => {
      const segmentIds: string[] = [];

      try {
        for (let i = 0; i < 6; i++) {
          const createResult = await resend.segments.create({
            name: `Test segment ${i} for listing with limit`,
          });

          expect(createResult.data?.id).toBeTruthy();
          segmentIds.push(createResult.data!.id);
        }

        const result = await resend.segments.list({ limit: 5 });

        expect(result.data?.data.length).toBe(5);
        expect(result.data?.has_more).toBe(true);
      } finally {
        for (const id of segmentIds) {
          const removeResult = await resend.segments.remove(id);
          expect(removeResult.data?.deleted).toBe(true);
        }
      }
    });
  });

  describe('get', () => {
    it('retrieves a segment by id', async () => {
      const createResult = await resend.segments.create({
        name: 'Test Segment for Get',
      });

      expect(createResult.data?.id).toBeTruthy();
      const segmentId = createResult.data!.id;

      try {
        const getResult = await resend.segments.get(segmentId);

        expect(getResult.data?.id).toBe(segmentId);
        expect(getResult.data?.name).toBe('Test Segment for Get');
        expect(getResult.data?.object).toBe('audience');
      } finally {
        const removeResult = await resend.segments.remove(segmentId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('returns error for non-existent segment', async () => {
      const result = await resend.segments.get(
        '00000000-0000-0000-0000-000000000000',
      );

      expect(result.error?.name).toBe('not_found');
    });
  });

  describe('remove', () => {
    it('removes a segment', async () => {
      const createResult = await resend.segments.create({
        name: 'Test Segment to Remove',
      });

      expect(createResult.data?.id).toBeTruthy();
      const segmentId = createResult.data!.id;

      const removeResult = await resend.segments.remove(segmentId);

      expect(removeResult.data?.deleted).toBe(true);

      const getResult = await resend.segments.get(segmentId);
      expect(getResult.error?.name).toBe('not_found');
    });

    it('appears to remove a segment that never existed', async () => {
      const result = await resend.segments.remove(
        '00000000-0000-0000-0000-000000000000',
      );

      expect(result.data?.deleted).toBe(true);
    });
  });
});
