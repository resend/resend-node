import type { InboxLabelColor } from '../../interfaces/inbox';

export interface InboxLabel {
  id: string;
  name: string;
  color: InboxLabelColor;
  created_at: string;
}
