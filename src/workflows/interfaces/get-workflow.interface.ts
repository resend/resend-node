import type { Response } from '../../interfaces';
import type { Workflow } from './workflow';
import type {
  WorkflowResponseEdge,
  WorkflowResponseStep,
} from './workflow-step.interface';

export interface GetWorkflowResponseSuccess extends Workflow {
  steps: WorkflowResponseStep[];
  edges: WorkflowResponseEdge[];
}

export type GetWorkflowResponse = Response<GetWorkflowResponseSuccess>;
