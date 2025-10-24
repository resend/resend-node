import type { Response } from '../../interfaces';
import type { Template } from './template';

export interface DuplicateTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type DuplicateTemplateResponse =
  Response<DuplicateTemplateResponseSuccess>;
