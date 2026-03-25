import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { AutomationRunItem } from './automation-run';

export type ListAutomationRunsOptions = PaginationOptions & {
  automationId: string;
};

export type ListAutomationRunsResponseSuccess = PaginatedData<
  AutomationRunItem[]
>;

export type ListAutomationRunsResponse =
  Response<ListAutomationRunsResponseSuccess>;
