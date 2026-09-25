import { version } from '../package.json';
import { ApiKeys } from './api-keys/api-keys';
import { Automations } from './automations/automations';
import { Batch } from './batch/batch';
import { Broadcasts } from './broadcasts/broadcasts';
import type {
  AutoRetryOption,
  DeleteOptions,
  GetOptions,
  PostOptions,
  PutOptions,
  RequestOptions,
} from './common/interfaces';
import type { IdempotentRequest } from './common/interfaces/idempotent-request.interface';
import type { PatchOptions } from './common/interfaces/patch-option.interface';
import { ContactProperties } from './contact-properties/contact-properties';
import { Contacts } from './contacts/contacts';
import { Domains } from './domains/domains';
import { Emails } from './emails/emails';
import { Events } from './events/events';
import type { ErrorResponse, Response as ResendResponse } from './interfaces';
import { Logs } from './logs/logs';
import { OAuthGrants } from './oauth-grants/oauth-grants';
import { Segments } from './segments/segments';
import { Suppressions } from './suppressions/suppressions';
import { Templates } from './templates/templates';
import { Topics } from './topics/topics';
import { Webhooks } from './webhooks/webhooks';

const defaultBaseUrl = 'https://api.resend.com';
const defaultUserAgent = `resend-node:${version}`;

function getDefaultBaseUrl(): string {
  return typeof process !== 'undefined' && process.env
    ? process.env.RESEND_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;
}

function getDefaultUserAgent(): string {
  return typeof process !== 'undefined' && process.env
    ? process.env.RESEND_USER_AGENT || defaultUserAgent
    : defaultUserAgent;
}

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  let delayMs: number | undefined;
  const seconds = Number(value);
  if (!Number.isNaN(seconds)) {
    delayMs = seconds * 1000;
  } else {
    const date = Date.parse(value);
    if (!Number.isNaN(date)) {
      delayMs = Math.max(0, date - Date.now());
    }
  }

  if (delayMs !== undefined) {
    // Cap at 60 seconds to prevent unbounded blocking
    return Math.min(delayMs, 60_000);
  }

  return undefined;
}

function resolveMaxRetries(
  perRequest?: AutoRetryOption,
  clientDefault?: AutoRetryOption,
): number {
  const target = perRequest !== undefined ? perRequest : clientDefault;
  if (target === true) {
    return 2;
  }
  if (typeof target === 'object' && target !== null) {
    return target.maxRetries ?? 2;
  }
  return 0;
}

type RequestAttempt<T> = {
  response: ResendResponse<T>;
  retryable: boolean;
  retryAfterMs?: number;
};

export interface ResendOptions {
  baseUrl?: string;
  userAgent?: string;
  /**
   * Automatic retry configuration for retryable failures (HTTP 429, 5xx, and network errors).
   * Disabled by default (`false`). Set to `true` (defaults to 2 retries) or `{ maxRetries: number }`.
   */
  autoRetry?: AutoRetryOption;
}

export class Resend {
  readonly baseUrl: string;
  readonly userAgent: string;
  readonly autoRetry?: AutoRetryOption;
  private readonly headers: Headers;

  readonly segments = new Segments(this);
  readonly apiKeys = new ApiKeys(this);
  /**
   * @deprecated Use segments instead
   */
  readonly audiences = this.segments;
  readonly automations = new Automations(this);
  readonly batch = new Batch(this);
  readonly broadcasts = new Broadcasts(this);
  readonly contactProperties = new ContactProperties(this);
  readonly contacts = new Contacts(this);
  readonly domains = new Domains(this);
  readonly emails = new Emails(this);
  readonly events = new Events(this);
  readonly logs = new Logs(this);
  readonly oauthGrants = new OAuthGrants(this);
  readonly suppressions = new Suppressions(this);
  readonly templates = new Templates(this);
  readonly topics = new Topics(this);
  readonly webhooks = new Webhooks(this);

