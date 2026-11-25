import { buildQueryUrl } from './build-query-url';

describe('buildQueryUrl', () => {
  it('returns the base path when there are no options', () => {
    expect(buildQueryUrl('/inboxes/1/threads')).toBe('/inboxes/1/threads');
  });

  it('encodes arrays as one comma-separated param', () => {
    expect(
      buildQueryUrl('/inboxes/1/threads', {
        folders: ['inbox', 'archive'],
      }),
    ).toBe('/inboxes/1/threads?folders=inbox%2Carchive');
  });

  it('skips undefined values and keeps false', () => {
    expect(
      buildQueryUrl('/inboxes/1/threads', {
        folders: undefined,
        read: false,
      }),
    ).toBe('/inboxes/1/threads?read=false');
  });
});
