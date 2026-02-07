import createFetchMock from 'vitest-fetch-mock';
import { Resend } from './resend';
import { mockSuccessResponse } from './test-utils/mock-fetch';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Resend', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('constructor options', () => {
    it('uses default baseUrl and userAgent when no options provided', () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      expect(resend.baseUrl).toBe('https://api.resend.com');
      expect(resend.userAgent).toMatch(/^resend-node:/);
    });

    it('uses custom baseUrl when options.baseUrl is provided', () => {
      const customBaseUrl = 'https://eu.api.resend.com';
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        baseUrl: customBaseUrl,
      });

      expect(resend.baseUrl).toBe(customBaseUrl);
    });

    it('uses custom userAgent when options.userAgent is provided', () => {
      const customUserAgent = 'my-app/1.0';
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        userAgent: customUserAgent,
      });

      expect(resend.userAgent).toBe(customUserAgent);
    });

    it('uses both custom baseUrl and userAgent when both provided', () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        baseUrl: 'https://custom.api.com',
        userAgent: 'custom-agent/2.0',
      });

      expect(resend.baseUrl).toBe('https://custom.api.com');
      expect(resend.userAgent).toBe('custom-agent/2.0');
    });

    it('uses RESEND_BASE_URL from env when no options.baseUrl provided', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_BASE_URL: 'https://env-base-url.example.com',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      expect(resend.baseUrl).toBe('https://env-base-url.example.com');

      process.env = originalEnv;
    });

    it('uses RESEND_USER_AGENT from env when no options.userAgent provided', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_USER_AGENT: 'env-user-agent/1.0',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      expect(resend.userAgent).toBe('env-user-agent/1.0');

      process.env = originalEnv;
    });

    it('options.baseUrl overrides RESEND_BASE_URL env', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_BASE_URL: 'https://env-base-url.example.com',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        baseUrl: 'https://options-base-url.example.com',
      });
      expect(resend.baseUrl).toBe('https://options-base-url.example.com');

      process.env = originalEnv;
    });

    it('options.userAgent overrides RESEND_USER_AGENT env', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_USER_AGENT: 'env-user-agent/1.0',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        userAgent: 'options-user-agent/2.0',
      });
      expect(resend.userAgent).toBe('options-user-agent/2.0');

      process.env = originalEnv;
    });
  });

  describe('fetchRequest with custom options', () => {
    it('sends request to custom baseUrl', async () => {
      const customBaseUrl = 'https://custom.api.resend.com';
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        baseUrl: customBaseUrl,
      });

      mockSuccessResponse({ id: 'key-123' }, { headers: {} });

      await resend.apiKeys.list();

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe(`${customBaseUrl}/api-keys`);
    });

    it('sends custom User-Agent in request headers', async () => {
      const customUserAgent = 'my-integration/3.0';
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        userAgent: customUserAgent,
      });

      mockSuccessResponse({ id: 'key-123' }, { headers: {} });

      await resend.apiKeys.list();

      const requestOptions = fetchMock.mock.calls[0][1];
      const headers = requestOptions?.headers as Headers;
      expect(headers.get('User-Agent')).toBe(customUserAgent);
    });
  });
});
