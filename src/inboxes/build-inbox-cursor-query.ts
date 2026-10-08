export type InboxCursorQueryOptions = Record<
  string,
  string | number | boolean | readonly string[] | undefined
>;

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
