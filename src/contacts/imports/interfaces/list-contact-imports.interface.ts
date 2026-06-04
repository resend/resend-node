import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { Response } from '../../../interfaces';
import type {
  ContactImport,
  ContactImportStatus,
} from './contact-import.interface';

export type ListContactImportsOptions = PaginationOptions & {
  status?: ContactImportStatus;
};

export type ListContactImportsResponseSuccess = PaginatedData<ContactImport[]>;

export type ListContactImportsResponse =
  Response<ListContactImportsResponseSuccess>;
