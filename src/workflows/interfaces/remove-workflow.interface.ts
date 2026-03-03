import type { Response } from '../../interfaces';
import type { Workflow } from './workflow';

export interface RemoveWorkflowResponseSuccess extends Pick<Workflow, 'id'> {
  object: 'workflow';
  deleted: boolean;
}

export type RemoveWorkflowResponse = Response<RemoveWorkflowResponseSuccess>;
