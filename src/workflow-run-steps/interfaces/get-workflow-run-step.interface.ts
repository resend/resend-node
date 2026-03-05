import type { Response } from '../../interfaces';
import type { WorkflowRunStep } from './workflow-run-step';

export interface GetWorkflowRunStepOptions {
  workflowId: string;
  runId: string;
  stepId: string;
}

export type GetWorkflowRunStepResponseSuccess = WorkflowRunStep;

export type GetWorkflowRunStepResponse =
  Response<GetWorkflowRunStepResponseSuccess>;
