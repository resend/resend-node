import type { EmailApiOptions } from '../common/interfaces/email-api-options.interface';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
import { render } from '../render';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

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

    const useExperimental =
      typeof process !== 'undefined' && process.env
        ? process.env.RESEND_EXPERIMENTAL_BATCH !== 'false' &&
          process.env.RESEND_EXPERIMENTAL_BATCH !== '0'
        : true;
    const endpoint = useExperimental
      ? '/experimental/emails/batch'
      : '/emails/batch';

    const data = await this.resend.post<CreateBatchSuccessResponse<Options>>(
      endpoint,
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
