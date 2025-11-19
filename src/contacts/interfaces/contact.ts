export interface Contact {
  created_at: string;
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  unsubscribed: boolean;
}

export type SelectingField =
  | {
      /**
       * The contact id.
       *
       * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
       */
      id: string;
      /**
       * The contact email.
       *
       * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
       */
      email?: undefined | null;
    }
  | {
      /**
       * The contact id.
       *
       * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
       */
      id?: undefined | null;
      /**
       * The contact email.
       *
       * @link https://resend.com/docs/api-reference/contacts/delete-contact#body-parameters
       */
      email: string;
    };
