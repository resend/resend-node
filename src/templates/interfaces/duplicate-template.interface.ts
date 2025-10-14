import type { ErrorResponse } from '../../interfaces';
import type { Template } from './template';

export interface DuplicateTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type DuplicateTemplateResponse =
  | {
      data: DuplicateTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
