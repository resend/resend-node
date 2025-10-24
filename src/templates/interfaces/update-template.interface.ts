import type { Response } from '../../interfaces';
import type { Template, TemplateVariable } from './template';

type TemplateVariableUpdateOptions = Pick<TemplateVariable, 'key' | 'type'> &
  (
    | {
        type: 'string';
        fallbackValue?: string | null;
      }
    | {
        type: 'number';
        fallbackValue?: number | null;
      }
  );

export interface UpdateTemplateOptions
  extends Partial<
    Pick<Template, 'name' | 'subject' | 'html' | 'text' | 'from' | 'alias'>
  > {
  variables?: TemplateVariableUpdateOptions[];
  replyTo?: string[] | string;
}

export interface UpdateTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type UpdateTemplateResponse = Response<UpdateTemplateResponseSuccess>;
