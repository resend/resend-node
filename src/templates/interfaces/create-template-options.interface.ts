import type { PostOptions } from '../../common/interfaces';
import type { RequireAtLeastOne } from '../../common/interfaces/require-at-least-one';
import type { ErrorResponse } from '../../interfaces';
import type {
  Template,
  TemplateVariable,
  TemplateVariableListFallbackType,
} from './template';

type TemplateContentCreationOptions = RequireAtLeastOne<{
  html: string;
  react: React.ReactNode;
}>;

type TemplateVariableCreationOptions = Pick<TemplateVariable, 'key' | 'type'> &
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
        fallbackValue: Record<string, unknown>;
      }
    | {
        type: 'list';
        fallbackValue: TemplateVariableListFallbackType;
      }
  );

type TemplateOptionalFieldsForCreation = Partial<
  Pick<Template, 'subject' | 'text' | 'alias' | 'from'>
> & {
  replyTo?: string[] | string;
  variables?: TemplateVariableCreationOptions[];
};

export type CreateTemplateOptions = Pick<Template, 'name'> &
  TemplateOptionalFieldsForCreation &
  TemplateContentCreationOptions;

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
