import type { AutomationStepType } from '../../automations/interfaces/automation-step.interface';

export type AutomationRunStepStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'skipped'
  | 'waiting';

export interface AutomationRunStep {
  object: 'automation_run_step';
  id: string;
  step_id: string;
  type: AutomationStepType;
  config: Record<string, unknown>;
  status: AutomationRunStepStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type AutomationRunStepItem = Pick<
  AutomationRunStep,
  | 'id'
  | 'step_id'
  | 'type'
  | 'status'
  | 'started_at'
  | 'completed_at'
  | 'created_at'
>;
