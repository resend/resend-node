import type { ErrorResponse } from '../../interfaces';
import type { ContactProperty } from './contact-property';

export type RemoveContactPropertyResponseSuccess = Pick<
  ContactProperty,
  'id' | 'object'
> & {
  deleted: boolean;
};

export interface RemoveContactPropertyResponse {
  data: RemoveContactPropertyResponseSuccess | null;
  error: ErrorResponse | null;
}
