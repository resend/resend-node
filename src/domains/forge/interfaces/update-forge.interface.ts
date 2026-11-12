import type { Response } from '../../../interfaces';
import type { GetDomainResponseSuccess } from '../../interfaces/get-domain.interface';

export interface UpdateForgeOptions {
  id: string;
  returnPath: string;
}

export interface UpdateForgeResponseSuccess extends GetDomainResponseSuccess {}

export type UpdateForgeResponse = Response<UpdateForgeResponseSuccess>;
