import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  CreateSegmentOptions,
  CreateSegmentRequestOptions,
  CreateSegmentResponse,
  CreateSegmentResponseSuccess,
} from './interfaces/create-segment-options.interface';
import type {
  GetSegmentsMetricsOptions,
  GetSegmentsMetricsResponse,
  GetSegmentsMetricsResponseSuccess,
} from './interfaces/get-metrics.interface';
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
    const url = buildPaginationUrl('/segments', options);

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

  async metrics(
    options: GetSegmentsMetricsOptions = {},
  ): Promise<GetSegmentsMetricsResponse> {
    const queryString = buildMetricsQuery(options);
    const url = queryString
      ? `/segments/metrics?${queryString}`
      : '/segments/metrics';

    const data = await this.resend.get<GetSegmentsMetricsResponseSuccess>(url);
    return data;
  }
}

function buildMetricsQuery(options: GetSegmentsMetricsOptions) {
  const params: Record<string, string | undefined> = {
    metrics: options.metrics?.join(','),
    dimensions: options.dimensions?.join(','),
    segment_id: options.filter?.segmentId?.join(','),
    sort_by: options.sortBy,
    sort_order: options.sortOrder,
  };

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.set(key, value);
    }
  }

  return searchParams.toString();
}
