import type { ErrorResponse } from '../../interfaces';

export type RemoveContactsResponseSuccess = {
  object: 'contact';
  deleted: boolean;
  contact: string;
};

interface RemoveByOptions {
  /**
   * The contact id.
   *
   * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
   */
  id?: string;
  /**
   * The contact email.
   *
   * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
   */
  email?: string;
}

export interface RemoveContactOptions extends RemoveByOptions {
  audienceId: string;
}

export type RemoveContactsResponse =
  | {
      data: RemoveContactsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
