import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { WorkflowRunStepItem } from './workflow-run-step';

export type ListWorkflowRunStepsOptions = PaginationOptions & {
  workflowId: string;
  runId: string;
};

export type ListWorkflowRunStepsResponseSuccess = PaginatedData<
  WorkflowRunStepItem[]
>;

export type ListWorkflowRunStepsResponse =
  Response<ListWorkflowRunStepsResponseSuccess>;
