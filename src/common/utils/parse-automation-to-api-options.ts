import type {
  AutomationEdge,
  AutomationEdgeType,
  AutomationStep,
} from '../../automations/interfaces/automation-step.interface';
import type { CreateAutomationOptions } from '../../automations/interfaces/create-automation-options.interface';
import type { SendEventOptions } from '../../events/interfaces/send-event.interface';

interface AutomationStepApiOptions {
  ref: string;
  type: string;
  config: unknown;
}

interface AutomationEdgeApiOptions {
  from: string;
  to: string;
  edge_type?: AutomationEdgeType;
}

interface AutomationApiOptions {
  name: string;
  status?: 'enabled' | 'disabled';
  steps?: AutomationStepApiOptions[];
  edges?: AutomationEdgeApiOptions[];
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
        ref: step.ref,
        type: step.type,
        config: { event_name: step.config.eventName },
      };
    case 'delay':
      return { ref: step.ref, type: step.type, config: step.config };
    case 'send_email':
      return {
        ref: step.ref,
        type: step.type,
        config: {
          template_id: step.config.templateId,
          subject: step.config.subject,
          from: step.config.from,
          reply_to: step.config.replyTo,
          variables: step.config.variables,
        },
      };
    case 'wait_for_event':
      return {
        ref: step.ref,
        type: step.type,
        config: {
          event_name: step.config.eventName,
          timeout_seconds: step.config.timeoutSeconds,
          filter_rule: step.config.filterRule,
        },
      };
    case 'condition':
      return { ref: step.ref, type: step.type, config: step.config };
  }
}

function parseEdge(edge: AutomationEdge): AutomationEdgeApiOptions {
  return {
    from: edge.from,
    to: edge.to,
    edge_type: edge.edgeType,
  };
}

export function parseAutomationToApiOptions(
  automation: CreateAutomationOptions,
): AutomationApiOptions {
  return {
    name: automation.name,
    status: automation.status,
    steps: automation.steps.map(parseStepConfig),
    edges: automation.edges.map(parseEdge),
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
