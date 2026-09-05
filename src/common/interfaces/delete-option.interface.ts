import type { RequestOptions } from './request-options.interface';

export interface DeleteOptions extends RequestOptions {
  headers?: HeadersInit;
}
