import type { Response } from '../../interfaces';
import type { Workflow, WorkflowStatus } from './workflow';

export interface UpdateWorkflowOptions {
  status: WorkflowStatus;
}

export interface UpdateWorkflowResponseSuccess
  extends Pick<Workflow, 'id' | 'status'> {
  object: 'workflow';
}

export type UpdateWorkflowResponse = Response<UpdateWorkflowResponseSuccess>;
