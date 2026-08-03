import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { GetUsageResponseSuccess } from './interfaces';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Usage', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('get', () => {
    it('gets usage', async () => {
      const response: GetUsageResponseSuccess = {
        object: 'usage',
        generated_at: '2024-11-01T18:10:00.000Z',
        emails: {
          daily: {
            used: 10,
            limit: 100,
            sent: 8,
            received: 2,
            resets_at: '2024-11-02T00:00:00.000Z',
          },
          monthly: {
            used: 100,
            limit: 3000,
            sent: 80,
            received: 20,
            resets_at: '2024-12-01T00:00:00.000Z',
          },
        },
        contacts: { used: 10, limit: 3000 },
        segments: { used: 1, limit: 3 },
        broadcasts: { used: 2, limit: null },
        ai_credits: { used: 5, limit: 100, next_increase_at: null },
        automation_runs: {
          used: 3,
          limit: 10000,
          resets_at: '2024-12-01T00:00:00.000Z',
        },
        domains: { used: 1, limit: 1 },
        rate_limit: { limit: 1000, duration: '1000ms' },
      };

      mockSuccessResponse(response, {
        headers: {},
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = await resend.usage.get();
      expect(result).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/usage',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });
});
