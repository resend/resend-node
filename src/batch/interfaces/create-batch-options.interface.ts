import type { PostOptions } from '../../common/interfaces';
import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import type { ErrorResponse } from '../../interfaces';

export type CreateBatchOptions = CreateEmailOptions[];

export interface CreateBatchRequestOptions extends PostOptions {}

export interface CreateBatchSuccessResponse {
  data: {
    /** The ID of the newly created email. */
    id: string;
  }[];
}

export interface CreateBatchResponse {
  data: CreateBatchSuccessResponse | null;
  error: ErrorResponse | null;
}
