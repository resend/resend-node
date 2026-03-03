export interface Workflow {
  object: 'workflow';
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string | null;
}
