import type { ErrorResponse } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type RemoveContactAudiencesOptions = ContactAudiencesBaseOptions & {
  audienceId: string;
};

export interface RemoveContactAudiencesResponseSuccess {
  id: string;
  deleted: boolean;
}

export type RemoveContactAudiencesResponse =
  | {
      data: RemoveContactAudiencesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
