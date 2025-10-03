import type { PaginationOptions } from '../interfaces/pagination';
import { createPaginationQuery } from './create-pagination-query';

describe('createPaginationQuery', () => {
  it('creates the pagination query object with after', () => {
    const options: PaginationOptions<string> = {
      after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    };

    const query = createPaginationQuery(options);

    expect(query).toEqual({
      after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    });
  });

  it('creates the pagination query object with before', () => {
    const options: PaginationOptions<string> = {
      before: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    };

    const query = createPaginationQuery(options);

    expect(query).toEqual({
      before: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    });
  });

  it('creates the pagination query object with limit', () => {
    const options: PaginationOptions<string> = {
      limit: 10,
    };

    const query = createPaginationQuery(options);

    expect(query).toEqual({
      limit: 10,
    });
  });

  it('creates the pagination query object with both limit and a cursor option (after)', () => {
    const options: PaginationOptions<string> = {
      limit: 10,
      after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    };

    const query = createPaginationQuery(options);

    expect(query).toEqual({
      limit: 10,
      after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
    });
  });
});
