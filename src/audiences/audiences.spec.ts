import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import { GetAudienceResponseSuccess } from './interfaces';
import { ErrorResponse } from '../interfaces';

enableFetchMocks();

describe('Audiences', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates a audience', async () => {
      fetchMock.mockOnce(
        JSON.stringify({
          id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
          name: 'Resend',
          created_at: '2023-04-07T22:48:33.420498+00:00',
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        },
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(resend.audiences.create({ name: 'resend.com' })).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-04-07T22:48:33.420498+00:00",
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
    "name": "Resend",
  },
  "error": null,
}
`);
    });

    it('throws error when missing name', async () => {
      const errorResponse: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing "name" field',
      };

      fetchMock.mockOnce(JSON.stringify(errorResponse), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.audiences.create({ name: '' });

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
  });

  describe('list', () => {
    it('lists audiences', async () => {
      fetchMock.mockOnce(
        JSON.stringify({
          data: [
            {
              id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
              name: 'resend.com',
              created_at: '2023-04-07T23:13:52.669661+00:00',
            },
            {
              id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
              name: 'react.email',
              created_at: '2023-04-07T23:13:20.417116+00:00',
            },
          ],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        },
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.audiences.list()).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2023-04-07T23:13:52.669661+00:00",
        "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
        "name": "resend.com",
      },
      {
        "created_at": "2023-04-07T23:13:20.417116+00:00",
        "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
        "name": "react.email",
      },
    ],
  },
  "error": null,
}
`);
    });
  });

  describe('get', () => {
    describe('when audience not found', () => {
      it('returns error', async () => {
        const errorResponse: ErrorResponse = {
          name: 'not_found',
          message: 'Audience not found',
        };

        fetchMock.mockOnce(JSON.stringify(errorResponse), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.audiences.get('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Audience not found",
    "name": "not_found",
  },
}
`);
      });
    });

    it('get audience', async () => {
      const audience: GetAudienceResponseSuccess = {
        object: 'audience',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'resend.com',
        created_at: '2023-06-21T06:10:36.144Z',
      };

      fetchMock.mockOnce(JSON.stringify(audience), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.audiences.get('1234')).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-06-21T06:10:36.144Z",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "name": "resend.com",
    "object": "audience",
  },
  "error": null,
}
`);
    });
  });

  describe('remove', () => {
    it('removes a audience', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.audiences.remove('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {},
  "error": null,
}
`);
    });
  });
});
