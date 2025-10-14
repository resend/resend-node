export interface Broadcast {
  id: string;
  name: string;
  audience_id: string | null;
  from: string | null;
  subject: string | null;
  reply_to: string[] | null;
  preview_text: string | null;
  status: 'draft' | 'sent' | 'queued';
  created_at: string;
  scheduled_at: string | null;
  sent_at: string | null;
  html: string | null;
  text: string | null;
}
