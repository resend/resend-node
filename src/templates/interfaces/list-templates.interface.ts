
import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Template } from './template';

export type ListTemplatesOptions = PaginationOptions;

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

export interface ListTemplatesResponseSuccess {
  object: 'list';
  data: TemplateListItem[];
  has_more: boolean;
}

export type ListTemplatesResponse =
  | {
      data: ListTemplatesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
