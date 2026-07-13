import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  ClaimDomainOptions,
  ClaimDomainResponseSuccess,
} from './interfaces/claim-domain-options.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const API_KEY = 're_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop';

const domainClaim: ClaimDomainResponseSuccess = {
  object: 'domain_claim',
  id: 'dacf4072-4119-4d88-932f-6c6126d3a9d1',
  name: 'example.com',
  status: 'pending',
  domain_id: 'd91cd9bd-1176-453e-8fc1-35364d380206',
  region: 'us-east-1',
  record: {
    type: 'TXT',
    name: 'example.com',
    value: 'resend-domain-verification=3f8a1c2d4e5b6a7f8091a2b3c4d5e6f7',
    ttl: 'Auto',
  },
  blocked_reason: null,
  failure_reason: null,
  created_at: '2026-06-16T17:12:02.059593+00:00',
  expires_at: '2026-06-23T17:12:02.059593+00:00',
};

describe('DomainClaims', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('starts a domain claim and maps options to a snake_case body', async () => {
      mockSuccessResponse(domainClaim, { headers: {} });

      const payload: ClaimDomainOptions = {
        name: 'example.com',
        region: 'us-east-1',
        customReturnPath: 'send',
        openTracking: true,
        clickTracking: false,
        trackingSubdomain: 'links',
      };

      const resend = new Resend(API_KEY);
      const result = await resend.domains.claims.create(payload);

      expect(result).toEqual({
        data: domainClaim,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/domains/claim',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'example.com',
            region: 'us-east-1',
            custom_return_path: 'send',
            open_tracking: true,
            click_tracking: false,
            tracking_subdomain: 'links',
          }),
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('get', () => {
    it('retrieves the latest claim for a domain', async () => {
      mockSuccessResponse(domainClaim, { headers: {} });

      const resend = new Resend(API_KEY);
      const result = await resend.domains.claims.get(
        'd91cd9bd-1176-453e-8fc1-35364d380206',
      );

      expect(result).toEqual({
        data: domainClaim,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/domains/d91cd9bd-1176-453e-8fc1-35364d380206/claim',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('verify', () => {
    it('triggers verification for a domain claim', async () => {
      mockSuccessResponse(domainClaim, { headers: {} });

      const resend = new Resend(API_KEY);
      const result = await resend.domains.claims.verify(
        'd91cd9bd-1176-453e-8fc1-35364d380206',
      );

      expect(result).toEqual({
        data: domainClaim,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/domains/d91cd9bd-1176-453e-8fc1-35364d380206/claim/verify',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers),
        }),
      );
    });
  });
});
