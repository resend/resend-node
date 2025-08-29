import type { Response } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type AddContactAudiencesResponse =
  Response<AddContactAudiencesResponseSuccess>;

export interface AddContactAudiencesResponseSuccess {
  id: string;
}

export type AddContactAudiencesOptions = ContactAudiencesBaseOptions & {
  audienceId: string;
};
