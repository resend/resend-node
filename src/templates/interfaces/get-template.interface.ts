import type { Response } from '../../interfaces';
import type { Template } from './template';

export interface GetTemplateResponseSuccess extends Template {
  object: 'template';
}

export type GetTemplateResponse = Response<GetTemplateResponseSuccess>;
