import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  ListContactImportsOptions,
  ListContactImportsResponse,
  ListContactImportsResponseSuccess,
} from './interfaces/list-contact-imports.interface';

export class ContactImports {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListContactImportsOptions = {},
  ): Promise<ListContactImportsResponse> {
    const searchParams = new URLSearchParams(buildPaginationQuery(options));

    if (options.status !== undefined) {
      searchParams.set('status', options.status);
    }

    const queryString = searchParams.toString();
    const url = queryString
      ? `/contacts/imports?${queryString}`
      : '/contacts/imports';

    return this.resend.get<ListContactImportsResponseSuccess>(url);
  }
}
