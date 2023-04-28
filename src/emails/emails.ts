import { Resend } from '../resend';
import {
  CreateEmailOptions,
  CreateEmailRequestOptions,
  CreateEmailResponse,
} from './interfaces';
import { GetEmailResponse } from './interfaces/get-email-options.interface';

export class Emails {
  constructor(private readonly resend: Resend) {}

  async send(
    payload: CreateEmailOptions,
    options: CreateEmailRequestOptions = {},
  ): Promise<CreateEmailResponse> {
    return this.create(payload, options);
  }

  async create(
    payload: CreateEmailOptions,
    options: CreateEmailRequestOptions = {},
  ): Promise<CreateEmailResponse> {
    const data = await this.resend.post<CreateEmailResponse>(
      '/emails',
      payload,
      options,
    );
    return data;
  }

  async get(id: string): Promise<GetEmailResponse> {
    const data = await this.resend.get<GetEmailResponse>(`/emails/${id}`);
    return data;
  }
}
