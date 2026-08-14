import type { Resend } from '../resend';
import type { GetUsageResponse, GetUsageResponseSuccess } from './interfaces';

export class Usage {
  constructor(private readonly resend: Resend) {}

  async get(): Promise<GetUsageResponse> {
    const data = await this.resend.get<GetUsageResponseSuccess>('/usage');
    return data;
  }
}