  constructor(
    readonly key?: string,
    options?: ResendOptions,
  ) {
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

    this.baseUrl = options?.baseUrl ?? getDefaultBaseUrl();
    this.userAgent = options?.userAgent ?? getDefaultUserAgent();
    this.autoRetry = options?.autoRetry;

    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': this.userAgent,
      'Content-Type': 'application/json',
    });
  }

  private logError(error: ErrorResponse, path: string, status?: number): void {
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.error('[Resend API Error]:', {
        ...(status !== undefined && { status }),
        error,
        path,
      });
    }
  }

  async fetchRequest<T>(
    path: string,
    options: RequestOptions & RequestInit = {},
  ): Promise<ResendResponse<T>> {
    const { autoRetry, signal, ...requestInit } = options;
    const maxRetries = resolveMaxRetries(autoRetry, this.autoRetry);

    for (let attempt = 0; ; attempt++) {
      const result = await this.performRequest<T>(path, {
        ...requestInit,
        signal,
      });

      const retryable =
        attempt < maxRetries && !signal?.aborted && result.retryable;

      if (!retryable) {
        return result.response;
      }

      const backoffMs =
        result.retryAfterMs ?? Math.min(500 * 2 ** attempt, 10_000);
      const delayMs = backoffMs + Math.random() * 250;

      await new Promise<void>((resolve) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        let onAbort: (() => void) | undefined;

        if (signal) {
          if (signal.aborted) {
            return resolve();
          }
          onAbort = () => {
            if (timer) clearTimeout(timer);
            resolve();
          };
          signal.addEventListener('abort', onAbort, { once: true });
        }

        timer = setTimeout(() => {
          if (onAbort) signal?.removeEventListener('abort', onAbort);
          resolve();
        }, delayMs);
      });

      if (signal?.aborted) {
        return result.response;
      }
    }
  }

  private async performRequest<T>(
    path: string,
    init: RequestInit,
  ): Promise<RequestAttempt<T>> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, init);
    } catch {
      const error: ErrorResponse = {
        name: 'application_error',
        statusCode: null,
        message: 'Unable to fetch data. The request could not be resolved.',
      };

      this.logError(error, path);

      return {
        response: {
          data: null,
          error,
          headers: null,
        },
        retryable: !init.signal?.aborted,
      };
    }

    if (!response.ok) {
      let errorResponse: ResendResponse<never>;
      try {
        errorResponse = await this.buildErrorResponse(response, path);
      } catch {
        const error: ErrorResponse = {
          name: 'application_error',
          statusCode: response.status,
          message: response.statusText || 'Unable to fetch data.',
        };
        this.logError(error, path, response.status);
        errorResponse = {
          data: null,
          error,
          headers: null,
        };
      }

      return {
        response: errorResponse,
        retryable:
          (response.status === 429 || response.status >= 500) &&
          !init.signal?.aborted,
        retryAfterMs: parseRetryAfter(response.headers.get('retry-after')),
      };
    }

    try {
      if (response.status === 204) {
        return {
          response: {
            data: null as T,
            error: null,
            headers: Object.fromEntries(response.headers.entries()),
          },
          retryable: false,
        };
      }

      const data = await response.json();
      return {
        response: {
          data,
          error: null,
          headers: Object.fromEntries(response.headers.entries()),
        },
        retryable: false,
      };
    } catch {
      const error: ErrorResponse = {
        name: 'application_error',
        statusCode: null,
        message: 'Unable to fetch data. The request could not be resolved.',
      };

      this.logError(error, path);

      return {
        response: {
          data: null,
          error,
          headers: null,
        },
        retryable: false,
      };
    }
  }

  private async buildErrorResponse(
    response: Response,
    path: string,
  ): Promise<ResendResponse<never>> {
    try {
      const rawError = await response.text();
      const parsedError = JSON.parse(rawError);

      this.logError(parsedError, path, response.status);

      return {
        data: null,
        error: parsedError,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (err) {
      if (err instanceof SyntaxError) {
        const error: ErrorResponse = {
          name: 'application_error',
          statusCode: response.status,
          message:
            'Internal server error. We are unable to process your request right now, please try again later.',
        };

        this.logError(error, path, response.status);

        return {
          data: null,
          error,
          headers: Object.fromEntries(response.headers.entries()),
        };
      }

      const error: ErrorResponse = {
        message: response.statusText,
        statusCode: response.status,
        name: 'application_error',
      };

      if (err instanceof Error) {
        const errorWithMessage = { ...error, message: err.message };

        this.logError(errorWithMessage, path, response.status);

        return {
          data: null,
          error: errorWithMessage,
          headers: Object.fromEntries(response.headers.entries()),
        };
      }

      this.logError(error, path, response.status);

      return {
        data: null,
        error,
        headers: Object.fromEntries(response.headers.entries()),
      };
    }
  }

  async post<T>(
    path: string,
    entity?: unknown,
    options: PostOptions & IdempotentRequest = {},
  ) {
    const headers = new Headers(this.headers);
    const isFormData =
      typeof FormData !== 'undefined' && entity instanceof FormData;

    if (isFormData) {
      headers.delete('Content-Type');
    }

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
      body: isFormData ? entity : JSON.stringify(entity),
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

  async delete<T>(path: string, query?: unknown, options: DeleteOptions = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) {
      for (const [key, value] of new Headers(options.headers).entries()) {
        headers.set(key, value);
      }
    }
    const requestOptions = {
      method: 'DELETE',
      body: query === undefined ? undefined : JSON.stringify(query),
      ...options,
      headers,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
