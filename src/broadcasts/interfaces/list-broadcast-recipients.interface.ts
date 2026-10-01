import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';

export type BroadcastRecipientEventType =
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'complained'
  | 'unsubscribed'
  | 'suppressed';

export type BroadcastRecipientBounceType =
  | 'permanent'
  | 'transient'
  | 'undetermined';

export type ListBroadcastRecipientsOptions<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = PaginationOptions & {
  type: T;
  email?: string;
  bounceType?: T extends 'bounced' ? BroadcastRecipientBounceType : never;
};

export interface BroadcastRecipientClickedLink {
  url: string;
  clicks: number;
}

type BroadcastRecipientBase = {
  id: string;
  contact_id: string | null;
  email: string;
};

type BroadcastRecipientLoose = BroadcastRecipientBase & {
  count?: number;
  clicked_links?: BroadcastRecipientClickedLink[];
  bounce_type?: BroadcastRecipientBounceType;
};

// True for a union of 2+ members (including the full default union), false
// for a single literal. https://github.com/microsoft/TypeScript/issues/27024
type IsUnion<T, B = T> = T extends B ? ([B] extends [T] ? false : true) : never;

type BroadcastRecipientFieldsByType = {
  sent: unknown;
  delivered: unknown;
  opened: { count: number };
  clicked: { count: number; clicked_links: BroadcastRecipientClickedLink[] };
  bounced: { bounce_type: BroadcastRecipientBounceType };
  complained: unknown;
  unsubscribed: unknown;
  suppressed: unknown;
};

export type BroadcastRecipient<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> =
  IsUnion<T> extends true
    ? BroadcastRecipientLoose
    : BroadcastRecipientBase & BroadcastRecipientFieldsByType[T];

export type ListBroadcastRecipientsResponseSuccess<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = PaginatedData<BroadcastRecipient<T>[]>;

export type ListBroadcastRecipientsResponse<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = Response<ListBroadcastRecipientsResponseSuccess<T>>;
