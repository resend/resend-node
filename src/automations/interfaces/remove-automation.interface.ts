import type { Response } from '../../interfaces';
import type { Automation } from './automation';

export interface RemoveAutomationResponseSuccess
  extends Pick<Automation, 'id'> {
  object: 'automation';
  deleted: boolean;
}

export type RemoveAutomationResponse =
  Response<RemoveAutomationResponseSuccess>;
