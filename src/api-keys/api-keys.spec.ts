import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateApiKeyOptions,
  CreateApiKeyResponseSuccess,
} from './interfaces/create-api-key-options.interface';
import type { ListApiKeysResponseSuccess } from './interfaces/list-api-keys.interface';
import type { RemoveApiKeyResponseSuccess } from './interfaces/remove-api-keys.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('API Keys', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates an api key', async () => {
      const payload: CreateApiKeyOptions = {
        name: 'Test',
      };
      const response: CreateApiKeyResponseSuccess = {
        token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.apiKeys.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "430eed87-632a-4ea6-90db-0aace67ec228",
            "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing name', async () => {
      const payload: CreateApiKeyOptions = {
        name: '',
      };
      const response: ErrorResponse = {
        message: 'String must contain at least 1 character(s)',
        name: 'validation_error',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.apiKeys.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "String must contain at least 1 character(s)",
            "name": "validation_error",
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    describe('with access', () => {
      it('creates api key with access `full_access`', async () => {
        const payload: CreateApiKeyOptions = {
          name: 'Test',
          permission: 'full_access',
        };

        const response: CreateApiKeyResponseSuccess = {
          token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
          id: '430eed87-632a-4ea6-90db-0aace67ec228',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 201,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create(payload),
        ).resolves.toMatchInlineSnapshot(`
          {
            "data": {
              "id": "430eed87-632a-4ea6-90db-0aace67ec228",
              "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
            },
            "error": null,
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });

      it('creates api key with access `sending_access`', async () => {
        const payload: CreateApiKeyOptions = {
          name: 'Test',
          permission: 'sending_access',
        };
        const response: CreateApiKeyResponseSuccess = {
          token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
          id: '430eed87-632a-4ea6-90db-0aace67ec228',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 201,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create(payload),
        ).resolves.toMatchInlineSnapshot(`
          {
            "data": {
              "id": "430eed87-632a-4ea6-90db-0aace67ec228",
              "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
            },
            "error": null,
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });

      it('throws error with wrong access', async () => {
        const response: ErrorResponse = {
          name: 'invalid_access',
          message: 'Access must be "full_access" | "sending_access"',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 422,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const payload: CreateApiKeyOptions = {
          name: 'Test',
          permission: 'wrong_access' as 'sending_access' | 'full_access',
        };

        await expect(
          resend.apiKeys.create(payload),
        ).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Access must be "full_access" | "sending_access"",
              "name": "invalid_access",
            },
            "headers": {
              "content-type": "application/json",
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
    const response: ListApiKeysResponseSuccess = {
      object: 'list',
      has_more: false,
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
    };

    describe('when no pagination options are provided', () => {
      it('lists api keys', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.apiKeys.list();
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/api-keys',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });

    describe('when pagination options are provided', () => {
      it('passes limit param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.apiKeys.list({ limit: 1 });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/api-keys?limit=1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes after param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.apiKeys.list({
          limit: 1,
          after: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/api-keys?limit=1&after=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes before param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.apiKeys.list({
          limit: 1,
          before: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/api-keys?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('remove', () => {
    const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
    const response: RemoveApiKeyResponseSuccess = {};

    it('removes an api key', async () => {
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.remove(id)).resolves.toMatchInlineSnapshot(`
        {
          "data": {},
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing id', async () => {
      const response: ErrorResponse = {
        name: 'application_error',
        message: 'Something went wrong',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 500,
        headers: {
          'content-type': 'application/json',
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
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when wrong id', async () => {
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'API key not found',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
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
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });
});
