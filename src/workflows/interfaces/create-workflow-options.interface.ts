import type { Response } from '../../interfaces';
import type { WorkflowEdge, WorkflowStep } from './workflow-step.interface';

export interface CreateWorkflowOptions {
  name: string;
  status?: 'enabled' | 'disabled';
  steps: WorkflowStep[];
  edges: WorkflowEdge[];
}

export interface CreateWorkflowResponseSuccess {
  object: 'workflow';
  id: string;
}

export type CreateWorkflowResponse = Response<CreateWorkflowResponseSuccess>;
