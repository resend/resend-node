import { getPaginationQueryProperties } from './get-pagination-query-properties';

describe('getPaginationQueryProperties', () => {
  it('returns empty string when no options provided', () => {
    expect(getPaginationQueryProperties()).toBe('');
    expect(getPaginationQueryProperties({})).toBe('');
  });

  it('builds query string with single parameter', () => {
    expect(getPaginationQueryProperties({ before: 'cursor1' })).toBe(
      '?before=cursor1',
    );
    expect(getPaginationQueryProperties({ after: 'cursor2' })).toBe(
      '?after=cursor2',
    );
    expect(getPaginationQueryProperties({ limit: 10 })).toBe('?limit=10');
  });

  it('builds query string with multiple parameters', () => {
    const result = getPaginationQueryProperties({
      before: 'cursor1',
      after: 'cursor2',
      limit: 25,
    });

    expect(result).toBe('?before=cursor1&after=cursor2&limit=25');
  });

  it('ignores undefined/null values', () => {
    expect(
      getPaginationQueryProperties({
        before: undefined,
        after: 'cursor2',
        limit: null,
      }),
    ).toBe('?after=cursor2');
  });
});
