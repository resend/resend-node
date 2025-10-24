import type { Response } from '../../interfaces';
import type { Template } from './template';

export interface PublishTemplateResponseSuccess extends Pick<Template, 'id'> {
  object: 'template';
}

export type PublishTemplateResponse = Response<PublishTemplateResponseSuccess>;
