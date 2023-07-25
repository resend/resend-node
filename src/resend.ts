import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as React from 'react';
import { render } from '@react-email/render';
import { version } from '../package.json';
import { GetOptions, PostOptions, PutOptions } from './common/interfaces';
import { ApiKeys } from './api-keys/api-keys';
import { Domains } from './domains/domains';
import { Emails } from './emails/emails';
import { CreateEmailOptions, CreateEmailResponse } from './emails/interfaces';

export class Resend {
  readonly baseUrl: string;
  readonly userAgent: string;
  private readonly headers: HeadersInit;
  private readonly request: AxiosInstance;

  readonly apiKeys = new ApiKeys(this);
  readonly domains = new Domains(this);
  readonly emails = new Emails(this);

  constructor(readonly key?: string) {
    if (!key) {
      this.key = process.env.RESEND_API_KEY;

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Resend("re_123")`',
        );
      }
    }

    this.baseUrl = process.env.RESEND_BASE_URL || 'https://api.resend.com';
    this.userAgent = process.env.RESEND_USER_AGENT || `resend-node:${version}`;
    this.headers = {
      Authorization: `Bearer ${this.key}`,
      'User-Agent': this.userAgent,
      'Content-Type': 'application/json',
    };
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    this.request.interceptors.response.use(
      (response) => {
        if (response.data) {
          return response.data;
        }

        return response;
      },
      (error) => {
        if (error?.response?.data?.error) {
          return Promise.reject(error.response.data.error);
        }

        if (error?.response?.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      },
    );
  }

  async post<T>(path: string, entity?: any, options?: PostOptions): Promise<T> {
    const requestHeaders: any = {};
    try {
      return await this.request.post(path, entity, {
        params: options?.query,
        headers: requestHeaders,
      });
    } catch (error) {
      throw error;
    }
  }

  async get<T>(path: string, options: GetOptions = {}): Promise<T> {
    try {
      return await this.request.get(path, {
        params: options.query,
      });
    } catch (error) {
      throw error;
    }
  }

  async put(
    path: string,
    entity: any,
    options: PutOptions = {},
  ): Promise<AxiosResponse> {
    const requestHeaders: any = {};

    try {
      return await this.request.put(path, entity, {
        params: options.query,
        headers: requestHeaders,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(path: string, query?: any): Promise<AxiosResponse> {
    try {
      return await this.request.delete(path, {
        params: query,
      });
    } catch (error) {
      throw error;
    }
  }

  async sendEmail(data: CreateEmailOptions): Promise<CreateEmailResponse> {
    try {
      const path = `${this.baseUrl}/email`;

      if (data.react) {
        data.html = render(data.react as React.ReactElement);
        delete data.react;
      }

      const response = await this.post<CreateEmailResponse>(path, {
        from: data.from,
        to: data.to,
        bcc: data.bcc,
        cc: data.cc,
        reply_to: data.reply_to,
        subject: data.subject,
        text: data.text,
        html: data.html,
        attachments: data.attachments,
        tags: data.tags,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
