import type { Response } from '../../interfaces';

export interface RemoveSuppressionResponseSuccess {
  object: 'suppression';
  id: string;
  deleted: true;
}

export type RemoveSuppressionResponse =
  Response<RemoveSuppressionResponseSuccess>;
