import { version } from '../package.json';
import { ApiKeys } from './api-keys/api-keys';
import { Automations } from './automations/automations';
import { Batch } from './batch/batch';
import { Broadcasts } from './broadcasts/broadcasts';
import type {
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

export interface ResendOptions {
  baseUrl?: string;
  userAgent?: string;
  /** Default timeout in milliseconds per request attempt for every request. */
  timeoutMs?: number;
  /** Default maximum number of retries for retryable failures. */
  retries?: number;
}

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const seconds = Number(value);
  if (!Number.isNaN(seconds)) {
    return seconds * 1000;
  }

  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

type RequestAttempt<T> = {
  response: ResendResponse<T>;
  retryable: boolean;
  retryAfterMs?: number;
};

export class Resend {
  readonly baseUrl: string;
  readonly userAgent: string;
  readonly timeoutMs?: number;
  readonly retries?: number;
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
    this.timeoutMs = options?.timeoutMs;
    this.retries = options?.retries;

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
    const { signal, timeoutMs, retries, ...requestInit } = options;
    const maxRetries = retries ?? this.retries ?? 0;
    const timeout = timeoutMs ?? this.timeoutMs;

    for (let attempt = 0; ; attempt++) {
      let controller: AbortController | undefined;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let onAbort: (() => void) | undefined;
      let effectiveSignal = signal;

      if (timeout) {
        controller = new AbortController();
        effectiveSignal = controller.signal;

        if (signal) {
          if (signal.aborted) {
            controller.abort();
          } else {
            onAbort = () => controller?.abort();
            signal.addEventListener('abort', onAbort, { once: true });
          }
        }

        timer = setTimeout(() => controller?.abort(), timeout);
      }

      let result: RequestAttempt<T>;
      try {
        result = await this.performRequest<T>(path, {
          ...requestInit,
          signal: effectiveSignal,
        });
      } finally {
        if (timer) {
          clearTimeout(timer);
        }
        if (onAbort) {
          signal?.removeEventListener('abort', onAbort);
        }
      }

      const retryable =
        attempt < maxRetries && !effectiveSignal?.aborted && result.retryable;

      if (!retryable) {
        return result.response;
      }

      const backoffMs =
        result.retryAfterMs ?? Math.min(500 * 2 ** attempt, 10_000);
      await new Promise((resolve) =>
        setTimeout(resolve, backoffMs + Math.random() * 250),
      );
    }
  }

  private async performRequest<T>(
    path: string,
    init: RequestInit,
  ): Promise<RequestAttempt<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, init);

      if (!response.ok) {
        return {
          response: await this.buildErrorResponse(response, path),
          retryable:
            (response.status === 429 || response.status >= 500) &&
            !init.signal?.aborted,
          retryAfterMs: parseRetryAfter(response.headers.get('retry-after')),
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
        retryable: !init.signal?.aborted,
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
