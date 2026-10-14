import { buildInboxCursorUrl } from './build-inbox-cursor-query';

describe('buildInboxCursorUrl', () => {
  it('returns the base path when there are no options', () => {
    expect(buildInboxCursorUrl('/inboxes/1/threads')).toBe(
      '/inboxes/1/threads',
    );
  });

  it('encodes arrays as one comma-separated param', () => {
    expect(
      buildInboxCursorUrl('/inboxes/1/threads', {
        folders: ['inbox', 'archive'],
      }),
    ).toBe('/inboxes/1/threads?folders=inbox%2Carchive');
  });

  it('skips undefined values and keeps false', () => {
    expect(
      buildInboxCursorUrl('/inboxes/1/threads', {
        folders: undefined,
        read: false,
      }),
    ).toBe('/inboxes/1/threads?read=false');
  });
});
