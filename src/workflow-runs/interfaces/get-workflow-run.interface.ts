import type { Response } from '../../interfaces';
import type { WorkflowRun } from './workflow-run';

export interface GetWorkflowRunOptions {
  workflowId: string;
  runId: string;
}

export type GetWorkflowRunResponseSuccess = WorkflowRun;

export type GetWorkflowRunResponse = Response<GetWorkflowRunResponseSuccess>;
