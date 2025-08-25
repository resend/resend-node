import type { PostOptions } from '../../common/interfaces';
import type { IdempotentRequest } from '../../common/interfaces/idempotent-request.interface';
import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import type { Response } from '../../interfaces';

export type CreateBatchOptions = CreateEmailOptions[];

export interface CreateBatchRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface CreateBatchSuccessResponse {
  data: {
    /** The ID of the newly created email. */
    id: string;
  }[];
  errors?:
    | {
        // Only present when header "x-batch-validation" is present.
        // The index of the failed email in the batch
        index: number;
        // The error message for the failed email
        message: string;
      }[]
    | null;
}

export type CreateBatchResponse = Response<CreateBatchSuccessResponse>;
