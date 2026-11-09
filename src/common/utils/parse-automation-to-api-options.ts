import type {
  AddToSegmentStepConfig,
  AutomationConnection,
  AutomationConnectionType,
  AutomationStep,
  ContactUpdateStepConfig,
  SendEmailStepConfig,
  TriggerStepConfig,
  WaitForEventStepConfig,
} from '../../automations/interfaces/automation-step.interface';
import type { CreateAutomationOptions } from '../../automations/interfaces/create-automation-options.interface';
import type { SendEventOptions } from '../../events/interfaces/send-event.interface';

interface AutomationStepApiOptions {
  key: string;
  type: string;
  config: unknown;
}

interface AutomationConnectionApiOptions {
  from: string;
  to: string;
  type?: AutomationConnectionType;
}

interface AutomationApiOptions {
  name: string;
  status?: 'enabled' | 'disabled';
  steps?: AutomationStepApiOptions[];
  connections?: AutomationConnectionApiOptions[];
}

interface EventApiOptions {
  event: string;
  contact_id?: string;
  email?: string;
  payload?: Record<string, unknown>;
}

const TRIGGER_FIELDS = {
  eventName: 'event_name',
} as const satisfies Record<keyof TriggerStepConfig, string>;

const SEND_EMAIL_FIELDS = {
  template: 'template',
  subject: 'subject',
  from: 'from',
  replyTo: 'reply_to',
  topicId: 'topic_id',
} as const satisfies Record<keyof SendEmailStepConfig, string>;

const WAIT_FOR_EVENT_FIELDS = {
  eventName: 'event_name',
  timeout: 'timeout',
  filterRule: 'filter_rule',
} as const satisfies Record<keyof WaitForEventStepConfig, string>;

const CONTACT_UPDATE_FIELDS = {
  firstName: 'first_name',
  lastName: 'last_name',
  unsubscribed: 'unsubscribed',
  properties: 'properties',
} as const satisfies Record<keyof ContactUpdateStepConfig, string>;

const ADD_TO_SEGMENT_FIELDS = {
  segmentId: 'segment_id',
} as const satisfies Record<keyof AddToSegmentStepConfig, string>;

function renameFields<T extends object>(
  config: T,
  fields: Record<keyof T, string>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const sdkField of Object.keys(fields) as (keyof T)[]) {
    result[fields[sdkField]] = config[sdkField];
  }
  return result;
}

export function parseStepConfig(
  step: AutomationStep,
): AutomationStepApiOptions {
  switch (step.type) {
    case 'trigger':
      return {
        key: step.key,
        type: step.type,
        config: renameFields(step.config, TRIGGER_FIELDS),
      };
    case 'delay':
      return { key: step.key, type: step.type, config: step.config };
    case 'send_email':
      return {
        key: step.key,
        type: step.type,
        config: renameFields(step.config, SEND_EMAIL_FIELDS),
      };
    case 'wait_for_event':
      return {
        key: step.key,
        type: step.type,
        config: renameFields(step.config, WAIT_FOR_EVENT_FIELDS),
      };
    case 'condition':
      return { key: step.key, type: step.type, config: step.config };
    case 'contact_update':
      return {
        key: step.key,
        type: step.type,
        config: renameFields(step.config, CONTACT_UPDATE_FIELDS),
      };
    case 'contact_delete':
      return { key: step.key, type: step.type, config: step.config };
    case 'add_to_segment':
      return {
        key: step.key,
        type: step.type,
        config: renameFields(step.config, ADD_TO_SEGMENT_FIELDS),
      };
  }
}

export function parseConnection(
  connection: AutomationConnection,
): AutomationConnectionApiOptions {
  return {
    from: connection.from,
    to: connection.to,
    type: connection.type,
  };
}

export function parseAutomationToApiOptions(
  automation: CreateAutomationOptions,
): AutomationApiOptions {
  return {
    name: automation.name,
    status: automation.status,
    steps: automation.steps.map(parseStepConfig),
    connections: automation.connections.map(parseConnection),
  };
}

export function parseEventToApiOptions(
  event: SendEventOptions,
): EventApiOptions {
  return {
    event: event.event,
    contact_id: event.contactId,
    email: event.email,
    payload: event.payload,
  };
}
