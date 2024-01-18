import { ErrorResponse } from '../../interfaces';

export type RemoveContactsResponseSuccess = {
  object: 'contact';
  deleted: boolean;
  contact: string;
};

interface RemoveByOptions {
  /**
   * The contact id.
   *
   * @link https://resend.com/api-reference/contacts/delete-contact#body-parameters
   */
  id?: string;
  /**
   * The contact email.
   *
   * @link https://resend.com/api-reference/contacts/delete-contact#body-parameters
   */
  email?: string;
}

export interface RemoveContactOptions extends RemoveByOptions {
  audienceId: string;
}

export interface RemoveContactsResponse {
  data: RemoveContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
