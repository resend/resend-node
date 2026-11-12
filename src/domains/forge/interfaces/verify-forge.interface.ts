import type { Response } from '../../../interfaces';
import type { Domain } from '../../interfaces/domain';

export type VerifyForgeResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type VerifyForgeResponse = Response<VerifyForgeResponseSuccess>;
