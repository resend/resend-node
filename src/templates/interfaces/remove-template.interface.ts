import type { Response } from '../../interfaces';

export interface RemoveTemplateResponseSuccess {
  object: 'template';
  id: string;
  deleted: boolean;
}
export type RemoveTemplateResponse = Response<RemoveTemplateResponseSuccess>;
