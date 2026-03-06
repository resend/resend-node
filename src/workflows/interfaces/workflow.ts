export interface Workflow {
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string | null;
}

export type WorkflowStatus = Workflow['status'];
