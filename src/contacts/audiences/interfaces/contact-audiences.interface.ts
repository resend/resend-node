export type ContactAudiencesBaseOptions =
  | {
      contactId: string;
      email?: never;
    }
  | {
      contactId?: never;
      email: string;
    };
