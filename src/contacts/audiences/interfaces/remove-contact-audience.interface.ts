import type { Response } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type RemoveContactAudiencesResponse =
  Response<RemoveContactAudiencesResponseSuccess>;

export interface RemoveContactAudiencesResponseSuccess {
  id: string;
  deleted: boolean;
}

export type RemoveContactAudiencesOptions = ContactAudiencesBaseOptions & {
  audienceId: string;
};
