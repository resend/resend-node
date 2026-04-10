import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { AutomationRunItem, AutomationRunStatus } from './automation-run';

export type ListAutomationRunsOptions = PaginationOptions & {
  automationId: string;
  status?: AutomationRunStatus | AutomationRunStatus[];
};

export type ListAutomationRunsResponseSuccess = PaginatedData<
  AutomationRunItem[]
>;

export type ListAutomationRunsResponse =
  Response<ListAutomationRunsResponseSuccess>;
