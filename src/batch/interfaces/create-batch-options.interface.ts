import type { PostOptions } from '../../common/interfaces';
import type { IdempotentRequest } from '../../common/interfaces/idempotent-request.interface';
import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import type { Response } from '../../interfaces';

export type CreateBatchOptions = CreateEmailOptions[];

export interface CreateBatchRequestOptions
  extends PostOptions,
    IdempotentRequest {
  /**
   * @default 'strict'
   */
  batchValidation?: 'strict' | 'permissive';
}

export type CreateBatchSuccessResponse<
  Options extends CreateBatchRequestOptions = CreateBatchRequestOptions,
> = {
  data: {
    /** The ID of the newly created email. */
    id: string;
  }[];
} & (Options['batchValidation'] extends 'permissive'
  ? {
      /**
       * Only present when header "x-batch-validation" is set to 'permissive'.
       */
      errors: {
        /**
         * The index of the failed email in the batch
         */
        index: number;
        /**
         * The error message for the failed email
         */
        message: string;
      }[]; // This always being an array depends on us doing https://github.com/resend/resend-api/pull/2025/files#r2303897690
    }
  : Record<string, never>);

export type CreateBatchResponse<Options extends CreateBatchRequestOptions> =
  Response<CreateBatchSuccessResponse<Options>>;
