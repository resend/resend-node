import type {
  AutomationConnection,
  AutomationConnectionType,
  AutomationStep,
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

function parseStepConfig(step: AutomationStep): AutomationStepApiOptions {
  switch (step.type) {
    case 'trigger':
      return {
        key: step.key,
        type: step.type,
        config: { event_name: step.config.eventName },
      };
    case 'delay':
      return { key: step.key, type: step.type, config: step.config };
    case 'send_email':
      return {
        key: step.key,
        type: step.type,
        config: {
          template: {
            id: step.config.templateId,
            variables: step.config.variables,
          },
          subject: step.config.subject,
          from: step.config.from,
          reply_to: step.config.replyTo,
        },
      };
    case 'wait_for_event':
      return {
        key: step.key,
        type: step.type,
        config: {
          event_name: step.config.eventName,
          timeout: step.config.timeout,
          filter_rule: step.config.filterRule,
        },
      };
    case 'condition':
      return { key: step.key, type: step.type, config: step.config };
    case 'contact_update':
      return { key: step.key, type: step.type, config: step.config };
    case 'contact_delete':
      return { key: step.key, type: step.type, config: step.config };
    case 'add_to_segment':
      return { key: step.key, type: step.type, config: step.config };
  }
}

function parseConnection(
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
