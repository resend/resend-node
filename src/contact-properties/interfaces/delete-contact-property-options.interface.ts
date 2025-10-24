import type { Response } from '../../interfaces';
import type { ContactProperty } from './contact-property';

export type RemoveContactPropertyResponseSuccess = Pick<
  ContactProperty,
  'id' | 'object'
> & {
  deleted: boolean;
};

export type RemoveContactPropertyResponse =
  Response<RemoveContactPropertyResponseSuccess>;
