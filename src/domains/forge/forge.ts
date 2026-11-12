import type { Resend } from '../../resend';
import type {
  EnableForgeOptions,
  EnableForgeRequestOptions,
  EnableForgeResponse,
  EnableForgeResponseSuccess,
} from './interfaces/enable-forge.interface';

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
}
