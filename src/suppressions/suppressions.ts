import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
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

const missingIdentifierError = {
  data: null,
  headers: null,
  error: {
    message: 'Missing `id` field.',
    statusCode: null,
    name: 'missing_required_field' as const,
  },
};

export class Suppressions {
  constructor(private readonly resend: Resend) {}

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
      return missingIdentifierError;
    }

    return this.resend.get<GetSuppressionResponseSuccess>(
      `/suppressions/${encodeURIComponent(idOrEmail)}`,
    );
  }

  async remove(idOrEmail: string): Promise<RemoveSuppressionResponse> {
    if (!idOrEmail) {
      return missingIdentifierError;
    }

    return this.resend.delete<RemoveSuppressionResponseSuccess>(
      `/suppressions/${encodeURIComponent(idOrEmail)}`,
    );
  }
}

function buildSuppressionsQuery(options: ListSuppressionsOptions): string {
  const { reason, ...pagination } = options;
  const searchParams = new URLSearchParams(buildPaginationQuery(pagination));

  if (reason) {
    searchParams.set('reason', reason);
  }

  return searchParams.toString();
}
