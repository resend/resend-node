import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { GetDomainResponseSuccess } from '../../interfaces/get-domain.interface';

export interface EnableForgeOptions {
  id: string;
  returnPath?: string;
}

export interface EnableForgeRequestOptions extends PostOptions {}

export interface EnableForgeResponseSuccess extends GetDomainResponseSuccess {}

export type EnableForgeResponse = Response<EnableForgeResponseSuccess>;
