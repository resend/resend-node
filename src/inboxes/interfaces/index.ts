export type * from '../drafts/interfaces';
export type * from '../labels/interfaces';
export type * from '../threads/interfaces';
export type {
  CreateInboxOptions,
  CreateInboxRequestOptions,
  CreateInboxResponse,
  CreateInboxResponseSuccess,
} from './create-inbox.interface';
export type {
  GetInboxResponse,
  GetInboxResponseSuccess,
} from './get-inbox.interface';
export type {
  Inbox,
  InboxLabelColor,
  InboxMessageFolder,
  MoveThreadFolder,
} from './inbox';
export {
  INBOX_LABEL_COLORS,
  INBOX_MESSAGE_FOLDERS,
  MOVE_THREAD_FOLDERS,
} from './inbox';
export type {
  ListInboxesOptions,
  ListInboxesResponse,
  ListInboxesResponseSuccess,
} from './list-inboxes.interface';
export type {
  RemoveInboxResponse,
  RemoveInboxResponseSuccess,
} from './remove-inbox.interface';
export type {
  UpdateInboxOptions,
  UpdateInboxResponse,
  UpdateInboxResponseSuccess,
} from './update-inbox.interface';
