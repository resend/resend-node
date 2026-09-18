import type { RequestOptions } from './request-options.interface';

export interface PatchOptions extends RequestOptions {
  query?: { [key: string]: unknown };
  headers?: HeadersInit;
}
