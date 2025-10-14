/** biome-ignore-all lint/style/noNonNullAssertion: test code */
import type { Polly } from '@pollyjs/core';
import { Resend } from '../resend';
import { setupPolly } from '../test-utils/polly-setup';

describe('Contacts Integration Tests', () => {
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
    it('creates a contact', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for contact creation',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const result = await resend.contacts.create({
          email: 'test@example.com',
          audienceId,
          firstName: 'Test',
          lastName: 'User',
        });

        expect(result.data?.id).toBeTruthy();
        expect(result.data?.object).toBe('contact');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('handles validation errors', async () => {
      // @ts-expect-error: Testing invalid input
      const result = await resend.contacts.create({});
      console.log(result);

      expect(result.error?.name).toBe('validation_error');
    });
  });

  describe('list', () => {
    it('lists contacts without pagination', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for listing',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        for (let i = 0; i < 6; i++) {
          await resend.contacts.create({
            audienceId,
            email: `test.${i}@example.com`,
          });
        }

        const result = await resend.contacts.list({ audienceId });

        expect(result.data?.object).toBe('list');
        expect(result.data?.data.length).toBe(6);
        expect(result.data?.has_more).toBe(false);
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('lists contacts with limit', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for listing with limit',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        for (let i = 0; i < 6; i++) {
          await resend.contacts.create({
            audienceId,
            email: `test.${i}@example.com`,
          });
        }

        const result = await resend.contacts.list({ audienceId, limit: 5 });

        expect(result.data?.data.length).toBe(5);
        expect(result.data?.has_more).toBe(true);
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });
  });

  describe('get', () => {
    it('retrieves a contact by id', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for get by ID',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const email = 'test-get-by-id@example.com';
        const createResult = await resend.contacts.create({
          email,
          audienceId,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const getResult = await resend.contacts.get({
          id: contactId,
          audienceId,
        });

        expect(getResult.data?.id).toBe(contactId);
        expect(getResult.data?.email).toBe(email);
        expect(getResult.data?.object).toBe('contact');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('retrieves a contact by email', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for get by email',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const email = 'test-get-by-email@example.com';
        const createResult = await resend.contacts.create({
          email,
          audienceId,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const getResult = await resend.contacts.get({ email, audienceId });

        expect(getResult.data?.id).toBe(contactId);
        expect(getResult.data?.email).toBe(email);
        expect(getResult.data?.object).toBe('contact');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });

    it('returns error for non-existent contact', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for non-existent contact',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const result = await resend.contacts.get({
          id: '00000000-0000-0000-0000-000000000000',
          audienceId,
        });

        expect(result.error?.name).toBe('not_found');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });
  });

  describe('update', () => {
    it('updates a contact', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for update',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const createResult = await resend.contacts.create({
          email: 'test-update@example.com',
          audienceId,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const updateResult = await resend.contacts.update({
          id: contactId,
          audienceId,
          firstName: 'Updated',
          lastName: 'Name',
        });

        expect(updateResult.data?.id).toBe(contactId);

        const getResult = await resend.contacts.get({
          id: contactId,
          audienceId,
        });

        expect(getResult.data?.first_name).toBe('Updated');
        expect(getResult.data?.last_name).toBe('Name');
      } finally {
        const removeResult = await resend.audiences.remove(audienceId);
        expect(removeResult.data?.deleted).toBe(true);
      }
    });
  });

  describe('remove', () => {
    it('removes a contact by id', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for remove by ID',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const createResult = await resend.contacts.create({
          email: 'test-remove-by-id@example.com',
          audienceId,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const removeResult = await resend.contacts.remove({
          id: contactId,
          audienceId,
        });

        expect(removeResult.data?.deleted).toBe(true);

        const getResult = await resend.contacts.get({
          id: contactId,
          audienceId,
        });

        expect(getResult.error?.name).toBe('not_found');
      } finally {
        const removeAudienceResult = await resend.audiences.remove(audienceId);
        expect(removeAudienceResult.data?.deleted).toBe(true);
      }
    });

    it('removes a contact by email', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for remove by email',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const email = 'test-remove-by-email@example.com';
        const createResult = await resend.contacts.create({
          email,
          audienceId,
        });

        expect(createResult.data?.id).toBeDefined();

        const removeResult = await resend.contacts.remove({
          email,
          audienceId,
        });

        expect(removeResult.data?.deleted).toBe(true);

        const getResult = await resend.contacts.get({
          email,
          audienceId,
        });

        expect(getResult.error?.name).toBe('not_found');
      } finally {
        const removeAudienceResult = await resend.audiences.remove(audienceId);
        expect(removeAudienceResult.data?.deleted).toBe(true);
      }
    });

    it('appears to remove a contact that never existed', async () => {
      const audienceResult = await resend.audiences.create({
        name: 'Test audience for non-existent delete',
      });

      expect(audienceResult.data?.id).toBeTruthy();
      const audienceId = audienceResult.data!.id;

      try {
        const result = await resend.contacts.remove({
          id: '00000000-0000-0000-0000-000000000000',
          audienceId,
        });

        expect(result.data?.deleted).toBe(true);
      } finally {
        const removeAudienceResult = await resend.audiences.remove(audienceId);
        expect(removeAudienceResult.data?.deleted).toBe(true);
      }
    });
  });
});
