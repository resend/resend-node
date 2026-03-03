import type { Response } from '../../interfaces';

export interface UpdateWorkflowOptions {
  status: 'enabled' | 'disabled';
}

export interface UpdateWorkflowResponseSuccess {
  object: 'workflow';
  id: string;
  status: 'enabled' | 'disabled';
}

export type UpdateWorkflowResponse = Response<UpdateWorkflowResponseSuccess>;
