import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { ApiContactProperty, ContactProperty } from './contact-property';

export type ListContactPropertiesOptions = PaginationOptions;

export type ListContactPropertiesResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: ApiContactProperty[];
};

export type ListContactPropertiesResponse = Response<{
  object: 'list';
  has_more: boolean;
  data: ContactProperty[];
}>;
