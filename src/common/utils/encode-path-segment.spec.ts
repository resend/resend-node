import { encodePathSegment } from './encode-path-segment';

describe('encodePathSegment', () => {
  it.each([
    ['a#b@example.com', 'a%23b@example.com'],
    ['a?b@example.com', 'a%3Fb@example.com'],
    ['a/b@example.com', 'a%2Fb@example.com'],
    ['100%@example.com', '100%25@example.com'],
    ['%40@example.com', '%2540@example.com'],
    ['a b@example.com', 'a%20b@example.com'],
  ])('escapes %s as %s', (value, expected) => {
    expect(encodePathSegment(value)).toBe(expected);
  });

  it.each([
    '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
    'team@resend.com',
    'user+tag@example.com',
    "o'brien&co=1;x,y:z$!*()@example.com",
  ])('keeps %s unchanged', (value) => {
    expect(encodePathSegment(value)).toBe(value);
  });
});
