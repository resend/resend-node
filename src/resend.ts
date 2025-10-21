import { version } from '../package.json';
import { ApiKeys } from './api-keys/api-keys';
import { Attachments } from './attachments/attachments';
import { Batch } from './batch/batch';
import { Broadcasts } from './broadcasts/broadcasts';
import type { GetOptions, PostOptions, PutOptions } from './common/interfaces';
import type { IdempotentRequest } from './common/interfaces/idempotent-request.interface';
import type { PatchOptions } from './common/interfaces/patch-option.interface';
import { ContactProperties } from './contact-properties/contact-properties';
import { Contacts } from './contacts/contacts';
import { Domains } from './domains/domains';
import { Emails } from './emails/emails';
import type { ErrorResponse } from './interfaces';
import { Segments } from './segments/segments';
import { Templates } from './templates/templates';
import { Topics } from './topics/topics';
import { Webhooks } from './webhooks/webhooks';

const defaultBaseUrl = 'https://api.resend.com';
const defaultUserAgent = `resend-node:${version}`;
const baseUrl =
  typeof process !== 'undefined' && process.env
    ? process.env.RESEND_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;
const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.RESEND_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class Resend {
  private readonly headers: Headers;

  readonly apiKeys = new ApiKeys(this);
  readonly attachments = new Attachments(this);
  readonly segments = new Segments(this);
  /**
   * @deprecated Use segments instead
   */
  readonly audiences = this.segments;
  readonly batch = new Batch(this);
  readonly broadcasts = new Broadcasts(this);
  readonly contacts = new Contacts(this);
  readonly contactProperties = new ContactProperties(this);
  readonly domains = new Domains(this);
  readonly emails = new Emails(this);
  readonly webhooks = new Webhooks();
  readonly templates = new Templates(this);
  readonly topics = new Topics(this);

  constructor(readonly key?: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env) {
        this.key = process.env.RESEND_API_KEY;
      }

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

  async fetchRequest<T>(
    path: string,
    options = {},
  ): Promise<{ data: T; error: null } | { data: null; error: ErrorResponse }> {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);

      if (!response.ok) {
        try {
          const rawError = await response.text();
          return { data: null, error: JSON.parse(rawError) };
        } catch (err) {
          if (err instanceof SyntaxError) {
            return {
              data: null,
              error: {
                name: 'application_error',
                statusCode: response.status,
                message:
                  'Internal server error. We are unable to process your request right now, please try again later.',
              },
            };
          }

          const error: ErrorResponse = {
            message: response.statusText,
            statusCode: response.status,
            name: 'application_error',
          };

          if (err instanceof Error) {
            return { data: null, error: { ...error, message: err.message } };
          }

          return { data: null, error };
        }
      }

      const data = await response.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: {
          name: 'application_error',
          statusCode: null,
          message: 'Unable to fetch data. The request could not be resolved.',
        },
      };
    }
  }

  async post<T>(
    path: string,
    entity?: unknown,
    options: PostOptions & IdempotentRequest = {},
  ) {
    const headers = new Headers(this.headers);
    if (options.headers) {
      for (const [key, value] of new Headers(options.headers).entries()) {
        headers.set(key, value);
      }
    }
    if (options.idempotencyKey) {
      headers.set('Idempotency-Key', options.idempotencyKey);
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(entity),
      ...options,
      headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async get<T>(path: string, options: GetOptions = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) {
      for (const [key, value] of new Headers(options.headers).entries()) {
        headers.set(key, value);
      }
    }
    const requestOptions = {
      method: 'GET',
      ...options,
      headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async put<T>(path: string, entity: unknown, options: PutOptions = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) {
      for (const [key, value] of new Headers(options.headers).entries()) {
        headers.set(key, value);
      }
    }
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(entity),
      ...options,
      headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async patch<T>(path: string, entity: unknown, options: PatchOptions = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) {
      for (const [key, value] of new Headers(options.headers).entries()) {
        headers.set(key, value);
      }
    }
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(entity),
      ...options,
      headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      body: JSON.stringify(query),
      headers: this.headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
