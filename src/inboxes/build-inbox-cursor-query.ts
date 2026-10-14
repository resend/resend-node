export interface InboxCursorQueryOptions {
  folders?: readonly string[];
  labels?: readonly string[];
  read?: boolean;
  query?: string;
  from?: readonly string[];
  to?: readonly string[];
  cc?: readonly string[];
  bcc?: readonly string[];
  has_attachment?: boolean;
  start_date?: string;
  end_date?: string;
  limit?: number;
  after?: string;
  before?: string;
}

export function buildInboxCursorUrl(
  base: string,
  options: InboxCursorQueryOptions = {},
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (value === undefined) {
      continue;
    }

    searchParams.set(
      key,
      Array.isArray(value) ? value.join(',') : String(value),
    );
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}
