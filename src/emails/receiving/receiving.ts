import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import { Attachments } from './attachments/attachments';
import type {
  GetReceivingEmailResponse,
  GetReceivingEmailResponseSuccess,
} from './interfaces/get-receiving-email.interface';
import type {
  ListReceivingEmailsOptions,
  ListReceivingEmailsResponse,
  ListReceivingEmailsResponseSuccess,
} from './interfaces/list-receiving-emails.interface';

export class Receiving {
  readonly attachments: Attachments;

  constructor(private readonly resend: Resend) {
    this.attachments = new Attachments(resend);
  }

  async get(id: string): Promise<GetReceivingEmailResponse> {
    const data = await this.resend.get<GetReceivingEmailResponseSuccess>(
      `/emails/receiving/${id}`,
    );

    return data;
  }

  async list(
    options: ListReceivingEmailsOptions = {},
  ): Promise<ListReceivingEmailsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/emails/receiving?${queryString}`
      : '/emails/receiving';

    const data = await this.resend.get<ListReceivingEmailsResponseSuccess>(url);

    return data;
  }
}
