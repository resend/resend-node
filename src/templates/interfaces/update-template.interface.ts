import type { ErrorResponse } from '../../interfaces';
import type {
  Template,
  TemplateVariable,
  TemplateVariableListFallbackType,
} from './template';

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
    | {
        type: 'boolean';
        fallbackValue?: boolean | null;
      }
    | {
        type: 'object';
        fallbackValue: Record<string, unknown> | null;
      }
    | {
        type: 'list';
        fallbackValue: TemplateVariableListFallbackType | null;
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

export type UpdateTemplateResponse =
  | {
      data: UpdateTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
