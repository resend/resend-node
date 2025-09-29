import type { Resend } from '../resend';
import type {
  GetInboundEmailResponse,
  GetInboundEmailResponseSuccess,
} from './interfaces/get-inbound-email.interface';
import type { InboundEmailAttachment } from './interfaces/inbound-email';

export class Inbound {
  constructor(private readonly resend: Resend) {}

  private processAttachments(
    attachments: InboundEmailAttachment[] | null,
  ): InboundEmailAttachment[] | null {
    if (!attachments) return null;

    return attachments.map((attachment) => {
      if (attachment.content) {
        // Handle content that comes from JSON serialization with a data property
        if (
          typeof attachment.content === 'object' &&
          'data' in attachment.content &&
          Array.isArray((attachment.content as { data: number[] }).data)
        ) {
          return {
            ...attachment,
            content: Buffer.from(
              (attachment.content as { data: number[] }).data,
            ),
          };
        }

        // If content is a string (base64), convert to Buffer
        if (typeof attachment.content === 'string') {
          return {
            ...attachment,
            content: Buffer.from(attachment.content, 'base64'),
          };
        }
      }
      return attachment;
    });
  }

  async get(id: string): Promise<GetInboundEmailResponse> {
    const result = await this.resend.get<GetInboundEmailResponseSuccess>(
      `/emails/inbound/${id}`,
    );

    // Process attachments to convert content to Buffers
    if (result.data?.attachments) {
      return {
        ...result,
        data: {
          ...result.data,
          attachments: this.processAttachments(result.data.attachments),
        },
      };
    }

    return result;
  }
}
