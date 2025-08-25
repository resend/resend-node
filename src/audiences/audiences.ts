import type { Resend } from '../resend';
import type {
  CreateAudienceOptions,
  CreateAudienceRequestOptions,
  CreateAudienceResponse,
  CreateAudienceResponseSuccess,
} from './interfaces/create-audience-options.interface';
import type {
  GetAudienceResponse,
  GetAudienceResponseSuccess,
} from './interfaces/get-audience.interface';
import type {
  ListAudiencesResponse,
  ListAudiencesResponseSuccess,
} from './interfaces/list-audiences.interface';
import type {
  RemoveAudiencesResponse,
  RemoveAudiencesResponseSuccess,
} from './interfaces/remove-audience.interface';

export class Audiences {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateAudienceOptions,
    options: CreateAudienceRequestOptions = {},
  ): Promise<CreateAudienceResponse> {
    const data = await this.resend.post<CreateAudienceResponseSuccess>(
      '/audiences',
      payload,
      options,
    );
    return data;
  }

  async list(): Promise<ListAudiencesResponse> {
    const data =
      await this.resend.get<ListAudiencesResponseSuccess>('/audiences');
    return data;
  }

  async get(id: string): Promise<GetAudienceResponse> {
    const data = await this.resend.get<GetAudienceResponseSuccess>(
      `/audiences/${id}`,
    );
    return data;
  }

  async remove(id: string): Promise<RemoveAudiencesResponse> {
    const data = await this.resend.delete<RemoveAudiencesResponseSuccess>(
      `/audiences/${id}`,
    );
    return data;
  }
}
