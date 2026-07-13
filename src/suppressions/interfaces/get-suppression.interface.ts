import type { Response } from '../../interfaces';
import type { SuppressionListEntry } from './suppression-list-entry';

export type GetSuppressionResponseSuccess = SuppressionListEntry;

export type GetSuppressionResponse = Response<GetSuppressionResponseSuccess>;
