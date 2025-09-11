import type { EmailApiOptions } from '../common/interfaces/email-api-options.interface';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';
import { render } from '../render';

export class Batch {
  constructor(private readonly resend: Resend) {}

  async send<Options extends CreateBatchRequestOptions>(
    payload: CreateBatchOptions,
    options?: Options,
  ): Promise<CreateBatchResponse<Options>> {
    return this.create(payload, options);
  }

  async create<Options extends CreateBatchRequestOptions>(
    payload: CreateBatchOptions,
    options?: Options,
  ): Promise<CreateBatchResponse<Options>> {
    const emails: EmailApiOptions[] = [];

    for (const email of payload) {
      if (email.react) {
        email.html = await render(email.react);
        email.react = undefined;
      }

      emails.push(parseEmailToApiOptions(email));
    }

    const data = await this.resend.post<CreateBatchSuccessResponse<Options>>(
      '/emails/batch',
      emails,
      {
        ...options,
        headers: {
          'x-batch-validation': options?.batchValidation ?? 'strict',
          ...options?.headers,
        },
      },
    );

    return data;
  }
}
