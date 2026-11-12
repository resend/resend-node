import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { EnableForgeResponseSuccess } from './interfaces/enable-forge.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const API_KEY = 're_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop';

const DOMAIN_ID = 'd91cd9bd-1176-453e-8fc1-35364d380206';

const forgeDomain: EnableForgeResponseSuccess = {
  object: 'domain',
  id: DOMAIN_ID,
  name: 'example.com',
  status: 'pending',
  created_at: '2026-11-11 10:00:00.000000+00',
  region: 'us-east-1',
  capabilities: {
    sending: 'enabled',
    receiving: 'disabled',
  },
  records: [
    {
      record: 'SPF',
      name: 'send',
      value: 'v=spf1 include:spf.resend.com ~all',
      type: 'TXT',
      ttl: 'Auto',
      status: 'pending',
    },
    {
      record: 'DKIM',
      name: 'resend._domainkey',
      value: 'resend._domainkey.example.com.dkim.resend.com.',
      type: 'CNAME',
      ttl: 'Auto',
      status: 'pending',
    },
  ],
  open_tracking: false,
  click_tracking: false,
};

describe('Forge', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('enable', () => {
    it('activates Forge and returns the full domain response', async () => {
      mockSuccessResponse(forgeDomain, { headers: {} });

      const resend = new Resend(API_KEY);
      const result = await resend.domains.forge.enable({
        id: DOMAIN_ID,
        returnPath: 'send',
      });

      expect(result).toEqual({
        data: forgeDomain,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${DOMAIN_ID}/forge`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            return_path: 'send',
          }),
          headers: expect.any(Headers),
        }),
      );
    });

    it('activates Forge without a return path', async () => {
      mockSuccessResponse(forgeDomain, { headers: {} });

      const resend = new Resend(API_KEY);
      const result = await resend.domains.forge.enable({ id: DOMAIN_ID });

      expect(result.data).toEqual(forgeDomain);
      expect(result.error).toBeNull();

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/domains/${DOMAIN_ID}/forge`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({}),
          headers: expect.any(Headers),
        }),
      );
    });
  });
});
