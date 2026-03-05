export interface WorkflowRun {
  object: 'workflow_run';
  id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type WorkflowRunItem = Pick<
  WorkflowRun,
  'id' | 'status' | 'started_at' | 'completed_at' | 'created_at'
>;
