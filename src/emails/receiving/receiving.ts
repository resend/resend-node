import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import { Attachments } from './attachments/attachments';
import type {
  ForwardReceivingEmailOptions,
  ForwardReceivingEmailResponse,
  ForwardReceivingEmailResponseSuccess,
} from './interfaces/forward-receiving-email.interface';
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

  async forward(
    options: ForwardReceivingEmailOptions,
  ): Promise<ForwardReceivingEmailResponse> {
    const { emailId, to, from } = options;
    const passthrough = options.passthrough !== false;

    const emailResponse = await this.get(emailId);

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
      return this.forwardPassthrough(email, {
        to,
        from,
        subject: originalSubject,
      });
    }

    const forwardSubject = originalSubject.startsWith('Fwd:')
      ? originalSubject
      : `Fwd: ${originalSubject}`;

    return this.forwardWrapped(email, {
      to,
      from,
      subject: forwardSubject,
      text: 'text' in options ? options.text : undefined,
      html: 'html' in options ? options.html : undefined,
    });
  }

  private async forwardPassthrough(
    email: GetReceivingEmailResponseSuccess,
    options: { to: string | string[]; from: string; subject: string },
  ): Promise<ForwardReceivingEmailResponse> {
    const { to, from, subject } = options;

    const downloadedAttachments = await Promise.all(
      email.attachments.map(async (attachment) => {
        const attachmentDetails = await this.attachments.get({
          emailId: email.id,
          id: attachment.id,
        });

        if (attachmentDetails.error || !attachmentDetails.data.download_url) {
          return null;
        }

        const response = await fetch(attachmentDetails.data.download_url);
        if (!response.ok) {
          return null;
        }

        const buffer = await response.arrayBuffer();
        return {
          filename: attachment.filename,
          content: Buffer.from(buffer).toString('base64'),
          content_type: attachment.content_type,
          content_id: attachment.content_id || undefined,
        };
      }),
    );

    const validAttachments = downloadedAttachments.filter(
      (a): a is NonNullable<typeof a> => a !== null,
    );

    const data = await this.resend.post<ForwardReceivingEmailResponseSuccess>(
      '/emails',
      {
        from,
        to,
        subject,
        text: email.text || undefined,
        html: email.html || undefined,
        attachments: validAttachments.length > 0 ? validAttachments : undefined,
      },
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

    const rawResponse = await fetch(email.raw.download_url);

    if (!rawResponse.ok) {
      return {
        data: null,
        error: {
          name: 'application_error',
          message: 'Failed to download raw email content',
          statusCode: rawResponse.status,
        },
        headers: null,
      };
    }

    const rawEmailContent = await rawResponse.text();

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
            content: Buffer.from(rawEmailContent).toString('base64'),
            content_type: 'message/rfc822',
          },
        ],
      },
    );

    return data;
  }
}
