import type { RequestOptions } from '../common/interfaces/request-options.interface';
import type { Resend } from '../resend';
import type { GetUsageResponse, GetUsageResponseSuccess } from './interfaces';

export class Usage {
  constructor(private readonly resend: Resend) {}

  async get(requestOptions: RequestOptions = {}): Promise<GetUsageResponse> {
    const data = await this.resend.get<GetUsageResponseSuccess>(
      '/usage',
      requestOptions,
    );
    return data;
  }
}
