import type { WorkflowStepType } from '../../workflows/interfaces/workflow-step.interface';

export interface WorkflowRunStep {
  object: 'workflow_run_step';
  id: string;
  step_id: string;
  type: WorkflowStepType;
  config: Record<string, unknown>;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type WorkflowRunStepItem = Pick<
  WorkflowRunStep,
  | 'id'
  | 'step_id'
  | 'type'
  | 'status'
  | 'started_at'
  | 'completed_at'
  | 'created_at'
>;
