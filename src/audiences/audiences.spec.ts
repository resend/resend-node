import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  CreateAudienceOptions,
  CreateAudienceResponseSuccess,
} from './interfaces/create-audience-options.interface';
import type { GetAudienceResponseSuccess } from './interfaces/get-audience.interface';
import type { ListAudiencesResponseSuccess } from './interfaces/list-audiences.interface';
import type { RemoveAudiencesResponseSuccess } from './interfaces/remove-audience.interface';

describe('Audiences', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates a audience', async () => {
      const payload: CreateAudienceOptions = { name: 'resend.com' };
      const response: CreateAudienceResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        name: 'Resend',
        object: 'audience',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.audiences.create(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
    "name": "Resend",
    "object": "audience",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('throws error when missing name', async () => {
      const payload: CreateAudienceOptions = { name: '' };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing "name" field',
      };

      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.audiences.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing "name" field",
    "name": "missing_required_field",
  },
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });

  describe('list', () => {
    const response: ListAudiencesResponseSuccess = {
      object: 'list',
      has_more: false,
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
    };

    describe('when no pagination options are provided', () => {
      it('lists audiences', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.audiences.list();
        expect(result).toEqual({
          data: response,
          error: null,
          rateLimiting: {
            limit: 2,
            remainingRequests: 2,
            shouldResetAfter: 1,
          },
        });
      });
    });

    describe('when pagination options are provided', () => {
      it('passes limit param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.audiences.list({ limit: 1 });
        expect(result).toEqual({
          data: response,
          error: null,
          rateLimiting: {
            limit: 2,
            remainingRequests: 2,
            shouldResetAfter: 1,
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences?limit=1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes after param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.audiences.list({
          limit: 1,
          after: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          rateLimiting: {
            limit: 2,
            remainingRequests: 2,
            shouldResetAfter: 1,
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences?limit=1&after=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes before param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.audiences.list({
          limit: 1,
          before: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          rateLimiting: {
            limit: 2,
            remainingRequests: 2,
            shouldResetAfter: 1,
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('get', () => {
    describe('when audience not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Audience not found',
        };

        mockErrorResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
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
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
      });
    });

    it('get audience', async () => {
      const response: GetAudienceResponseSuccess = {
        object: 'audience',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'resend.com',
        created_at: '2023-06-21T06:10:36.144Z',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.audiences.get('1234'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-06-21T06:10:36.144Z",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "name": "resend.com",
    "object": "audience",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });

  describe('remove', () => {
    it('removes a audience', async () => {
      const id = '5262504e-8ed7-4fac-bd16-0d4be94bc9f2';
      const response: RemoveAudiencesResponseSuccess = {
        object: 'audience',
        id,
        deleted: true,
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.audiences.remove(id)).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
    "object": "audience",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });
});
