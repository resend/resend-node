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

  describe('autoRetry', () => {
    it('does not retry by default when autoRetry is not configured', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      fetchMock.mockResponseOnce('{}', {
        status: 429,
        headers: { 'content-type': 'application/json' },
      });

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).not.toBeNull();
    });

    it('retries on HTTP 429 when autoRetry is true and honors Retry-After header', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: { 'content-type': 'application/json', 'retry-after': '0' },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('retries on HTTP 500 when autoRetry with maxRetries is configured', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: { maxRetries: 2 },
      });
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 500,
            headers: { 'content-type': 'application/json', 'retry-after': '0' },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('does not retry on non-retryable 4xx status codes', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponseOnce(
        JSON.stringify({ name: 'invalid_parameter', message: 'invalid' }),
        { status: 400, headers: { 'content-type': 'application/json' } },
      );

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).toEqual({
        name: 'invalid_parameter',
        message: 'invalid',
      });
    });

    it('per-request autoRetry enables retries when client default is disabled', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: { 'content-type': 'application/json', 'retry-after': '0' },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list({ autoRetry: true });

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('per-request autoRetry: false disables retries when client default is enabled', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponseOnce('{}', {
        status: 429,
        headers: { 'content-type': 'application/json' },
      });

      const result = await resend.apiKeys.list({ autoRetry: false });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).not.toBeNull();
    });

    it('retries on network fetch errors when autoRetry is enabled', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockRejectOnce(new Error('Network connection failed'));
      fetchMock.mockResponseOnce('{"id": "key-123"}', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('honors HTTP-Date formatted Retry-After header', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      const futureDate = new Date(Date.now() + 10).toUTCString();
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: {
              'content-type': 'application/json',
              'retry-after': futureDate,
            },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('stops retrying when AbortSignal is aborted during retry backoff', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: { maxRetries: 3 },
      });
      const controller = new AbortController();

      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: {
              'content-type': 'application/json',
              'retry-after': '5',
            },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const promise = resend.apiKeys.list({ signal: controller.signal });
      // Abort during backoff
      setTimeout(() => controller.abort(), 20);

      const result = await promise;

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).not.toBeNull();
    });

    it('returns the last error when all retries are exhausted', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: { maxRetries: 2 },
      });
      fetchMock.mockResponses(
        [
          JSON.stringify({
            name: 'rate_limit_exceeded',
            message: 'Rate limit',
          }),
          {
            status: 429,
            headers: { 'content-type': 'application/json', 'retry-after': '0' },
          },
        ],
        [
          JSON.stringify({
            name: 'rate_limit_exceeded',
            message: 'Rate limit',
          }),
          {
            status: 429,
            headers: { 'content-type': 'application/json', 'retry-after': '0' },
          },
        ],
        [
          JSON.stringify({
            name: 'rate_limit_exceeded',
            message: 'Final failure',
          }),
          { status: 429, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list();

      // Initial attempt (1) + 2 retries = 3 total requests
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(result.error?.message).toBe('Final failure');
    });

    it('falls back to backoff when Retry-After is malformed', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: {
              'content-type': 'application/json',
              'retry-after': 'not-a-number-or-date',
            },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.apiKeys.list();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'key-123' });
    });

    it('retries POST requests when autoRetry is enabled', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 500,
            headers: { 'content-type': 'application/json' },
          },
        ],
        [
          '{"id": "email-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'user@example.com',
        subject: 'Hello',
        html: '<p>Hi</p>',
      });

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ id: 'email-123' });
    });

    it('does not retry when a 200 response has an invalid non-JSON body', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockResponseOnce(
        '<html>502 Bad Gateway from Cloudflare</html>',
        {
          status: 200,
          headers: { 'content-type': 'text/html' },
        },
      );

      const result = await resend.apiKeys.list();

      // Must NOT retry - should fail on the first attempt
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.data).toBeNull();
      expect(result.error?.name).toBe('application_error');
      expect(result.error?.statusCode).toBeNull();
    });

    it('handles HTTP 204 No Content without error or retry', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: true,
      });
      fetchMock.mockOnce(async () => new Response(null, { status: 204 }));

      const result = await resend.fetchRequest('/test', { method: 'DELETE' });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).toBeNull();
      expect(result.data).toBeNull();
    });

    it('caps excessively large Retry-After values to 60 seconds', async () => {
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop', {
        autoRetry: { maxRetries: 1 },
      });
      const controller = new AbortController();

      fetchMock.mockResponses(
        [
          '{}',
          {
            status: 429,
            headers: {
              'content-type': 'application/json',
              'retry-after': '3600', // 1 hour
            },
          },
        ],
        [
          '{"id": "key-123"}',
          { status: 200, headers: { 'content-type': 'application/json' } },
        ],
      );

      const promise = resend.apiKeys.list({ signal: controller.signal });
      // Abort after 10ms so test doesn't wait
      setTimeout(() => controller.abort(), 10);

      const result = await promise;
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.error).not.toBeNull();
    });
  });
});
