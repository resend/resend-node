import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export type RemoveContactsResponseSuccess = Pick<Contact, 'id'>;

export interface RemoveContactsResponse {
  data: RemoveContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
