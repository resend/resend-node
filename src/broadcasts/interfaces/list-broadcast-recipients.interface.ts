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

// When `T` isn't pinned to a specific event type (the generic default, or a
// dynamically-typed `type` value), every type-specific field is optional
// rather than fully absent, since we can't rule any of them out statically.
type BroadcastRecipientLoose = BroadcastRecipientBase & {
  count?: number;
  clicked_links?: BroadcastRecipientClickedLink[];
  bounce_type?: BroadcastRecipientBounceType;
};

export type BroadcastRecipient<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = BroadcastRecipientEventType extends T
  ? BroadcastRecipientLoose
  : BroadcastRecipientBase &
      (T extends 'opened' | 'clicked' ? { count: number } : unknown) &
      (T extends 'clicked'
        ? { clicked_links: BroadcastRecipientClickedLink[] }
        : unknown) &
      (T extends 'bounced'
        ? { bounce_type: BroadcastRecipientBounceType }
        : unknown);

export type ListBroadcastRecipientsResponseSuccess<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = PaginatedData<BroadcastRecipient<T>[]>;

export type ListBroadcastRecipientsResponse<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = Response<ListBroadcastRecipientsResponseSuccess<T>>;
