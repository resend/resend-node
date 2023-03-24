import axios, { AxiosInstance } from 'axios';
import { render } from '@react-email/render';
import {
  SendEmailData,
  SendEmailRequest,
  SendEmailResponse,
} from './interfaces';
import { version } from '../package.json';

export class Resend {
  readonly baseUrl: string;
  private readonly headers: HeadersInit;
  private readonly request: AxiosInstance;

  constructor(readonly apiKey?: string) {
    if (!apiKey) {
      this.apiKey = process.env.RESEND_API_KEY;

      if (!this.apiKey) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Resend("re_123")`',
        );
      }
    }

    this.apiKey = apiKey;
    this.baseUrl = process.env.RESEND_BASE_URL || 'https://api.resend.com';
    this.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'User-Agent': `node:${version}`,
      'Content-Type': 'application/json',
    };
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }

  async sendEmail(data: SendEmailData): Promise<SendEmailResponse> {
    try {
      const path = `${this.baseUrl}/email`;

      if (data.react) {
        data.html = render(data.react);
        delete data.react;
      }

      const requestData: SendEmailRequest = {
        from: data.from,
        to: data.to,
        bcc: data.bcc,
        cc: data.cc,
        reply_to: data.reply_to,
        subject: data.subject,
        text: data.text,
        html: data.html,
        attachments: data.attachments,
      };

      const response = await this.request(path, {
        method: 'POST',
        data: requestData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
