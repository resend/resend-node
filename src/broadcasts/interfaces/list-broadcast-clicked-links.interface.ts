import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';

export type ListBroadcastClickedLinksOptions = PaginationOptions;

export type BroadcastClickedLink = {
  /**
   * `id` is an opaque cursor for this row, used only for pagination.
   * It does not identify any entity in Resend.
   */
  id: string;
  url: string;
  clicks: number;
  unique_clicks: number;
};

export type ListBroadcastClickedLinksResponseSuccess = PaginatedData<
  BroadcastClickedLink[]
>;

export type ListBroadcastClickedLinksResponse =
  Response<ListBroadcastClickedLinksResponseSuccess>;
