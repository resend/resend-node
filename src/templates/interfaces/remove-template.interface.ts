import type { ErrorResponse } from '../../interfaces';

export interface RemoveTemplateResponseSuccess {
  object: 'template';
  id: string;
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
