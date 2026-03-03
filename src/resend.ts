import { version } from '../package.json';
import { ApiKeys } from './api-keys/api-keys';
import { Batch } from './batch/batch';
import { Broadcasts } from './broadcasts/broadcasts';
import type { GetOptions, PostOptions, PutOptions } from './common/interfaces';
import type { IdempotentRequest } from './common/interfaces/idempotent-request.interface';
import type { PatchOptions } from './common/interfaces/patch-option.interface';
import { ContactProperties } from './contact-properties/contact-properties';
import { Contacts } from './contacts/contacts';
import { Domains } from './domains/domains';
import { Emails } from './emails/emails';
import type { ErrorResponse, Response } from './interfaces';
import { Segments } from './segments/segments';
import { Templates } from './templates/templates';
import { Topics } from './topics/topics';
import { Webhooks } from './webhooks/webhooks';

const defaultBaseUrl = 'https://api.resend.com';
const defaultUserAgent = `resend-node:${version}`;

/** optional options when creating the client instead of env variables */
export type ResendClientOptions = {
  baseUrl?: string;
  userAgent?: string;
  /** custom fetch can be used for tests. */
  fetch?: typeof fetch;
};

function getEnv(name: string): string | undefined {
  if (typeof process === 'undefined' || !process.env) return undefined;
  return process.env[name];
}

export class Resend {
  private readonly headers: Headers;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly _key: string;

  readonly apiKeys = new ApiKeys(this);
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
  readonly webhooks = new Webhooks(this);
  readonly templates = new Templates(this);
  readonly topics = new Topics(this);

  constructor(key?: string, options?: ResendClientOptions) {
    const apiKey = key ?? getEnv('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error(
        'Missing API key. Pass it to the constructor `new Resend("re_123")` or set RESEND_API_KEY.',
      );
    }
    this._key = apiKey;

    this.baseUrl =
      options?.baseUrl ?? (getEnv('RESEND_BASE_URL') || defaultBaseUrl);
    const userAgent =
      options?.userAgent ?? (getEnv('RESEND_USER_AGENT') || defaultUserAgent);
    this.fetchImpl = options?.fetch ?? fetch;

    this.headers = new Headers({
      Authorization: `Bearer ${apiKey}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    });
  }

  get key(): string {
    return this._key;
  }

  async fetchRequest<T>(path: string, options = {}): Promise<Response<T>> {
    try {
      const response = await this.fetchImpl(`${this.baseUrl}${path}`, options);

      if (!response.ok) {
        try {
          const rawError = await response.text();
          return {
            data: null,
            error: JSON.parse(rawError),
            headers: Object.fromEntries(response.headers.entries()),
          };
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
              headers: Object.fromEntries(response.headers.entries()),
            };
          }

          const error: ErrorResponse = {
            message: response.statusText,
            statusCode: response.status,
            name: 'application_error',
          };

          if (err instanceof Error) {
            return {
              data: null,
              error: { ...error, message: err.message },
              headers: Object.fromEntries(response.headers.entries()),
            };
          }

          return {
            data: null,
            error,
            headers: Object.fromEntries(response.headers.entries()),
          };
        }
      }

      const data = await response.json();
      return {
        data,
        error: null,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch {
      return {
        data: null,
        error: {
          name: 'application_error',
          statusCode: null,
          message: 'Unable to fetch data. The request could not be resolved.',
        },
        headers: null,
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
