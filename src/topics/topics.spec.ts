import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  CreateTopicOptions,
  CreateTopicResponseSuccess,
} from './interfaces/create-topic-options.interface';
import type { GetTopicResponseSuccess } from './interfaces/get-contact.interface';
import type { ListTopicsResponseSuccess } from './interfaces/list-topics.interface';
import type { RemoveTopicResponseSuccess } from './interfaces/remove-topic.interface';
import type { UpdateTopicOptions } from './interfaces/update-topic.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Topics', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a topic', async () => {
      const payload: CreateTopicOptions = {
        name: 'Newsletter',
        description: 'Weekly newsletter updates',
        defaultSubscription: 'opt_in',
      };
      const response: CreateTopicResponseSuccess = {
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };

      mockSuccessResponse(response, {
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.topics.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing name', async () => {
      const payload: CreateTopicOptions = {
        name: '',
        defaultSubscription: 'opt_in',
      };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `name` field.',
        statusCode: 422,
      };

      mockErrorResponse(response, {
        headers: {
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.topics.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`name\` field.",
            "name": "missing_required_field",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing defaultSubscription', async () => {
      const payload = {
        name: 'Newsletter',
        description: 'Weekly newsletter updates',
      };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `defaultSubscription` field.',
        statusCode: 422,
      };

      mockErrorResponse(response, {
        headers: {
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.topics.create(payload as CreateTopicOptions);

      await expect(result).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`defaultSubscription\` field.",
            "name": "missing_required_field",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('list', () => {
    it('lists topics', async () => {
      const response: ListTopicsResponseSuccess = {
        data: [
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            name: 'Newsletter',
            description: 'Weekly newsletter updates',
            defaultSubscription: 'opt_in',
            created_at: '2023-04-07T23:13:52.669661+00:00',
          },
          {
            id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
            name: 'Product Updates',
            description: 'Product announcements and updates',
            defaultSubscription: 'opt_out',
            created_at: '2023-04-07T23:13:20.417116+00:00',
          },
        ],
      };
      mockSuccessResponse(response, {
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.topics.list()).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "created_at": "2023-04-07T23:13:52.669661+00:00",
                "defaultSubscription": "opt_in",
                "description": "Weekly newsletter updates",
                "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
                "name": "Newsletter",
              },
              {
                "created_at": "2023-04-07T23:13:20.417116+00:00",
                "defaultSubscription": "opt_out",
                "description": "Product announcements and updates",
                "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
                "name": "Product Updates",
              },
            ],
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('get', () => {
    describe('when topic not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Topic not found',
          statusCode: 404,
        };

        mockErrorResponse(response, {
          headers: {
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.topics.get(
          '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Topic not found",
              "name": "not_found",
              "statusCode": 404,
            },
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });
    });

    it('get topic by id', async () => {
      const response: GetTopicResponseSuccess = {
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'Newsletter',
        description: 'Weekly newsletter updates',
        defaultSubscription: 'opt_in',
        created_at: '2024-01-16T18:12:26.514Z',
      };

      mockSuccessResponse(response, {
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.topics.get('fd61172c-cafc-40f5-b049-b45947779a29'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2024-01-16T18:12:26.514Z",
            "defaultSubscription": "opt_in",
            "description": "Weekly newsletter updates",
            "id": "fd61172c-cafc-40f5-b049-b45947779a29",
            "name": "Newsletter",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing id', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = resend.topics.get('');

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
  "headers": null,
}
`);
    });
  });

  describe('update', () => {
    it('updates a topic', async () => {
      const payload: UpdateTopicOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        name: 'Updated Newsletter',
        description: 'Updated weekly newsletter',
      };
      const response = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };
      mockSuccessResponse(response, {
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.topics.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing id', async () => {
      const payload = {
        name: 'Updated Newsletter',
      };
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.topics.update(payload as UpdateTopicOptions);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
  "headers": null,
}
`);
    });
  });

  describe('remove', () => {
    it('removes a topic', async () => {
      const response: RemoveTopicResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        object: 'topic',
        deleted: true,
      };
      mockSuccessResponse(response, {
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.topics.remove('3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
            "object": "topic",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing id', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = resend.topics.remove('');

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
  "headers": null,
}
`);
    });
  });
});
