import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import type {
  BatchAddSuppressionsOptions,
  BatchAddSuppressionsResponse,
  BatchAddSuppressionsResponseSuccess,
  BatchRemoveSuppressionsOptions,
  BatchRemoveSuppressionsResponse,
  BatchRemoveSuppressionsResponseSuccess,
} from './interfaces';

export class Batch {
  constructor(private readonly resend: Resend) {}

  async add(
    options: BatchAddSuppressionsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<BatchAddSuppressionsResponse> {
    return this.resend.post<BatchAddSuppressionsResponseSuccess>(
      '/suppressions/batch/add',
      options,
      requestOptions,
    );
  }

  async remove(
    options: BatchRemoveSuppressionsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<BatchRemoveSuppressionsResponse> {
    return this.resend.post<BatchRemoveSuppressionsResponseSuccess>(
      '/suppressions/batch/remove',
      options,
      requestOptions,
    );
  }
}
