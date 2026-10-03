import { hasDotSegment, path } from './path';

describe('path', () => {
  it('leaves plain identifiers unchanged', () => {
    expect(path`/emails/${'4ef9a417-02e9-4d39-ad75-9611e0fcc33c'}`).toBe(
      '/emails/4ef9a417-02e9-4d39-ad75-9611e0fcc33c',
    );
  });

  it('encodes reserved characters in every interpolated value', () => {
    expect(path`/webhooks/${'a/b'}/events/${'c?d=e'}/replay`).toBe(
      '/webhooks/a%2Fb/events/c%3Fd%3De/replay',
    );
  });

  it('encodes characters that would start a fragment', () => {
    expect(path`/contacts/${'john#doe@example.com'}`).toBe(
      '/contacts/john%23doe%40example.com',
    );
  });

  it('prevents path traversal through a value', () => {
    expect(path`/contacts/${'../api-keys'}`).toBe('/contacts/..%2Fapi-keys');
  });

  it('returns a path without interpolations as is', () => {
    expect(path`/contacts`).toBe('/contacts');
  });
});

describe('hasDotSegment', () => {
  it.each([
    '/emails/..',
    '/emails/./cancel',
    '/emails/../cancel',
    '/emails/%2E%2E/cancel',
    '/emails/%2e.',
    '/emails/.%2E?limit=1',
  ])('detects a dot segment in %s', (requestPath) => {
    expect(hasDotSegment(requestPath)).toBe(true);
  });

  it.each([
    '/emails/4ef9a417-02e9-4d39-ad75-9611e0fcc33c',
    '/emails/...',
    '/emails/..%2Fapi-keys',
    '/emails/%252e%252e',
    '/contacts/john.doe%40example.com',
    '/templates?after=..',
  ])('allows %s', (requestPath) => {
    expect(hasDotSegment(requestPath)).toBe(false);
  });
});
