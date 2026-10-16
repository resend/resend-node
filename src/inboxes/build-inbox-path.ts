import type { InboxSelector } from './interfaces/inbox';

export function buildInboxPath(selector: InboxSelector): string | undefined {
  const idOrEmail = selector.inboxId || selector.emailAddress;
  return idOrEmail ? `/inboxes/${encodeURIComponent(idOrEmail)}` : undefined;
}

export const missingInboxError = () => ({
  data: null,
  headers: null,
  error: {
    message: 'Missing `inboxId` or `emailAddress` field.',
    statusCode: null,
    name: 'missing_required_field' as const,
  },
});
