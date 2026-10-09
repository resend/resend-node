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
    requestOptions?: Options,
  ): Promise<CreateBatchResponse<Options>> {
    return this.create(payload, requestOptions);
  }

  async create<Options extends CreateBatchRequestOptions>(
    payload: CreateBatchOptions,
    requestOptions?: Options,
  ): Promise<CreateBatchResponse<Options>> {
    const emails: EmailApiOptions[] = [];

    for (const email of payload) {
      const body = { ...email };

      if (body.react) {
        body.html = await render(body.react);
        body.react = undefined;
      }

      emails.push(parseEmailToApiOptions(body));
    }

    const headers = new Headers({
      'x-batch-validation': requestOptions?.batchValidation ?? 'strict',
    });
    for (const [key, value] of new Headers(
      requestOptions?.headers || undefined,
    )) {
      headers.set(key, value);
    }

    const data = await this.resend.post<CreateBatchSuccessResponse<Options>>(
      '/emails/batch',
      emails,
      { ...requestOptions, headers },
    );

    return data;
  }
}
