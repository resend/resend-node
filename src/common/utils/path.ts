/**
 * Tagged template that builds a request path, encoding every interpolated
 * value with `encodeURIComponent` so it stays a single path segment.
 *
 * @example path`/contacts/${email}` // '/contacts/john%23doe%40example.com'
 */
export function path(
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | null | undefined)[]
): string {
  return strings.reduce(
    (result, segment, index) =>
      index < values.length
        ? `${result}${segment}${encodeURIComponent(String(values[index]))}`
        : `${result}${segment}`,
    '',
  );
}

const DOT_SEGMENT = /^(?:\.|%2e){1,2}$/i;

/**
 * Whether a request path contains a `.` or `..` segment. URL parsing resolves
 * these (even when percent-encoded), so the request would reach another path.
 */
export function hasDotSegment(requestPath: string): boolean {
  const [pathname] = requestPath.split('?');
  return pathname.split('/').some((segment) => DOT_SEGMENT.test(segment));
}
