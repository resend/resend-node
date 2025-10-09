import type { Resend } from '../../resend';
import type {
  GetInboundEmailResponse,
  GetInboundEmailResponseSuccess,
} from './interfaces/get-inbound-email.interface';

export class Receiving {
  constructor(private readonly resend: Resend) {}

  async get(id: string): Promise<GetInboundEmailResponse> {
    const data = await this.resend.get<GetInboundEmailResponseSuccess>(
      `/emails/receiving/${id}`,
    );

    return data;
  }
}
