import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import { Batch } from './batch/batch';
import type {
  AddSuppressionOptions,
  AddSuppressionResponse,
  AddSuppressionResponseSuccess,
} from './interfaces/add-suppression.interface';
import type {
  GetSuppressionResponse,
  GetSuppressionResponseSuccess,
} from './interfaces/get-suppression.interface';
import type {
  ListSuppressionsOptions,
  ListSuppressionsResponse,
  ListSuppressionsResponseSuccess,
} from './interfaces/list-suppressions.interface';
import type {
  RemoveSuppressionResponse,
  RemoveSuppressionResponseSuccess,
} from './interfaces/remove-suppression.interface';

const missingIdentifierError = () => ({
  data: null,
  headers: null,
  error: {
    message: 'Missing `id` field.',
    statusCode: null,
    name: 'missing_required_field' as const,
  },
});

export class Suppressions {
  readonly batch: Batch;

  constructor(private readonly resend: Resend) {
    this.batch = new Batch(resend);
  }

  async add(options: AddSuppressionOptions): Promise<AddSuppressionResponse> {
    return this.resend.post<AddSuppressionResponseSuccess>(
      '/suppressions',
      options,
    );
  }

  async list(
    options: ListSuppressionsOptions = {},
  ): Promise<ListSuppressionsResponse> {
    const queryString = buildSuppressionsQuery(options);
    const url = queryString ? `/suppressions?${queryString}` : '/suppressions';

    return this.resend.get<ListSuppressionsResponseSuccess>(url);
  }

  async get(idOrEmail: string): Promise<GetSuppressionResponse> {
    if (!idOrEmail) {
      return missingIdentifierError();
    }

    return this.resend.get<GetSuppressionResponseSuccess>(
      `/suppressions/${encodeURIComponent(idOrEmail)}`,
    );
  }

  async remove(idOrEmail: string): Promise<RemoveSuppressionResponse> {
    if (!idOrEmail) {
      return missingIdentifierError();
    }

    return this.resend.delete<RemoveSuppressionResponseSuccess>(
      `/suppressions/${encodeURIComponent(idOrEmail)}`,
    );
  }
}

function buildSuppressionsQuery(options: ListSuppressionsOptions): string {
  const { origin, ...pagination } = options;
  const searchParams = new URLSearchParams(buildPaginationQuery(pagination));

  if (origin) {
    searchParams.set('origin', origin);
  }

  return searchParams.toString();
}
