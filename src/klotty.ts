import axios, { AxiosInstance } from 'axios';
import { render } from '@react-email/render';
import { SendEmailData } from './interfaces';
import { version } from '../package.json';

export class Klotty {
  readonly baseUrl: string;
  private readonly headers: HeadersInit;
  private readonly request: AxiosInstance;

  constructor(readonly apiKey?: string) {
    if (!apiKey) {
      this.apiKey = process.env.KLOTTY_API_KEY;

      if (!this.apiKey) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Klotty("kl_123")`',
        );
      }
    }

    this.apiKey = apiKey;
    this.baseUrl = process.env.KLOTTY_BASE_URL || 'https://api.klotty.com';
    this.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'User-Agent': `node:${version}`,
      'Content-Type': 'application/json',
    };
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
    });
  }

  async sendEmail(data: SendEmailData): Promise<object> {
    try {
      const path = `${this.baseUrl}/email`;

      if (data.react) {
        data.html = render(data.react);
        delete data.react;
      }

      const response = await this.request(path, { method: 'POST', data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
