import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { SendEmailData } from './interfaces';
import { render } from 'react-email';

const VERSION = '0.2.1';

export default class Klotty {
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
      'User-Agent': `node:${VERSION}`,
      'Content-Type': 'application/json',
    };
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
    });
  }

  async sendEmail(data: SendEmailData): Promise<AxiosResponse> {
    try {
      const path = `${this.baseUrl}/email`;

      if (data.react) {
        data.html = render(data.react);
      }

      return this.request(path, { method: 'POST', data });
    } catch (error) {
      throw error;
    }
  }
}
