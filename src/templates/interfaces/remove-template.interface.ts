import type { ErrorResponse } from '../../interfaces';

export interface RemoveTemplateResponseSuccess {
  object: 'template';
  deleted: boolean;
}
export type RemoveTemplateResponse =
  | {
      data: RemoveTemplateResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
