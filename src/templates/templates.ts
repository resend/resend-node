import type { Resend } from '../resend';
import type {
  CreateTemplateOptions,
  CreateTemplateResponse,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';

export class Templates {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateTemplateOptions,
  ): Promise<CreateTemplateResponse> {
    const data = await this.resend.post<CreateTemplateResponseSuccess>(
      '/templates',
      payload,
    );
    return data;
  }
}
