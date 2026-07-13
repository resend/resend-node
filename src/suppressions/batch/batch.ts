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
  ): Promise<BatchAddSuppressionsResponse> {
    return this.resend.post<BatchAddSuppressionsResponseSuccess>(
      '/suppressions/batch/add',
      options,
    );
  }

  async remove(
    options: BatchRemoveSuppressionsOptions,
  ): Promise<BatchRemoveSuppressionsResponse> {
    return this.resend.post<BatchRemoveSuppressionsResponseSuccess>(
      '/suppressions/batch/remove',
      options,
    );
  }
}
