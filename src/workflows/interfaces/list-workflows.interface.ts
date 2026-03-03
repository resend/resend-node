import type { Response } from '../../interfaces';
import type { PaginationOptions } from '../../common/interfaces';
import type { Workflow } from './workflow';

export type ListWorkflowsOptions = PaginationOptions;

export interface ListWorkflowsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: Workflow[];
}

export type ListWorkflowsResponse = Response<ListWorkflowsResponseSuccess>;
