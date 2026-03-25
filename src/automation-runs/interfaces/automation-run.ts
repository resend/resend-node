export interface AutomationRunTrigger {
  event_name: string;
  payload?: Record<string, unknown>;
}

export type AutomationRunStatus =
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface AutomationRun {
  object: 'automation_run';
  id: string;
  status: AutomationRunStatus;
  trigger: AutomationRunTrigger | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type AutomationRunItem = Pick<
  AutomationRun,
  'id' | 'status' | 'trigger' | 'started_at' | 'completed_at' | 'created_at'
>;
