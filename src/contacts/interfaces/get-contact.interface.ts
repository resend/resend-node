import type { Response } from '../../interfaces';
import type { Contact, SelectingField } from './contact';

export type GetContactOptions =
  | string
  | ({
      audienceId?: string;
    } & SelectingField);

type ContactPropertyValue =
  | {
      type: 'string';
      value: string;
    }
  | {
      type: 'number';
      value: number;
    };

interface ContactProperties {
  [key: string]: ContactPropertyValue;
}

export interface GetContactResponseSuccess
  extends Pick<
    Contact,
    'id' | 'email' | 'created_at' | 'first_name' | 'last_name' | 'unsubscribed'
  > {
  object: 'contact';
  properties: ContactProperties;
}

export type GetContactResponse = Response<GetContactResponseSuccess>;
