import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import type {
  EnableForgeOptions,
  EnableForgeRequestOptions,
  EnableForgeResponse,
  EnableForgeResponseSuccess,
} from './interfaces/enable-forge.interface';
import type {
  UpdateForgeOptions,
  UpdateForgeResponse,
  UpdateForgeResponseSuccess,
} from './interfaces/update-forge.interface';
import type {
  VerifyForgeResponse,
  VerifyForgeResponseSuccess,
} from './interfaces/verify-forge.interface';

export class Forge {
  constructor(private readonly resend: Resend) {}

  async enable(
    payload: EnableForgeOptions,
    requestOptions: EnableForgeRequestOptions = {},
  ): Promise<EnableForgeResponse> {
    const data = await this.resend.post<EnableForgeResponseSuccess>(
      `/domains/${payload.id}/forge`,
      {
        return_path: payload.returnPath,
      },
      requestOptions,
    );
    return data;
  }

  async update(
    payload: UpdateForgeOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateForgeResponse> {
    const data = await this.resend.patch<UpdateForgeResponseSuccess>(
      `/domains/${payload.id}/forge`,
      {
        return_path: payload.returnPath,
      },
      requestOptions,
    );
    return data;
  }

  async verify(
    domainId: string,
    requestOptions: RequestOptions = {},
  ): Promise<VerifyForgeResponse> {
    const data = await this.resend.post<VerifyForgeResponseSuccess>(
      `/domains/${domainId}/forge/verify`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
