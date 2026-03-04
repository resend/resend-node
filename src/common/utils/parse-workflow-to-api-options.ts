import type { SendEventOptions } from '../../events/interfaces/send-event.interface';
import type { CreateWorkflowOptions } from '../../workflows/interfaces/create-workflow-options.interface';
import type {
  WorkflowEdge,
  WorkflowEdgeType,
  WorkflowStep,
} from '../../workflows/interfaces/workflow-step.interface';

interface WorkflowStepApiOptions {
  ref: string;
  type: string;
  config: unknown;
}

interface WorkflowEdgeApiOptions {
  from: string;
  to: string;
  edge_type?: WorkflowEdgeType;
}

interface WorkflowApiOptions {
  name: string;
  status?: 'enabled' | 'disabled';
  steps?: WorkflowStepApiOptions[];
  edges?: WorkflowEdgeApiOptions[];
}

interface WorkflowEventApiOptions {
  event: string;
  contact_id?: string;
  email?: string;
  payload?: Record<string, unknown>;
}

function parseStepConfig(step: WorkflowStep): WorkflowStepApiOptions {
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

function parseEdge(edge: WorkflowEdge): WorkflowEdgeApiOptions {
  return {
    from: edge.from,
    to: edge.to,
    edge_type: edge.edgeType,
  };
}

export function parseWorkflowToApiOptions(
  workflow: CreateWorkflowOptions,
): WorkflowApiOptions {
  return {
    name: workflow.name,
    status: workflow.status,
    steps: workflow.steps?.map(parseStepConfig),
    edges: workflow.edges?.map(parseEdge),
  };
}

export function parseWorkflowEventToApiOptions(
  event: SendEventOptions,
): WorkflowEventApiOptions {
  return {
    event: event.event,
    contact_id: event.contactId,
    email: event.email,
    payload: event.payload,
  };
}
