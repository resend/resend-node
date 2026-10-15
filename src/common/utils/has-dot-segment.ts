const DOT_SEGMENT = /^(?:\.|%2e){1,2}$/i;

/**
 * Whether a request path contains a `.` or `..` segment. URL parsing resolves
 * these (even when percent-encoded), so the request would reach another path.
 */
export function hasDotSegment(requestPath: string): boolean {
  const [pathname] = requestPath.split(/[?#]/);
  return pathname.split('/').some((segment) => DOT_SEGMENT.test(segment));
}
