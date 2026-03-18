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

  describe('contacts API endpoint', () => {
    describe('create', () => {
      it('creates a contact', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for contact creation 1',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        const topicResult = await resend.topics.create({
          name: 'Test topic for contact creation 1',
          defaultSubscription: 'opt_out',
        });

        expect(topicResult.data?.id).toBeTruthy();
        const topicId = topicResult.data!.id;

        const contactPropertyResult = await resend.contactProperties.create({
          key: 'test_property_for_contacts_api',
          type: 'string',
          fallbackValue: 'unknown',
        });

        expect(contactPropertyResult.data?.id).toBeTruthy();
        const contactPropertyId = contactPropertyResult.data!.id;

        try {
          const result = await resend.contacts.create({
            email: 'test@example.com',
            segments: [{ id: segmentId }],
            topics: [{ id: topicId, subscription: 'opt_in' }],
            properties: {
              test_property_for_contacts_api: 'updated value',
            },
            firstName: 'Test',
            lastName: 'User',
          });

          expect(result.data?.id).toBeTruthy();
          expect(result.data?.object).toBe('contact');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
          const removeTopicResult = await resend.topics.remove(topicId);
          expect(removeTopicResult.data?.deleted).toBe(true);
          const removeContactPropertyResult =
            await resend.contactProperties.remove(contactPropertyId);
          expect(removeContactPropertyResult.data?.deleted).toBe(true);
        }
      });

      it('handles validation errors', async () => {
        // @ts-expect-error: Testing invalid input
        const result = await resend.contacts.create({});

        expect(result.error?.name).toBe('missing_required_field');
      });
    });

    describe('list', () => {
      it('lists contacts without pagination', async () => {
        for (let i = 0; i < 6; i++) {
          await resend.contacts.create({
            email: `test.${i}@example.com`,
          });
        }

        const result = await resend.contacts.list();

        expect(result.data?.object).toBe('list');
        expect(result.data?.data.length).toBe(6);
        expect(result.data?.has_more).toBe(false);
      });

      it('lists contacts with limit', async () => {
        try {
          for (let i = 0; i < 6; i++) {
            await resend.contacts.create({
              email: `test.${i}@example.com`,
            });
          }

          const result = await resend.contacts.list({ limit: 5 });

          expect(result.data?.data.length).toBe(5);
          expect(result.data?.has_more).toBe(true);
        } finally {
          await Promise.all(
            Array.from({ length: 6 }).map((_, i) =>
              resend.contacts.remove({
                email: `test.${i}@example.com`,
              }),
            ),
          );
        }
      });
    }, 10000);

    describe('get', () => {
      it('retrieves a contact by id', async () => {
        const email = 'test-get-by-id@example.com';
        const createResult = await resend.contacts.create({
          email,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const getResult = await resend.contacts.get({
          id: contactId,
        });

        expect(getResult.data?.id).toBe(contactId);
        expect(getResult.data?.email).toBe(email);
        expect(getResult.data?.object).toBe('contact');
      });

      it('retrieves a contact by email', async () => {
        const email = 'test-get-by-email@example.com';
        const createResult = await resend.contacts.create({
          email,
        });

        expect(createResult.data?.id).toBeTruthy();
        const contactId = createResult.data!.id;

        const getResult = await resend.contacts.get({ email });

        expect(getResult.data?.id).toBe(contactId);
        expect(getResult.data?.email).toBe(email);
        expect(getResult.data?.object).toBe('contact');
      });

      it('returns error for non-existent contact', async () => {
        const result = await resend.contacts.get({
          id: '00000000-0000-0000-0000-000000000000',
        });

        expect(result.error?.name).toBe('not_found');
      });
    });

    describe('update', () => {
      it('updates a contact', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for update 1',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const createResult = await resend.contacts.create({
            email: 'test-update@example.com',
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const updateResult = await resend.contacts.update({
            id: contactId,
            audienceId: segmentId,
            firstName: 'Updated',
            lastName: 'Name',
          });

          expect(updateResult.data?.id).toBe(contactId);

          const getResult = await resend.contacts.get({
            id: contactId,
            audienceId: segmentId,
          });

          expect(getResult.data?.first_name).toBe('Updated');
          expect(getResult.data?.last_name).toBe('Name');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });
    });

    describe('remove', () => {
      it('removes a contact by id', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for remove by ID 1',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const createResult = await resend.contacts.create({
            email: 'test-remove-by-id@example.com',
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const removeResult = await resend.contacts.remove({
            id: contactId,
            audienceId: segmentId,
          });

          expect(removeResult.data?.deleted).toBe(true);

          const getResult = await resend.contacts.get({
            id: contactId,
            audienceId: segmentId,
          });

          expect(getResult.error?.name).toBe('not_found');
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });

      it('removes a contact by email', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for remove by email 1',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const email = 'test-remove-by-email@example.com';
          const createResult = await resend.contacts.create({
            email,
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeDefined();

          const removeResult = await resend.contacts.remove({
            email,
            audienceId: segmentId,
          });

          expect(removeResult.data?.deleted).toBe(true);

          const getResult = await resend.contacts.get({
            email,
            audienceId: segmentId,
          });

          expect(getResult.error?.name).toBe('not_found');
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });

      it('appears to remove a contact that never existed', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for non-existent delete 1',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const result = await resend.contacts.remove({
            id: '00000000-0000-0000-0000-000000000000',
            audienceId: segmentId,
          });

          expect(result.data?.deleted).toBe(true);
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });
    });
  });

  describe('legacy contacts API endpoint', () => {
    describe('create', () => {
      it('creates a contact', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for contact creation 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const result = await resend.contacts.create({
            email: 'test@example.com',
            audienceId: segmentId,
            firstName: 'Test',
            lastName: 'User',
          });

          expect(result.data?.id).toBeTruthy();
          expect(result.data?.object).toBe('contact');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });

      it('handles validation errors', async () => {
        // @ts-expect-error: Testing invalid input
        const result = await resend.contacts.create({});

        expect(result.error?.name).toBe('missing_required_field');
      });
    });

    describe('list', () => {
      it('lists contacts without pagination', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for listing 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          for (let i = 0; i < 6; i++) {
            await resend.contacts.create({
              audienceId: segmentId,
              email: `test.${i}@example.com`,
            });
          }

          const result = await resend.contacts.list({ segmentId });

          expect(result.data?.object).toBe('list');
          expect(result.data?.data.length).toBe(6);
          expect(result.data?.has_more).toBe(false);
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
          await Promise.all(
            Array.from({ length: 6 }).map((_, i) =>
              resend.contacts.remove({
                email: `test.${i}@example.com`,
                audienceId: segmentId,
              }),
            ),
          );
        }
      }, 10000);

      it('lists contacts with limit', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for listing with limit 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          for (let i = 0; i < 6; i++) {
            await resend.contacts.create({
              audienceId: segmentId,
              email: `test.${i}@example.com`,
            });
          }

          const result = await resend.contacts.list({ segmentId, limit: 5 });

          expect(result.data?.data.length).toBe(5);
          expect(result.data?.has_more).toBe(true);
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });
    });

    describe('get', () => {
      it('retrieves a contact by id', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for get by ID 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const email = 'test-get-by-id@example.com';
          const createResult = await resend.contacts.create({
            email,
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const getResult = await resend.contacts.get({
            id: contactId,
            audienceId: segmentId,
          });

          expect(getResult.data?.id).toBe(contactId);
          expect(getResult.data?.email).toBe(email);
          expect(getResult.data?.object).toBe('contact');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });

      it('retrieves a contact by email', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for get by ID 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;
        try {
          const email = 'test-get-by-email@example.com';
          const createResult = await resend.contacts.create({
            email,
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const getResult = await resend.contacts.get({ email });

          expect(getResult.data?.id).toBe(contactId);
          expect(getResult.data?.email).toBe(email);
          expect(getResult.data?.object).toBe('contact');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });

      it('returns error for non-existent contact', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for get by ID 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const result = await resend.contacts.get({
            id: '00000000-0000-0000-0000-000000000000',
            audienceId: segmentId,
          });

          expect(result.error?.name).toBe('not_found');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });
    });

    describe('update', () => {
      it('updates a contact', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for update 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const createResult = await resend.contacts.create({
            email: 'test-update@example.com',
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const updateResult = await resend.contacts.update({
            id: contactId,
            audienceId: segmentId,
            firstName: 'Updated',
            lastName: 'Name',
          });

          expect(updateResult.data?.id).toBe(contactId);

          const getResult = await resend.contacts.get({
            id: contactId,
            audienceId: segmentId,
          });

          expect(getResult.data?.first_name).toBe('Updated');
          expect(getResult.data?.last_name).toBe('Name');
        } finally {
          const removeResult = await resend.segments.remove(segmentId);
          expect(removeResult.data?.deleted).toBe(true);
        }
      });
    });

    describe('remove', () => {
      it('removes a contact by id', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for remove by ID 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const createResult = await resend.contacts.create({
            email: 'test-remove-by-id@example.com',
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeTruthy();
          const contactId = createResult.data!.id;

          const removeResult = await resend.contacts.remove({
            id: contactId,
            audienceId: segmentId,
          });

          expect(removeResult.data?.deleted).toBe(true);

          const getResult = await resend.contacts.get({
            id: contactId,
            audienceId: segmentId,
          });

          expect(getResult.error?.name).toBe('not_found');
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });

      it('removes a contact by email', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for remove by email 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const email = 'test-remove-by-email@example.com';
          const createResult = await resend.contacts.create({
            email,
            audienceId: segmentId,
          });

          expect(createResult.data?.id).toBeDefined();

          const removeResult = await resend.contacts.remove({
            email,
            audienceId: segmentId,
          });

          expect(removeResult.data?.deleted).toBe(true);

          const getResult = await resend.contacts.get({
            email,
            audienceId: segmentId,
          });

          expect(getResult.error?.name).toBe('not_found');
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });

      it('appears to remove a contact that never existed', async () => {
        const segmentResult = await resend.segments.create({
          name: 'Test segment for non-existent delete 2',
        });

        expect(segmentResult.data?.id).toBeTruthy();
        const segmentId = segmentResult.data!.id;

        try {
          const result = await resend.contacts.remove({
            id: '00000000-0000-0000-0000-000000000000',
            audienceId: segmentId,
          });

          expect(result.data?.deleted).toBe(true);
        } finally {
          const removeAudienceResult = await resend.segments.remove(segmentId);
          expect(removeAudienceResult.data?.deleted).toBe(true);
        }
      });
    });
  });
});
