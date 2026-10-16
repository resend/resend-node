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

  it('does not fall back to the email address when the inbox ID is empty', () => {
    const selector = {
      inboxId: '',
      emailAddress: 'support@example.com',
    } as unknown as InboxSelector;

    expect(buildInboxPath(selector)).toBeUndefined();
  });

  it('uses the email address when the inbox ID is undefined', () => {
    expect(
      buildInboxPath({
        inboxId: undefined,
        emailAddress: 'support@example.com',
      }),
    ).toBe('/inboxes/support%40example.com');
  });

  it('returns undefined without a selector', () => {
    expect(
      buildInboxPath(undefined as unknown as InboxSelector),
    ).toBeUndefined();
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
