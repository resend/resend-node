import type { ErrorResponse } from '../../interfaces';
import type { Template } from './template';

export interface PublishTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type PublishTemplateResponse =
  | {
      data: PublishTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
