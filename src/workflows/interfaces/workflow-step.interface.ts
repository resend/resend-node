export type ConditionRule =
  | {
      type: 'rule';
      field: string;
      operator: 'eq' | 'neq';
      value: string | number | boolean | null;
    }
  | {
      type: 'rule';
      field: string;
      operator: 'gt' | 'gte' | 'lt' | 'lte';
      value: number;
    }
  | {
      type: 'rule';
      field: string;
      operator: 'contains' | 'starts_with' | 'ends_with';
      value: string;
    }
  | {
      type: 'rule';
      field: string;
      operator: 'exists' | 'is_empty';
    }
  | { type: 'and'; rules: ConditionRule[] }
  | { type: 'or'; rules: ConditionRule[] };

export type TemplateVariableValue =
  | string
  | number
  | boolean
  | { var: string }
  | Record<string, string | number | boolean>
  | Array<
      string | number | boolean | Record<string, string | number | boolean>
    >;

export interface TriggerStepConfig {
  eventName: string;
}

export interface DelayStepConfig {
  seconds: number;
}

export interface SendEmailStepConfig {
  templateId: string;
  subject?: string;
  from?: string;
  replyTo?: string;
  variables?: Record<string, TemplateVariableValue>;
}

export interface WaitForEventStepConfig {
  eventName: string;
  timeoutSeconds?: number;
  filterRule?: ConditionRule;
}

export type ConditionStepConfig = ConditionRule;

export type WorkflowStep =
  | { ref: string; type: 'trigger'; config: TriggerStepConfig }
  | { ref: string; type: 'delay'; config: DelayStepConfig }
  | { ref: string; type: 'send_email'; config: SendEmailStepConfig }
  | { ref: string; type: 'wait_for_event'; config: WaitForEventStepConfig }
  | { ref: string; type: 'condition'; config: ConditionStepConfig };

export type WorkflowEdgeType =
  | 'default'
  | 'condition_met'
  | 'condition_not_met'
  | 'timeout'
  | 'event_received';

export interface WorkflowEdge {
  from: string;
  to: string;
  edgeType?: WorkflowEdgeType;
}

export type WorkflowStepType = WorkflowStep['type'];

export interface WorkflowResponseStep {
  id: string;
  type: WorkflowStepType;
  config: Record<string, unknown>;
}

export interface WorkflowResponseEdge {
  id: string;
  from_step_id: string;
  to_step_id: string;
  edge_type: WorkflowEdgeType;
}
