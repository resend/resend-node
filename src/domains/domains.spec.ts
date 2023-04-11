import axios from 'axios';
import MockAdapater from 'axios-mock-adapter';
import { Resend } from '../resend';
import { DomainRegion } from './interfaces';

const mock = new MockAdapater(axios);

describe('Domains', () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  describe('create', () => {
    it('creates a domain', async () => {
      mock.onPost('/domains', { name: 'resend.com' }).replyOnce(201, {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        name: 'resend.com',
        created_at: '2023-04-07T22:48:33.420498+00:00',
        status: 'not_started',
        records: [
          {
            record: 'SPF',
            name: 'bounces',
            type: 'MX',
            ttl: 'Auto',
            status: 'not_started',
            value: `feedback-smtp.us-east-1.com`,
            priority: 10,
          },
          {
            record: 'SPF',
            name: 'bounces',
            value: '"v=spf1 include:com ~all"',
            type: 'TXT',
            ttl: 'Auto',
            status: 'not_started',
          },
          {
            record: 'DKIM',
            name: 'nu22pfdfqaxdybogtw3ebaokmalv5mxg._domainkey',
            value: 'nu22pfdfqaxdybogtw3ebaokmalv5mxg.dkim.com.',
            type: 'CNAME',
            status: 'not_started',
            ttl: 'Auto',
          },
          {
            record: 'DKIM',
            name: 'qklz5ozk742hhql3vmekdu3pr4f5ggsj._domainkey',
            value: 'qklz5ozk742hhql3vmekdu3pr4f5ggsj.dkim.com.',
            type: 'CNAME',
            status: 'not_started',
            ttl: 'Auto',
          },
          {
            record: 'DKIM',
            name: 'eeaemodxoao5hxwjvhywx4bo5mswjw6v._domainkey',
            value: 'eeaemodxoao5hxwjvhywx4bo5mswjw6v.dkim.com.',
            type: 'CNAME',
            status: 'not_started',
            ttl: 'Auto',
          },
        ],
        region: 'us-east-1',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(resend.domains.create({ name: 'resend.com' })).resolves
        .toMatchInlineSnapshot(`
        {
          "created_at": "2023-04-07T22:48:33.420498+00:00",
          "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
          "name": "resend.com",
          "records": [
            {
              "name": "bounces",
              "priority": 10,
              "record": "SPF",
              "status": "not_started",
              "ttl": "Auto",
              "type": "MX",
              "value": "feedback-smtp.us-east-1.com",
            },
            {
              "name": "bounces",
              "record": "SPF",
              "status": "not_started",
              "ttl": "Auto",
              "type": "TXT",
              "value": ""v=spf1 include:com ~all"",
            },
            {
              "name": "nu22pfdfqaxdybogtw3ebaokmalv5mxg._domainkey",
              "record": "DKIM",
              "status": "not_started",
              "ttl": "Auto",
              "type": "CNAME",
              "value": "nu22pfdfqaxdybogtw3ebaokmalv5mxg.dkim.com.",
            },
            {
              "name": "qklz5ozk742hhql3vmekdu3pr4f5ggsj._domainkey",
              "record": "DKIM",
              "status": "not_started",
              "ttl": "Auto",
              "type": "CNAME",
              "value": "qklz5ozk742hhql3vmekdu3pr4f5ggsj.dkim.com.",
            },
            {
              "name": "eeaemodxoao5hxwjvhywx4bo5mswjw6v._domainkey",
              "record": "DKIM",
              "status": "not_started",
              "ttl": "Auto",
              "type": "CNAME",
              "value": "eeaemodxoao5hxwjvhywx4bo5mswjw6v.dkim.com.",
            },
          ],
          "region": "us-east-1",
          "status": "not_started",
        }
      `);
      expect(mock.history.post.length).toBe(1);
    });

    it('throws error when missing name', async () => {
      mock.onPost('/domains').replyOnce(422, {
        statusCode: 422,
        name: 'missing_required_field',
        message: 'Missing "name" field',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.domains.create({ name: '' })).rejects
        .toMatchInlineSnapshot(`
          {
            "message": "Missing "name" field",
            "name": "missing_required_field",
            "statusCode": 422,
          }
        `);
      expect(mock.history.post.length).toBe(1);
    });

    describe('with region', () => {
      it('creates a domain with region', async () => {
        mock
          .onPost('/domains', { name: 'resend.com', region: 'eu-west-1' })
          .replyOnce(201, {
            id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
            name: 'resend.com',
            created_at: '2023-04-07T22:48:33.420498+00:00',
            status: 'not_started',
            records: [
              {
                record: 'SPF',
                name: 'bounces',
                type: 'MX',
                ttl: 'Auto',
                status: 'not_started',
                value: `feedback-smtp.eu-west-1.com`,
                priority: 10,
              },
              {
                record: 'SPF',
                name: 'bounces',
                value: '"v=spf1 include:com ~all"',
                type: 'TXT',
                ttl: 'Auto',
                status: 'not_started',
              },
              {
                record: 'DKIM',
                name: 'nu22pfdfqaxdybogtw3ebaokmalv5mxg._domainkey',
                value: 'nu22pfdfqaxdybogtw3ebaokmalv5mxg.dkim.com.',
                type: 'CNAME',
                status: 'not_started',
                ttl: 'Auto',
              },
              {
                record: 'DKIM',
                name: 'qklz5ozk742hhql3vmekdu3pr4f5ggsj._domainkey',
                value: 'qklz5ozk742hhql3vmekdu3pr4f5ggsj.dkim.com.',
                type: 'CNAME',
                status: 'not_started',
                ttl: 'Auto',
              },
              {
                record: 'DKIM',
                name: 'eeaemodxoao5hxwjvhywx4bo5mswjw6v._domainkey',
                value: 'eeaemodxoao5hxwjvhywx4bo5mswjw6v.dkim.com.',
                type: 'CNAME',
                status: 'not_started',
                ttl: 'Auto',
              },
            ],
            region: 'eu-west-1',
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        await expect(
          resend.domains.create({ name: 'resend.com', region: 'eu-west-1' }),
        ).resolves.toMatchInlineSnapshot(`
                  {
                    "created_at": "2023-04-07T22:48:33.420498+00:00",
                    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
                    "name": "resend.com",
                    "records": [
                      {
                        "name": "bounces",
                        "priority": 10,
                        "record": "SPF",
                        "status": "not_started",
                        "ttl": "Auto",
                        "type": "MX",
                        "value": "feedback-smtp.eu-west-1.com",
                      },
                      {
                        "name": "bounces",
                        "record": "SPF",
                        "status": "not_started",
                        "ttl": "Auto",
                        "type": "TXT",
                        "value": ""v=spf1 include:com ~all"",
                      },
                      {
                        "name": "nu22pfdfqaxdybogtw3ebaokmalv5mxg._domainkey",
                        "record": "DKIM",
                        "status": "not_started",
                        "ttl": "Auto",
                        "type": "CNAME",
                        "value": "nu22pfdfqaxdybogtw3ebaokmalv5mxg.dkim.com.",
                      },
                      {
                        "name": "qklz5ozk742hhql3vmekdu3pr4f5ggsj._domainkey",
                        "record": "DKIM",
                        "status": "not_started",
                        "ttl": "Auto",
                        "type": "CNAME",
                        "value": "qklz5ozk742hhql3vmekdu3pr4f5ggsj.dkim.com.",
                      },
                      {
                        "name": "eeaemodxoao5hxwjvhywx4bo5mswjw6v._domainkey",
                        "record": "DKIM",
                        "status": "not_started",
                        "ttl": "Auto",
                        "type": "CNAME",
                        "value": "eeaemodxoao5hxwjvhywx4bo5mswjw6v.dkim.com.",
                      },
                    ],
                    "region": "eu-west-1",
                    "status": "not_started",
                  }
              `);
        expect(mock.history.post.length).toBe(1);
      });

      it('throws error with wrong region', async () => {
        mock.onPost('/domains').replyOnce(422, {
          statusCode: 422,
          name: 'invalid_region',
          message: 'Region must be "us-east-1" | "eu-west-1" | "sa-east-1"',
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.domains.create({
            name: 'resend.com',
            region: 'remote' as DomainRegion,
          }),
        ).rejects.toMatchInlineSnapshot(`
          {
            "message": "Region must be "us-east-1" | "eu-west-1" | "sa-east-1"",
            "name": "invalid_region",
            "statusCode": 422,
          }
        `);
        expect(mock.history.post.length).toBe(1);
      });
    });
  });

  describe('list', () => {
    it('lists domains', async () => {
      mock.onGet('/domains').replyOnce(200, {
        data: [
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            name: 'resend.com',
            status: 'not_started',
            created_at: '2023-04-07T23:13:52.669661+00:00',
            region: 'eu-west-1',
          },
          {
            id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
            name: 'react.email',
            status: 'not_started',
            created_at: '2023-04-07T23:13:20.417116+00:00',
            region: 'us-east-1',
          },
        ],
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.domains.list()).resolves.toMatchInlineSnapshot(`
        [
          {
            "created_at": "2023-04-07T23:13:52.669661+00:00",
            "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
            "name": "resend.com",
            "region": "eu-west-1",
            "status": "not_started",
          },
          {
            "created_at": "2023-04-07T23:13:20.417116+00:00",
            "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
            "name": "react.email",
            "region": "us-east-1",
            "status": "not_started",
          },
        ]
      `);
      expect(mock.history.get.length).toBe(1);
    });
  });

  describe('verify', () => {
    it('verifies a domain', async () => {
      mock
        .onPost('/domains/5262504e-8ed7-4fac-bd16-0d4be94bc9f2/verify')
        .replyOnce(200);

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.domains.verify('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`undefined`);
      expect(mock.history.post.length).toBe(1);
    });
  });

  describe('remove', () => {
    it('removes a domain', async () => {
      mock
        .onDelete('/domains/5262504e-8ed7-4fac-bd16-0d4be94bc9f2')
        .replyOnce(200);

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.domains.remove('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`undefined`);
      expect(mock.history.delete.length).toBe(1);
    });
  });
});
