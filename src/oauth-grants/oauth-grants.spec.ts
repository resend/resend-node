import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { ListOAuthGrantsResponseSuccess } from './interfaces/list-oauth-grants.interface';
import type { RevokeOAuthGrantResponseSuccess } from './interfaces/revoke-oauth-grant.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('OAuthGrants', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.resetMocks();
  });

  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    const response: ListOAuthGrantsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: '650e8400-e29b-41d4-a716-446655440001',
          client_id: '430eed87-632a-4ea6-90db-0aace67ec228',
          scopes: ['emails:send'],
          created_at: '2023-06-21T06:10:36.144Z',
          revoked_at: null,
          revoked_reason: null,
          client: {
            name: 'Resend CLI',
            logo_uri: 'https://example.com/logo.png',
          },
        },
        {
          id: '650e8400-e29b-41d4-a716-446655440002',
          client_id: '430eed87-632a-4ea6-90db-0aace67ec228',
          scopes: ['emails:send', 'domains:read'],
          created_at: '2023-06-20T06:10:36.144Z',
          revoked_at: '2023-06-22T06:10:36.144Z',
          revoked_reason: 'revoked_from_api',
          client: {
            name: 'Resend CLI',
            logo_uri: 'https://example.com/logo.png',
          },
        },
      ],
    };

    describe('when no pagination options are provided', () => {
      it('lists oauth grants', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.oauthGrants.list();
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/oauth/grants',
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

        const result = await resend.oauthGrants.list({ limit: 10 });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/oauth/grants?limit=10',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('revoke', () => {
    it('revokes an oauth grant', async () => {
      const id = '650e8400-e29b-41d4-a716-446655440001';
      const response: RevokeOAuthGrantResponseSuccess = {
        object: 'oauth_grant',
        id,
        revoked_at: '2023-06-22T06:10:36.144Z',
        revoked_reason: 'revoked_from_api',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.oauthGrants.revoke(id),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "650e8400-e29b-41d4-a716-446655440001",
            "object": "oauth_grant",
            "revoked_at": "2023-06-22T06:10:36.144Z",
            "revoked_reason": "revoked_from_api",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/oauth/grants/${id}`,
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.any(Headers),
        }),
      );
    });

    describe('when oauth grant not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'OAuth grant not found. Perhaps it was already revoked?',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.oauthGrants.revoke('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "OAuth grant not found. Perhaps it was already revoked?",
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
  });
});
