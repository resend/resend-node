import { path } from './path';

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
