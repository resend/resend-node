import type { RequestOptions } from './request-options.interface';

export interface GetOptions extends RequestOptions {
  query?: Record<string, unknown>;
  headers?: HeadersInit;
}
