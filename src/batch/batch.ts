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
    const emails = await Promise.all(
      payload.map(async (email) => {
        if (email.react) {
          const html = await render(email.react);
          return parseEmailToApiOptions({ ...email, html });
        }
        return parseEmailToApiOptions(email);
      }),
    );

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
