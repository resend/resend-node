import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';

export type ContactImportOnConflict = 'upsert' | 'skip';
export type ContactImportOnError = 'continue' | 'abort';
export type ContactImportPropertyType = 'string' | 'number' | 'boolean';

export interface ContactImportPropertyMapping {
  column: string;
  type?: ContactImportPropertyType;
}

export interface ContactImportColumnMap {
  email?: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: string;
  properties?: Record<string, ContactImportPropertyMapping>;
}

export interface ContactImportSegment {
  id: string;
}

export interface ContactImportTopic {
  id: string;
  subscription: 'opt_in' | 'opt_out';
}

export interface CreateContactImportOptions {
  file: Blob;
  fileName?: string;
  columnMap?: ContactImportColumnMap;
  onConflict?: ContactImportOnConflict;
  onError?: ContactImportOnError;
  segments?: ContactImportSegment[];
  topics?: ContactImportTopic[];
}

export interface CreateContactImportRequestOptions extends PostOptions {}

export interface CreateContactImportResponseSuccess {
  object: 'contact_import';
  id: string;
}

export type CreateContactImportResponse =
  Response<CreateContactImportResponseSuccess>;
