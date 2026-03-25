import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { AutomationRunStepItem } from './automation-run-step';

export type ListAutomationRunStepsOptions = PaginationOptions & {
  automationId: string;
  runId: string;
};

export type ListAutomationRunStepsResponseSuccess = PaginatedData<
  AutomationRunStepItem[]
>;

export type ListAutomationRunStepsResponse =
  Response<ListAutomationRunStepsResponseSuccess>;
