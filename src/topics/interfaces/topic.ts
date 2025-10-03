export interface Topic {
  id: string;
  name: string;
  description?: string;
  defaultSubscription: 'opt_in' | 'opt_out';
  created_at: string;
}
