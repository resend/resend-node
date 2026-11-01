const DOT_SEGMENT = /^(?:\.|%2e){1,2}$/i;

/**
 * Drops what URL parsing drops before it resolves dot segments: tabs and
 * newlines anywhere, and control characters or spaces at the end.
 */
function stripIgnoredCharacters(requestPath: string): string {
  let path = requestPath.replace(/[\t\n\r]/g, '');
  while (path.length > 0 && path.charCodeAt(path.length - 1) <= 0x20) {
    path = path.slice(0, -1);
  }
  return path;
}

/**
 * Whether a request path contains a `.` or `..` segment. URL parsing resolves
 * these (even when percent-encoded), so the request would reach another path.
 * In http(s) URLs a `\` separates segments the same way `/` does.
 */
export function hasDotSegment(requestPath: string): boolean {
  const [pathname] = stripIgnoredCharacters(requestPath).split(/[?#]/);
  return pathname.split(/[\\/]/).some((segment) => DOT_SEGMENT.test(segment));
}
