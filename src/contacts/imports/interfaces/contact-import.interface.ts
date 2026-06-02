export type ContactImportStatus =
  | 'queued'
  | 'in_progress'
  | 'completed'
  | 'failed';

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
