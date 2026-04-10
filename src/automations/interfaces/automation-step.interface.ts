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
  duration: string;
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
  timeout?: string;
  filterRule?: ConditionRule;
}

export type ConditionStepConfig = ConditionRule;

export type AutomationStep =
  | { key: string; type: 'trigger'; config: TriggerStepConfig }
  | { key: string; type: 'delay'; config: DelayStepConfig }
  | { key: string; type: 'send_email'; config: SendEmailStepConfig }
  | { key: string; type: 'wait_for_event'; config: WaitForEventStepConfig }
  | { key: string; type: 'condition'; config: ConditionStepConfig };

export type AutomationEdgeType =
  | 'default'
  | 'condition_met'
  | 'condition_not_met'
  | 'timeout'
  | 'event_received';

export interface AutomationEdge {
  from: string;
  to: string;
  type?: AutomationEdgeType;
}

export type AutomationStepType = AutomationStep['type'];

export interface AutomationResponseStep {
  id: string;
  type: AutomationStepType;
  config: Record<string, unknown>;
}

export interface AutomationResponseEdge {
  id: string;
  from_step_id: string;
  to_step_id: string;
  type: AutomationEdgeType;
}
