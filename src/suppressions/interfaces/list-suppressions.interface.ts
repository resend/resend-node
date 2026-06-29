import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type {
  SuppressionListEntry,
  SuppressionReason,
} from './suppression-list-entry';

export type ListSuppressionsOptions = PaginationOptions & {
  reason?: SuppressionReason;
};

export type ListSuppressionsResponseSuccess = PaginatedData<
  SuppressionListEntry[]
>;

export type ListSuppressionsResponse =
  Response<ListSuppressionsResponseSuccess>;
