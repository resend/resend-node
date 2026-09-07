export interface InboxCursorQueryOptions {
  cursor?: string;
  folder?: string;
  query?: string;
  from?: string;
  label?: string | string[];
}

export function buildInboxCursorUrl(
  base: string,
  options: InboxCursorQueryOptions = {},
): string {
  const searchParams = new URLSearchParams();

  if (options.folder !== undefined) {
    searchParams.set('folder', options.folder);
  }

  if (options.query !== undefined) {
    searchParams.set('query', options.query);
  }

  if (options.from !== undefined) {
    searchParams.set('from', options.from);
  }

  if (options.cursor !== undefined) {
    searchParams.set('cursor', options.cursor);
  }

  const labels =
    options.label === undefined
      ? []
      : Array.isArray(options.label)
        ? options.label
        : [options.label];

  for (const label of labels) {
    searchParams.append('label', label);
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}
