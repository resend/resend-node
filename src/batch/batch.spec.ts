import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import {
  CreateBatchOptions,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

enableFetchMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Batch', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('sends multiple emails', async () => {
      const payload: CreateBatchOptions = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];
      const response: CreateBatchSuccessResponse = {
        data: [
          { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
          { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
          { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
        ],
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const data = await resend.batch.create(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "id": "aabeeefc-bd13-474a-a440-0ee139b3a4cc",
      },
      {
        "id": "aebe1c6e-30ad-4257-993b-519f5affa626",
      },
      {
        "id": "b2bc2598-f98b-4da4-86c9-7b32881ef394",
      },
    ],
  },
  "error": null,
}
`);
    });
  });

  describe('send', () => {
    it('sends multiple emails', async () => {
      const payload = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];
      const response: CreateBatchSuccessResponse = {
        data: [
          { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
          { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
          { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const data = await resend.batch.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "id": "aabeeefc-bd13-474a-a440-0ee139b3a4cc",
      },
      {
        "id": "aebe1c6e-30ad-4257-993b-519f5affa626",
      },
      {
        "id": "b2bc2598-f98b-4da4-86c9-7b32881ef394",
      },
    ],
  },
  "error": null,
}
`);
    });
  });
});
