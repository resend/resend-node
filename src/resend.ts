import * as React from 'react';
import { render } from '@react-email/render';
import { version } from '../package.json';
import { GetOptions, PostOptions, PutOptions } from './common/interfaces';
import { ApiKeys } from './api-keys/api-keys';
import { Domains } from './domains/domains';
import { Emails } from './emails/emails';
import { CreateEmailOptions, CreateEmailResponse } from './emails/interfaces';

const baseUrl = process.env.RESEND_BASE_URL || 'https://api.resend.com';
const userAgent = process.env.RESEND_USER_AGENT || `resend-node:${version}`;

export class Resend {
  private readonly headers: Headers;

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

    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    });
  }

  async fetchRequest(path: string, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, options);

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    return await response.json();
  }

  async post<T>(
    path: string,
    entity?: any,
    options: PostOptions = {},
  ): Promise<T> {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return await this.fetchRequest(path, requestOptions);
  }

  async get<T>(path: string, options: GetOptions = {}): Promise<T> {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      ...options,
    };

    return await this.fetchRequest(path, requestOptions);
  }

  async put<T>(
    path: string,
    entity: any,
    options: PutOptions = {},
  ): Promise<T> {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return await this.fetchRequest(path, requestOptions);
  }

  async delete<T>(path: string, query?: any): Promise<T> {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return await this.fetchRequest(path, requestOptions);
  }

  async sendEmail(data: CreateEmailOptions): Promise<CreateEmailResponse> {
    const path = '/email';

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
  }
}
