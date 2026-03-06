import type { Response } from '../../interfaces';
import type { WorkflowEdge, WorkflowStep } from './workflow-step.interface';
import type { WorkflowStatus } from './workflow';

export interface CreateWorkflowOptions {
  name: string;
  status?: WorkflowStatus;
  steps: WorkflowStep[];
  edges: WorkflowEdge[];
}

export interface CreateWorkflowResponseSuccess {
  object: 'workflow';
  id: string;
}

export type CreateWorkflowResponse = Response<CreateWorkflowResponseSuccess>;
