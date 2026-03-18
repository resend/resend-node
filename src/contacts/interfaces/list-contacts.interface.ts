// list-contacts.interface.ts
import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

export type ListContactsOptions = PaginationOptions & {
  segmentId?: string;
  /**
   * @deprecated Use segmentId instead to filter by segment
   */
  audienceId?: string;
};

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
  has_more: boolean;
}

export type ListContactsResponse = Response<ListContactsResponseSuccess>;
