import type { RequestOptions } from './request-options.interface';

export interface PostOptions extends RequestOptions {
  query?: { [key: string]: unknown };
  headers?: HeadersInit;
}
