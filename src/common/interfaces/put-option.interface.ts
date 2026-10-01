import type { RequestOptions } from './request-options.interface';

export interface PutOptions extends RequestOptions {
  query?: { [key: string]: unknown };
  headers?: HeadersInit;
}
