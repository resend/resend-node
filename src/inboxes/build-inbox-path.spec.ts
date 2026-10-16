import { buildInboxPath } from './build-inbox-path';
import type { InboxSelector } from './interfaces/inbox';

describe('buildInboxPath', () => {
  it('builds the path from the inbox ID', () => {
    expect(
      buildInboxPath({ inboxId: '430eed87-632a-4ea6-90db-0aace67ec228' }),
    ).toBe('/inboxes/430eed87-632a-4ea6-90db-0aace67ec228');
  });

  it('builds the path from the encoded inbox email address', () => {
    expect(
      buildInboxPath({ emailAddress: 'support+billing@example.com' }),
    ).toBe('/inboxes/support%2Bbilling%40example.com');
  });

  it('prefers the inbox ID when both are passed', () => {
    const selector = {
      inboxId: '430eed87-632a-4ea6-90db-0aace67ec228',
      emailAddress: 'support@example.com',
    } as unknown as InboxSelector;

    expect(buildInboxPath(selector)).toBe(
      '/inboxes/430eed87-632a-4ea6-90db-0aace67ec228',
    );
  });

  it('returns undefined without an inbox ID or email address', () => {
    expect(buildInboxPath({} as InboxSelector)).toBeUndefined();
    expect(
      buildInboxPath({
        inboxId: '',
        emailAddress: '',
      } as unknown as InboxSelector),
    ).toBeUndefined();
  });
});
