import type { PostOptions } from '../../common/interfaces';
import type { RequireAtLeastOne } from '../../common/interfaces/require-at-least-one';
import type { ErrorResponse } from '../../interfaces';
import type { Template, TemplateVariable } from './template';

type TemplateContentCreationOptions = RequireAtLeastOne<{
  html: string;
  react: React.ReactNode;
}>;

export type CreateTemplateOptions = Pick<
  Template,
  'name' | 'subject' | 'text' | 'alias' | 'from' | 'reply_to'
> &
  TemplateContentCreationOptions & {
    variables?: Pick<TemplateVariable, 'key' | 'fallback_value' | 'type'>[];
  };

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
