import type { ErrorResponse } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type AddContactAudiencesOptions = ContactAudiencesBaseOptions & {
  audienceId: string;
};

export interface AddContactAudiencesResponseSuccess {
  id: string;
}

export type AddContactAudiencesResponse =
  | {
      data: AddContactAudiencesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
