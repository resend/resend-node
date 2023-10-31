import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import { ErrorResponse } from '../interfaces';

enableFetchMocks();

describe('API Keys', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates an api key', async () => {
      fetchMock.mockOnce(
        JSON.stringify({
          data: {
            token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
            id: '430eed87-632a-4ea6-90db-0aace67ec228',
          },
          error: null,
        }),
        {
          status: 201,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        },
      );

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.create({ name: 'Test' })).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "id": "430eed87-632a-4ea6-90db-0aace67ec228",
      "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
    },
    "error": null,
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

      const result = resend.apiKeys.create({ name: '' });

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

    describe('with access', () => {
      it('creates api key with access `full_access`', async () => {
        fetchMock.mockOnce(
          JSON.stringify({
            data: {
              token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
              id: '430eed87-632a-4ea6-90db-0aace67ec228',
            },
            error: null,
          }),
          {
            status: 201,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_924b3rjh2387fbewf823',
            },
          },
        );

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({ name: 'Test', permission: 'full_access' }),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "id": "430eed87-632a-4ea6-90db-0aace67ec228",
      "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
    },
    "error": null,
  },
  "error": null,
}
`);
      });

      it('creates api key with access `sending_access`', async () => {
        fetchMock.mockOnce(
          JSON.stringify({
            data: {
              token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
              id: '430eed87-632a-4ea6-90db-0aace67ec228',
            },
            error: null,
          }),
          {
            status: 201,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_924b3rjh2387fbewf823',
            },
          },
        );

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'sending_access',
          }),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "id": "430eed87-632a-4ea6-90db-0aace67ec228",
      "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
    },
    "error": null,
  },
  "error": null,
}
`);
      });

      it('throws error with wrong access', async () => {
        const errorResponse: ErrorResponse = {
          name: 'invalid_access',
          message: 'Access must be "full_access" | "sending_access"',
        };

        fetchMock.mockOnce(JSON.stringify(errorResponse), {
          status: 422,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'wrong_access' as 'sending_access' | 'full_access',
          }),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Access must be "full_access" | "sending_access"",
    "name": "invalid_access",
  },
}
`);
      });
    });

    // describe('restricted by domain', () => {
    //   it('creates api key restricted by domain', async () => {
    //     fetchMock.mockOnce(
    //       JSON.stringify({
    //         data: {
    //           token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
    //           id: '430eed87-632a-4ea6-90db-0aace67ec228',
    //         },
    //         error: null,
    //       }),
    //       {
    //         status: 201,
    //         headers: {
    //           'content-type': 'application/json',
    //           Authorization: 'Bearer re_924b3rjh2387fbewf823',
    //         },
    //       },
    //     );

    //     const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

    //     await expect(
    //       resend.apiKeys.create({
    //         name: 'Test',
    //         permission: 'sending_access',
    //         domain_id: '7dfcf219-9900-4169-86f3-801e6d9b935e',
    //       }),
    //     ).resolves.toMatchInlineSnapshot(`
    //       {
    //         "id": "430eed87-632a-4ea6-90db-0aace67ec228",
    //         "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
    //       }
    //     `);
    //   });

    //   it('throws error with wrong access', async () => {
    //     const errorResponse: ErrorResponse = {
    //       name: 'application_error',
    //       message: 'Something went wrong',
    //
    //     };

    //     fetchMock.mockOnce(
    //       JSON.stringify(errorResponse),
    //       {
    //         status: 500,
    //         headers: {
    //           'content-type': 'application/json',
    //           Authorization: 'Bearer re_924b3rjh2387fbewf823',
    //         },
    //       },
    //     );

    //     const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

    //     await expect(
    //       resend.apiKeys.create({
    //         name: 'Test',
    //         permission: 'sending_access',
    //         domain_id: '1234',
    //       }),
    //     ).resolves.toMatchInlineSnapshot(
    //       `
    //       {
    //         "error": {
    //           "message": "Something went wrong",
    //           "name": "application_error",
    //           "statusCode": 500,
    //         },
    //       }
    //     `,
    //     );
    //   });
    // });
  });

  describe('list', () => {
    it('lists api keys', async () => {
      fetchMock.mockOnce(
        JSON.stringify({
          data: [
            {
              id: '5262504e-8ed7-4fac-bd16-0d4be94bc9f2',
              name: 'My API Key 1',
              created_at: '2023-04-07T20:29:10.666968+00:00',
            },
            {
              id: '98c37b35-1473-4afe-a627-78e975a36fab',
              name: 'My API Key 2',
              created_at: '2023-04-06T23:09:49.093947+00:00',
            },
          ],
          error: null,
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

      await expect(resend.apiKeys.list()).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2023-04-07T20:29:10.666968+00:00",
        "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
        "name": "My API Key 1",
      },
      {
        "created_at": "2023-04-06T23:09:49.093947+00:00",
        "id": "98c37b35-1473-4afe-a627-78e975a36fab",
        "name": "My API Key 2",
      },
    ],
    "error": null,
  },
  "error": null,
}
`);
    });
  });

  describe('remove', () => {
    it('removes an api key', async () => {
      fetchMock.mockOnce(
        JSON.stringify({
          data: {
            id: '5262504e-8ed7-4fac-bd16-0d4be94bc9f2',
          },
          error: null,
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

      await expect(
        resend.apiKeys.remove('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
    },
    "error": null,
  },
  "error": null,
}
`);
    });

    it('throws error when missing id', async () => {
      const errorResponse: ErrorResponse = {
        name: 'application_error',
        message: 'Something went wrong',
      };

      fetchMock.mockOnce(JSON.stringify(errorResponse), {
        status: 500,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.apiKeys.remove('');

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Something went wrong",
    "name": "application_error",
  },
}
`);
    });

    it('throws error when wrong id', async () => {
      const errorResponse: ErrorResponse = {
        name: 'not_found',
        message: 'API key not found',
      };

      fetchMock.mockOnce(JSON.stringify(errorResponse), {
        status: 404,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.apiKeys.remove(
        '34bd250e-615a-400c-be11-5912572ee15b',
      );

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "API key not found",
    "name": "not_found",
  },
}
`);
    });
  });
});
