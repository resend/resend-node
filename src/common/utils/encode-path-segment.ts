const ALLOWED_IN_SEGMENT = /%(?:24|26|2B|2C|3A|3B|3D|40)/g;

/**
 * Percent-encodes a value for use as a single URL path segment. Characters
 * that would end the segment or the path (`/`, `?`, `#`, `%`, ...) are escaped,
 * while those RFC 3986 allows in a segment (such as `@` and `+`) are kept.
 */
export function encodePathSegment(value: string): string {
  return encodeURIComponent(value).replace(ALLOWED_IN_SEGMENT, (escaped) =>
    decodeURIComponent(escaped),
  );
}
