import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  ContactImportColumnMap,
  CreateContactImportOptions,
  CreateContactImportRequestOptions,
  CreateContactImportResponse,
  CreateContactImportResponseSuccess,
} from './interfaces/create-contact-import.interface';
import type {
  GetContactImportResponse,
  GetContactImportResponseSuccess,
} from './interfaces/get-contact-import.interface';
import type {
  ListContactImportsOptions,
  ListContactImportsResponse,
  ListContactImportsResponseSuccess,
} from './interfaces/list-contact-imports.interface';

export class ContactImports {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateContactImportOptions,
    options: CreateContactImportRequestOptions = {},
  ): Promise<CreateContactImportResponse> {
    const formData = this.buildCreateFormData(payload);

    return this.resend.post<CreateContactImportResponseSuccess>(
      '/contacts/imports',
      formData,
      options,
    );
  }

  async list(
    options: ListContactImportsOptions = {},
  ): Promise<ListContactImportsResponse> {
    const searchParams = new URLSearchParams(buildPaginationQuery(options));

    if (options.status !== undefined) {
      searchParams.set('status', options.status);
    }

    const queryString = searchParams.toString();
    const url = queryString
      ? `/contacts/imports?${queryString}`
      : '/contacts/imports';

    return this.resend.get<ListContactImportsResponseSuccess>(url);
  }

  async get(id: string): Promise<GetContactImportResponse> {
    return this.resend.get<GetContactImportResponseSuccess>(
      `/contacts/imports/${id}`,
    );
  }

  private buildCreateFormData(payload: CreateContactImportOptions): FormData {
    const formData = new FormData();

    if (payload.fileName !== undefined) {
      formData.append('file', payload.file, payload.fileName);
    } else {
      formData.append('file', payload.file);
    }

    this.appendJsonField(
      formData,
      'column_map',
      this.buildColumnMap(payload.columnMap),
    );
    this.appendStringField(formData, 'on_conflict', payload.onConflict);
    this.appendStringField(formData, 'on_error', payload.onError);
    this.appendJsonField(formData, 'segments', payload.segments);
    this.appendJsonField(formData, 'topics', payload.topics);

    return formData;
  }

  private buildColumnMap(columnMap?: ContactImportColumnMap) {
    if (columnMap === undefined) {
      return undefined;
    }

    return {
      email: columnMap.email,
      first_name: columnMap.firstName,
      last_name: columnMap.lastName,
      unsubscribed: columnMap.unsubscribed,
      properties: columnMap.properties,
    };
  }

  private appendJsonField(
    formData: FormData,
    name: string,
    value: unknown,
  ): void {
    if (value !== undefined) {
      formData.append(name, JSON.stringify(value));
    }
  }

  private appendStringField(
    formData: FormData,
    name: string,
    value: string | undefined,
  ): void {
    if (value !== undefined) {
      formData.append(name, value);
    }
  }
}
