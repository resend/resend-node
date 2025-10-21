import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  CreateSegmentOptions,
  CreateSegmentRequestOptions,
  CreateSegmentResponse,
  CreateSegmentResponseSuccess,
} from './interfaces/create-segment-options.interface';
import type {
  GetSegmentResponse,
  GetSegmentResponseSuccess,
} from './interfaces/get-segment.interface';
import type {
  ListSegmentsOptions,
  ListSegmentsResponse,
  ListSegmentsResponseSuccess,
} from './interfaces/list-segments.interface';
import type {
  RemoveSegmentResponse,
  RemoveSegmentResponseSuccess,
} from './interfaces/remove-segment.interface';

export class Segments {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateSegmentOptions,
    options: CreateSegmentRequestOptions = {},
  ): Promise<CreateSegmentResponse> {
    const data = await this.resend.post<CreateSegmentResponseSuccess>(
      '/segments',
      payload,
      options,
    );
    return data;
  }

  async list(options: ListSegmentsOptions = {}): Promise<ListSegmentsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/segments?${queryString}` : '/segments';

    const data = await this.resend.get<ListSegmentsResponseSuccess>(url);
    return data;
  }

  async get(id: string): Promise<GetSegmentResponse> {
    const data = await this.resend.get<GetSegmentResponseSuccess>(
      `/segments/${id}`,
    );
    return data;
  }

  async remove(id: string): Promise<RemoveSegmentResponse> {
    const data = await this.resend.delete<RemoveSegmentResponseSuccess>(
      `/segments/${id}`,
    );
    return data;
  }
}
