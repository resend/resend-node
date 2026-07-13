import type { Response } from '../../interfaces';

export interface AddSuppressionOptions {
  email: string;
}

export interface AddSuppressionResponseSuccess {
  object: 'suppression';
  id: string;
}

export type AddSuppressionResponse = Response<AddSuppressionResponseSuccess>;
