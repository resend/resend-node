import type { EmailApiOptions } from '../common/interfaces/email-api-options.interface';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

export class Batch {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
  constructor(private readonly resend: Resend) {}

  async send<Options extends CreateBatchRequestOptions>(
    payload: CreateBatchOptions,
    options: CreateBatchRequestOptions = {},
  ): Promise<CreateBatchResponse<Options>> {
    return this.create(payload, options);
  }

  async create<Options extends CreateBatchRequestOptions>(
    payload: CreateBatchOptions,
    options: Options = {} as unknown as Options,
  ): Promise<CreateBatchResponse<Options>> {
    const emails: EmailApiOptions[] = [];

    for (const email of payload) {
      if (email.react) {
        if (!this.renderAsync) {
          try {
            const { renderAsync } = await import('@react-email/render');
            this.renderAsync = renderAsync;
          } catch {
            throw new Error(
              'Failed to render React component. Make sure to install `@react-email/render`',
            );
          }
        }

        email.html = await this.renderAsync(email.react as React.ReactElement);
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
          'x-batch-validation': options.batchValidation ?? 'strict',
          ...options.headers,
        },
      },
    );

    return data;
  }
}
