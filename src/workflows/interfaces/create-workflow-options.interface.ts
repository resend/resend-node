import type { Response } from '../../interfaces';
import type { Workflow } from './workflow';
import type {
  WorkflowEdge,
  WorkflowResponseEdge,
  WorkflowResponseStep,
  WorkflowStep,
} from './workflow-step.interface';

export interface CreateWorkflowOptions {
  name: string;
  status?: 'enabled' | 'disabled';
  steps: WorkflowStep[];
  edges: WorkflowEdge[];
}

export interface CreateWorkflowResponseSuccess extends Workflow {
  steps: WorkflowResponseStep[];
  edges: WorkflowResponseEdge[];
}

export type CreateWorkflowResponse = Response<CreateWorkflowResponseSuccess>;
