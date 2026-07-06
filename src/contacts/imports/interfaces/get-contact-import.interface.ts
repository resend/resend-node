import type { Response } from '../../../interfaces';
import type { ContactImport } from './contact-import.interface';

export type GetContactImportResponseSuccess = ContactImport;

export type GetContactImportResponse =
  Response<GetContactImportResponseSuccess>;
