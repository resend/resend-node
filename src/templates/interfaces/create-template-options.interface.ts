import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Template, TemplateVariable } from './template';

export interface CreateTemplateOptions
  extends Pick<
    Template,
    'name' | 'subject' | 'html' | 'text' | 'alias' | 'from' | 'reply_to'
  > {
  variables?: Pick<TemplateVariable, 'key' | 'fallback_value' | 'type'>[];
}

export interface CreateTemplateRequestOptions extends PostOptions {}

export interface CreateTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type CreateTemplateResponse =
  | {
      data: CreateTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
