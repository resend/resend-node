import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { WorkflowRunItem } from './workflow-run';

export type ListWorkflowRunsOptions = PaginationOptions & {
  workflowId: string;
};

export type ListWorkflowRunsResponseSuccess = PaginatedData<WorkflowRunItem[]>;

export type ListWorkflowRunsResponse =
  Response<ListWorkflowRunsResponseSuccess>;
