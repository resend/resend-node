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
  template: {
    id: string;
    variables?: Record<string, TemplateVariableValue>;
  };
  subject?: string;
  from?: string;
  replyTo?: string;
}

export interface WaitForEventStepConfig {
  eventName: string;
  timeout?: string;
  filterRule?: ConditionRule;
}

export type ConditionStepConfig = ConditionRule;

export interface ContactUpdateStepConfig {
  first_name?: string | null | { var: string };
  last_name?: string | null | { var: string };
  unsubscribed?: boolean | { var: string };
  properties?: Record<
    string,
    string | number | boolean | null | { var: string }
  >;
}

export type ContactDeleteStepConfig = Record<string, never>;

export interface AddToSegmentStepConfig {
  segment_id: string;
}

export type AutomationStep =
  | { key: string; type: 'trigger'; config: TriggerStepConfig }
  | { key: string; type: 'delay'; config: DelayStepConfig }
  | { key: string; type: 'send_email'; config: SendEmailStepConfig }
  | { key: string; type: 'wait_for_event'; config: WaitForEventStepConfig }
  | { key: string; type: 'condition'; config: ConditionStepConfig }
  | { key: string; type: 'contact_update'; config: ContactUpdateStepConfig }
  | { key: string; type: 'contact_delete'; config: ContactDeleteStepConfig }
  | { key: string; type: 'add_to_segment'; config: AddToSegmentStepConfig };

export type AutomationConnectionType =
  | 'default'
  | 'condition_met'
  | 'condition_not_met'
  | 'timeout'
  | 'event_received';

export interface AutomationConnection {
  from: string;
  to: string;
  type?: AutomationConnectionType;
}

export type AutomationStepType = AutomationStep['type'];

export interface AutomationResponseStep {
  key: string;
  type: AutomationStepType;
  config: Record<string, unknown>;
}

export interface AutomationResponseConnection {
  from: string;
  to: string;
  type: AutomationConnectionType;
}
