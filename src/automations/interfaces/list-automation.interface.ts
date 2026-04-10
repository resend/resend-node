import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { Automation, AutomationStatus } from './automation';

export type ListAutomationsOptions = PaginationOptions & {
  status?: AutomationStatus;
};

export type ListAutomationsResponseSuccess = PaginatedData<Automation[]>;

export type ListAutomationsResponse = Response<ListAutomationsResponseSuccess>;
