import type { PaginatedList } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Template } from './template';

interface TemplateListItem
  extends Pick<
    Template,
    | 'id'
    | 'name'
    | 'created_at'
    | 'updated_at'
    | 'status'
    | 'published_at'
    | 'alias'
  > {}

export interface ListTemplatesResponseSuccess
  extends PaginatedList<TemplateListItem> {}

export type ListTemplatesResponse =
  | {
      data: ListTemplatesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
