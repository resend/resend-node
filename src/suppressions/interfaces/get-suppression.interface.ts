import type { Response } from '../../interfaces';
import type { Suppression } from './suppression-list-entry';

export type GetSuppressionResponseSuccess = Suppression;

export type GetSuppressionResponse = Response<GetSuppressionResponseSuccess>;
