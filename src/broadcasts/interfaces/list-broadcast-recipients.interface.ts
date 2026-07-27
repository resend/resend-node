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

// Each check uses the `[T] extends [...]` tuple form to opt out of
// distributive conditional types — a partial union like `'opened' |
// 'clicked'` must fall through to `BroadcastRecipientLoose` below rather
// than being evaluated member-by-member, which would incorrectly drop
// `clicked_links` (present for 'clicked') instead of making it optional.
export type BroadcastRecipient<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = [T] extends ['clicked']
  ? BroadcastRecipientBase & {
      count: number;
      clicked_links: BroadcastRecipientClickedLink[];
    }
  : [T] extends ['opened']
    ? BroadcastRecipientBase & { count: number }
    : [T] extends ['bounced']
      ? BroadcastRecipientBase & { bounce_type: BroadcastRecipientBounceType }
      : [T] extends [
            'sent' | 'delivered' | 'complained' | 'unsubscribed' | 'suppressed',
          ]
        ? BroadcastRecipientBase
        : BroadcastRecipientLoose;

export type ListBroadcastRecipientsResponseSuccess<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = PaginatedData<BroadcastRecipient<T>[]>;

export type ListBroadcastRecipientsResponse<
  T extends BroadcastRecipientEventType = BroadcastRecipientEventType,
> = Response<ListBroadcastRecipientsResponseSuccess<T>>;
