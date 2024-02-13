import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import { DomainRegion } from './interfaces/domain';
import { ErrorResponse } from '../interfaces';
import { GetDomainResponseSuccess } from './interfaces/get-domain.interface';
import {
  CreateDomainOptions,
  CreateDomainResponseSuccess,
} from './interfaces/create-domain-options.interface';
import { ListDomainsResponseSuccess } from './interfaces/list-domains.interface';
import { RemoveDomainsResponseSuccess } from './interfaces/remove-domain.interface';
import { UpdateDomainsResponseSuccess } from './interfaces/update-domain.interface';

enableFetchMocks();

describe('Domains', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates a domain', async () => {
      const response: CreateDomainResponseSuccess = {
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
            value: 'feedback-smtp.us-east-1.com',
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
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });
      const payload: CreateDomainOptions = { name: 'resend.com' };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(resend.domains.create(payload)).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
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
  },
  "error": null,
}
`);
    });

    it('throws error when missing name', async () => {
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing "name" field',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateDomainOptions = {
        name: '',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.domains.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing "name" field",
    "name": "missing_required_field",
  },
}
`);
    });

    describe('with region', () => {
      it('creates a domain with region', async () => {
        const response: CreateDomainResponseSuccess = {
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
              value: 'feedback-smtp.eu-west-1.com',
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
        };
        fetchMock.mockOnce(JSON.stringify(response));
        const payload: CreateDomainOptions = {
          name: 'resend.com',
          region: 'eu-west-1',
        };

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        await expect(resend.domains.create(payload)).resolves
          .toMatchInlineSnapshot(`
{
  "data": {
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
  },
  "error": null,
}
`);
      });

      it('throws error with wrong region', async () => {
        const errorResponse: ErrorResponse = {
          name: 'invalid_region',
          message: 'Region must be "us-east-1" | "eu-west-1" | "sa-east-1"',
        };

        fetchMock.mockOnce(JSON.stringify(errorResponse), {
          status: 422,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.domains.create({
          name: 'resend.com',
          region: 'remote' as DomainRegion,
        });

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Region must be "us-east-1" | "eu-west-1" | "sa-east-1"",
    "name": "invalid_region",
  },
}
`);
      });
    });
  });

  describe('list', () => {
    it('lists domains', async () => {
      const response: ListDomainsResponseSuccess = {
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
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.domains.list()).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
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
    ],
  },
  "error": null,
}
`);
    });
  });

  describe('get', () => {
    describe('when domain not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Domain not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.domains.get('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Domain not found",
    "name": "not_found",
  },
}
`);
      });
    });

    it('get domain', async () => {
      const response: GetDomainResponseSuccess = {
        object: 'domain',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'resend.com',
        status: 'not_started',
        created_at: '2023-06-21T06:10:36.144Z',
        region: 'us-east-1',
        records: [
          {
            record: 'SPF',
            name: 'bounces.resend.com',
            type: 'MX',
            ttl: 'Auto',
            status: 'not_started',
            value: 'feedback-smtp.us-east-1.amazonses.com',
            priority: 10,
          },
          {
            record: 'SPF',
            name: 'bounces.resend.com',
            value: '"v=spf1 include:amazonses.com ~all"',
            type: 'TXT',
            ttl: 'Auto',
            status: 'not_started',
          },
          {
            record: 'DKIM',
            name: 'resend._domainkey',
            value:
              'p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZDhdsAKs5xdSj7h3v22wjx3WMWWADCHwxfef8U03JUbVM/sNSVuY5mbrdJKUoG6QBdfxsOGzhINmQnT89idjp5GdAUhx/KNpt8hcLXMID4nB0Gbcafn03/z5zEPxPfzVJqQd/UqOtZQcfxN9OrIhLiBsYTbcTBB7EvjCb3wEaBwIDAQAB',
            type: 'TXT',
            status: 'verified',
            ttl: 'Auto',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.domains.get('1234')).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-06-21T06:10:36.144Z",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "name": "resend.com",
    "object": "domain",
    "records": [
      {
        "name": "bounces.resend.com",
        "priority": 10,
        "record": "SPF",
        "status": "not_started",
        "ttl": "Auto",
        "type": "MX",
        "value": "feedback-smtp.us-east-1.amazonses.com",
      },
      {
        "name": "bounces.resend.com",
        "record": "SPF",
        "status": "not_started",
        "ttl": "Auto",
        "type": "TXT",
        "value": ""v=spf1 include:amazonses.com ~all"",
      },
      {
        "name": "resend._domainkey",
        "record": "DKIM",
        "status": "verified",
        "ttl": "Auto",
        "type": "TXT",
        "value": "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZDhdsAKs5xdSj7h3v22wjx3WMWWADCHwxfef8U03JUbVM/sNSVuY5mbrdJKUoG6QBdfxsOGzhINmQnT89idjp5GdAUhx/KNpt8hcLXMID4nB0Gbcafn03/z5zEPxPfzVJqQd/UqOtZQcfxN9OrIhLiBsYTbcTBB7EvjCb3wEaBwIDAQAB",
      },
    ],
    "region": "us-east-1",
    "status": "not_started",
  },
  "error": null,
}
`);
    });
  });

  describe('update', () => {
    it('update domain click tracking', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: UpdateDomainsResponseSuccess = {
        object: 'domain',
        id,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.domains.update({
          id,
          clickTracking: true,
        }),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
    "object": "domain",
  },
  "error": null,
}
`);
    });
  });

  describe('verify', () => {
    it('verifies a domain', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.domains.verify('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {},
  "error": null,
}
`);
    });
  });

  describe('remove', () => {
    it('removes a domain', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: RemoveDomainsResponseSuccess = {
        id,
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.domains.remove(id)).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
  },
  "error": null,
}
`);
    });
  });
});
