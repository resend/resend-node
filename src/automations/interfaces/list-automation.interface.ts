import type {
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination-options.interface';
import type { Response } from '../../interfaces';
import type { Automation } from './automation';

export type ListAutomationsOptions = PaginationOptions;

export type ListAutomationsResponseSuccess = PaginatedData<Automation[]>;

export type ListAutomationsResponse = Response<ListAutomationsResponseSuccess>;
