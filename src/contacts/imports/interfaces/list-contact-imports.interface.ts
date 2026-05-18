import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { Response } from '../../../interfaces';

export type ContactImportStatus =
  | 'queued'
  | 'in_progress'
  | 'completed'
  | 'failed';

export type ListContactImportsOptions = PaginationOptions & {
  status?: ContactImportStatus;
};

export interface ContactImportCounts {
  total: number;
  created: number;
  updated: number;
  skipped: number;
  failed: number;
}

export interface ContactImport {
  object: 'contact_import';
  id: string;
  status: ContactImportStatus;
  created_at: string;
  completed_at: string | null;
  counts: ContactImportCounts;
}

export type ListContactImportsResponseSuccess = PaginatedData<ContactImport[]>;

export type ListContactImportsResponse =
  Response<ListContactImportsResponseSuccess>;
