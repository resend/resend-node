import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { Workflow } from './workflow';

export type ListWorkflowsOptions = PaginationOptions;

export type ListWorkflowsResponseSuccess = PaginatedData<Workflow[]>;

export type ListWorkflowsResponse = Response<ListWorkflowsResponseSuccess>;
