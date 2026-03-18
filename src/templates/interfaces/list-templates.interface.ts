import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
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

export type ListTemplatesResponse = Response<ListTemplatesResponseSuccess>;
