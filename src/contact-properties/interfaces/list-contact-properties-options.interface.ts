import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { ApiContactProperty, ContactProperty } from './contact-property';

export type ListContactPropertiesOptions = PaginationOptions;

export type ListContactPropertiesResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: ApiContactProperty[];
};

export type ListContactPropertiesResponse =
  | {
      data: {
        object: 'list';
        has_more: boolean;
        data: ContactProperty[];
      };
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
