export type ContactSegmentsBaseOptions =
  | {
      contactId: string;
      email?: never;
    }
  | {
      contactId?: never;
      email: string;
    };
