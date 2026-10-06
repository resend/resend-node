import PostalMime from 'postal-mime';
import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../common/utils/build-pagination-query';
import type { ErrorResponse } from '../../interfaces';
import type { Resend } from '../../resend';
import { Attachments } from './attachments/attachments';
import type {
  ForwardReceivingEmailOptions,
  ForwardReceivingEmailRequestOptions,
  ForwardReceivingEmailResponse,
  ForwardReceivingEmailResponseSuccess,
} from './interfaces/forward-receiving-email.interface';
import type {
  GetReceivingEmailOptions,
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

  async get(
    id: string,
    options: GetReceivingEmailOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<GetReceivingEmailResponse> {
    const searchParams = new URLSearchParams();

    if (options.html_format !== undefined) {
      searchParams.set('html_format', options.html_format);
    }

    const queryString = searchParams.toString();
    const path = queryString
      ? `/emails/receiving/${id}?${queryString}`
      : `/emails/receiving/${id}`;

    const data = await this.resend.get<GetReceivingEmailResponseSuccess>(
      path,
      requestOptions,
    );

    return data;
  }

  async list(
    options: ListReceivingEmailsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListReceivingEmailsResponse> {
    const url = buildPaginationUrl('/emails/receiving', options);

    const data = await this.resend.get<ListReceivingEmailsResponseSuccess>(
      url,
      requestOptions,
    );

    return data;
  }

  async forward(
    options: ForwardReceivingEmailOptions,
    requestOptions: ForwardReceivingEmailRequestOptions = {},
  ): Promise<ForwardReceivingEmailResponse> {
    const { emailId, to, from } = options;
    const passthrough = options.passthrough !== false;

    const emailResponse = await this.get(
      emailId,
      {},
      { signal: requestOptions.signal },
    );

    if (emailResponse.error) {
      return {
        data: null,
        error: emailResponse.error,
        headers: emailResponse.headers,
      };
    }

    const email = emailResponse.data;

    const originalSubject = email.subject || '(no subject)';

    if (passthrough) {
      return this.forwardPassthrough(
        email,
        {
          to,
          from,
          subject: originalSubject,
        },
        requestOptions,
      );
    }

    const forwardSubject = originalSubject.startsWith('Fwd:')
      ? originalSubject
      : `Fwd: ${originalSubject}`;

    return this.forwardWrapped(
      email,
      {
        to,
        from,
        subject: forwardSubject,
        text: 'text' in options ? options.text : undefined,
        html: 'html' in options ? options.html : undefined,
      },
      requestOptions,
    );
  }

  private async forwardPassthrough(
    email: GetReceivingEmailResponseSuccess,
    options: { to: string | string[]; from: string; subject: string },
    requestOptions: ForwardReceivingEmailRequestOptions,
  ): Promise<ForwardReceivingEmailResponse> {
    const { to, from, subject } = options;

    if (!email.raw?.download_url) {
      return {
        data: null,
        error: {
          name: 'validation_error',
          message: 'Raw email content is not available for this email',
          statusCode: 400,
        },
        headers: null,
      };
    }

    const raw = await this.downloadRaw(
      email.raw.download_url,
      requestOptions.signal,
    );

    if (raw.error) {
      return { data: null, error: raw.error, headers: null };
    }

    const parsed = await PostalMime.parse(raw.content, {
      attachmentEncoding: 'base64',
    });

    const attachments = parsed.attachments.map((attachment) => {
      const contentId = attachment.contentId
        ? attachment.contentId.replace(/^<|>$/g, '')
        : undefined;

      return {
        filename: attachment.filename,
        content: attachment.content.toString(),
        content_type: attachment.mimeType,
        content_id: contentId || undefined,
      };
    });

    const data = await this.resend.post<ForwardReceivingEmailResponseSuccess>(
      '/emails',
      {
        from,
        to,
        subject,
        text: parsed.text || undefined,
        html: parsed.html || undefined,
        attachments: attachments.length > 0 ? attachments : undefined,
      },
      requestOptions,
    );

    return data;
  }

  private async forwardWrapped(
    email: GetReceivingEmailResponseSuccess,
    options: {
      to: string | string[];
      from: string;
      subject: string;
      text?: string;
      html?: string;
    },
    requestOptions: ForwardReceivingEmailRequestOptions,
  ): Promise<ForwardReceivingEmailResponse> {
    const { to, from, subject, text, html } = options;

    if (!email.raw?.download_url) {
      return {
        data: null,
        error: {
          name: 'validation_error',
          message: 'Raw email content is not available for this email',
          statusCode: 400,
        },
        headers: null,
      };
    }

    const raw = await this.downloadRaw(
      email.raw.download_url,
      requestOptions.signal,
    );

    if (raw.error) {
      return { data: null, error: raw.error, headers: null };
    }

    const data = await this.resend.post<ForwardReceivingEmailResponseSuccess>(
      '/emails',
      {
        from,
        to,
        subject,
        text,
        html,
        attachments: [
          {
            filename: 'forwarded_message.eml',
            content: Buffer.from(raw.content).toString('base64'),
            content_type: 'message/rfc822',
          },
        ],
      },
      requestOptions,
    );

    return data;
  }

  private async downloadRaw(
    url: string,
    signal: AbortSignal | undefined,
  ): Promise<
    | { content: ArrayBuffer; error: null }
    | { content: null; error: ErrorResponse }
  > {
    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        return {
          content: null,
          error: {
            name: 'application_error',
            message: 'Failed to download raw email content',
            statusCode: response.status,
          },
        };
      }

      return { content: await response.arrayBuffer(), error: null };
    } catch {
      return {
        content: null,
        error: {
          name: 'application_error',
          message: 'Failed to download raw email content',
          statusCode: null,
        },
      };
    }
  }
}
