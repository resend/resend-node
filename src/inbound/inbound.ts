import type { Resend } from '../resend';
import type {
  GetInboundEmailApiResponse,
  GetInboundEmailResponse,
  GetInboundEmailResponseSuccess,
} from './interfaces/get-inbound-email.interface';

export class Inbound {
  constructor(private readonly resend: Resend) {}

  async get(id: string): Promise<GetInboundEmailResponse> {
    const data = await this.resend.get<GetInboundEmailApiResponse>(
      `/emails/inbound/${id}`,
    );

    if (data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    const apiResponse = data.data;

    // Transform snake_case to camelCase
    const transformedData: GetInboundEmailResponseSuccess = {
      object: apiResponse.object,
      id: apiResponse.id,
      to: apiResponse.to,
      from: apiResponse.from,
      createdAt: apiResponse.created_at,
      subject: apiResponse.subject,
      bcc: apiResponse.bcc,
      cc: apiResponse.cc,
      replyTo: apiResponse.reply_to,
      html: apiResponse.html,
      text: apiResponse.text,
      headers: apiResponse.headers,
      attachments: apiResponse.attachments.map((attachment) => ({
        id: attachment.id,
        filename: attachment.filename,
        contentType: attachment.content_type,
        contentId: attachment.content_id,
        contentDisposition: attachment.content_disposition,
      })),
    };

    return {
      data: transformedData,
      error: null,
    };
  }
}
