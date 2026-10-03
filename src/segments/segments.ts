import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { path } from '../common/utils/path';
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
import type {
  UpdateSegmentOptions,
  UpdateSegmentResponse,
  UpdateSegmentResponseSuccess,
} from './interfaces/update-segment.interface';

export class Segments {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateSegmentOptions,
    requestOptions: CreateSegmentRequestOptions = {},
  ): Promise<CreateSegmentResponse> {
    const data = await this.resend.post<CreateSegmentResponseSuccess>(
      '/segments',
      payload,
      requestOptions,
    );
    return data;
  }

  async list(
    options: ListSegmentsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListSegmentsResponse> {
    const url = buildPaginationUrl('/segments', options);

    const data = await this.resend.get<ListSegmentsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetSegmentResponse> {
    const data = await this.resend.get<GetSegmentResponseSuccess>(
      path`/segments/${id}`,
      requestOptions,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateSegmentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateSegmentResponse> {
    const data = await this.resend.patch<UpdateSegmentResponseSuccess>(
      path`/segments/${id}`,
      payload,
      requestOptions,
    );
    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveSegmentResponse> {
    const data = await this.resend.delete<RemoveSegmentResponseSuccess>(
      path`/segments/${id}`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
