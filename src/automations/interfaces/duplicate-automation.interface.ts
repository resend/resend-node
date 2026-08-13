import type { Response } from '../../interfaces';
import type { Automation } from './automation';

export interface DuplicateAutomationResponseSuccess
  extends Pick<Automation, 'id'> {
  object: 'automation';
}

export type DuplicateAutomationResponse =
  Response<DuplicateAutomationResponseSuccess>;
