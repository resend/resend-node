import { hasDotSegment } from './has-dot-segment';

describe('hasDotSegment', () => {
  it.each([
    '/emails/..',
    '/emails/./cancel',
    '/emails/../cancel',
    '/domains/../api-keys/key-id',
    '/emails/%2E%2E/cancel',
    '/emails/%2e.',
    '/emails/.%2E?limit=1',
    '/emails/..\\api-keys',
    '/domains/key-id\\..\\..\\api-keys',
    '/emails/.\t./cancel',
    '/emails/%2e\n%2e/cancel',
    '/emails/..\r',
    '/emails/.. ',
    '/emails/..\u0000',
  ])('detects a dot segment in %s', (requestPath) => {
    expect(hasDotSegment(requestPath)).toBe(true);
  });

  it.each([
    '/emails/4ef9a417-02e9-4d39-ad75-9611e0fcc33c',
    '/emails/...',
    '/emails/..%2Fapi-keys',
    '/contacts/john.doe@example.com',
    '/templates?after=..',
    '/emails/x#/..',
    '/emails/.. /cancel',
  ])('allows %s', (requestPath) => {
    expect(hasDotSegment(requestPath)).toBe(false);
  });
});
