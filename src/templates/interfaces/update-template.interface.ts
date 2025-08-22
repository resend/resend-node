import type { ErrorResponse } from '../../interfaces';
import type { Template, TemplateVariable } from './template';

type TemplateVariableUpdateOptions = Pick<TemplateVariable, 'key' | 'type'> & {
  fallback_value?: string | number | boolean | null;
};

export interface UpdateTemplateOptions
  extends Partial<
    Pick<
      Template,
      'name' | 'subject' | 'html' | 'text' | 'from' | 'reply_to' | 'alias'
    >
  > {
  variables?: TemplateVariableUpdateOptions[];
}

export interface UpdateTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type UpdateTemplateResponse =
  | {
      data: UpdateTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
