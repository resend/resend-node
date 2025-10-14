import type { ErrorResponse } from '../../interfaces';
import type { Template } from './template';

export interface GetTemplateResponseSuccess extends Template {
  object: 'template';
}

export type GetTemplateResponse =
  | {
      data: GetTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
