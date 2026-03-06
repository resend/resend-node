export interface WorkflowRunTrigger {
  event_name: string;
  payload?: Record<string, unknown>;
}

export type WorkflowRunStatus = 'running' | 'completed' | 'failed' | 'cancelled';

export interface WorkflowRun {
  object: 'workflow_run';
  id: string;
  status: WorkflowRunStatus;
  trigger: WorkflowRunTrigger | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type WorkflowRunItem = Pick<
  WorkflowRun,
  'id' | 'status' | 'trigger' | 'started_at' | 'completed_at' | 'created_at'
>;
