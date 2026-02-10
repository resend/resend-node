export interface Topic {
  id: string;
  name: string;
  description?: string;
  default_subscription: 'opt_in' | 'opt_out';
  created_at: string;
}
