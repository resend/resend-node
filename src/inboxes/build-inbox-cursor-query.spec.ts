import { buildInboxCursorUrl } from './build-inbox-cursor-query';

describe('buildInboxCursorUrl', () => {
  it('returns the base path when there are no options', () => {
    expect(buildInboxCursorUrl('/inboxes/1/threads')).toBe(
      '/inboxes/1/threads',
    );
  });

  it('encodes a single label as a repeated query param', () => {
    expect(buildInboxCursorUrl('/inboxes/1/threads', { label: 'urgent' })).toBe(
      '/inboxes/1/threads?label=urgent',
    );
  });

  it('encodes multiple labels as repeated query params', () => {
    expect(
      buildInboxCursorUrl('/inboxes/1/threads', {
        label: ['urgent', 'billing'],
      }),
    ).toBe('/inboxes/1/threads?label=urgent&label=billing');
  });
});
