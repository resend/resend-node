export type QueryParamValue = string | number | boolean | readonly string[];

export function buildQueryUrl(
  base: string,
  params: Record<string, QueryParamValue | undefined> = {},
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
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
