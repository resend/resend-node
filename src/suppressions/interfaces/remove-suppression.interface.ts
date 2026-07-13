import type { Response } from '../../interfaces';

export interface RemoveSuppressionResponseSuccess {
  object: 'suppression';
  id: string;
  deleted: boolean;
}

export type RemoveSuppressionResponse =
  Response<RemoveSuppressionResponseSuccess>;
