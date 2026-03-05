export interface WorkflowRunStep {
  object: 'workflow_run_step';
  id: string;
  step_id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  output: unknown;
  error: string | null;
  callback_id: string | null;
  waiting_for_event_name: string | null;
}

export type WorkflowRunStepItem = Pick<
  WorkflowRunStep,
  'id' | 'step_id' | 'status' | 'started_at' | 'completed_at' | 'created_at'
>;
