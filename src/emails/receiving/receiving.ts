import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  GetInboundEmailResponse,
  GetInboundEmailResponseSuccess,
} from './interfaces/get-inbound-email.interface';
import type {
  ListInboundEmailsOptions,
  ListInboundEmailsResponse,
  ListInboundEmailsResponseSuccess,
} from './interfaces/list-inbound-emails.interface';

export class Receiving {
  constructor(private readonly resend: Resend) {}

  async get(id: string): Promise<GetInboundEmailResponse> {
    const data = await this.resend.get<GetInboundEmailResponseSuccess>(
      `/emails/receiving/${id}`,
    );

    return data;
  }

  async list(
    options: ListInboundEmailsOptions = {},
  ): Promise<ListInboundEmailsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/emails/receiving?${queryString}`
      : '/emails/receiving';

    const data = await this.resend.get<ListInboundEmailsResponseSuccess>(url);

    return data;
  }
}
