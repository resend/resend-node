import { PostOptions } from '../../common/interfaces';
import { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';

export type CreateBatchOptions = CreateEmailOptions[];

export interface CreateBatchRequestOptions extends PostOptions {}

export interface CreateBatchResponse {
  data: {
    /** The ID of the newly created email. */
    id: string;
  }[];
}
