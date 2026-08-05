import type { Response } from '../../interfaces';

export type SegmentMetric = 'all_contacts' | 'subscribers' | 'unsubscribers';

export type SegmentMetricsDimension = 'segment';

export type GetSegmentsMetricsOptions = {
  /**
   * The metrics to include in the response. Defaults to all metrics.
   *
   * @link https://resend.com/docs/api-reference/segments/get-segment-metrics#query-parameters
   */
  metrics?: SegmentMetric[];

  /**
   * The dimensions to break `data` down by. Defaults to `[]`, which returns
   * only `totals` with no `data`.
   */
  dimensions?: SegmentMetricsDimension[];

  filter?: {
    /**
     * Restrict `totals` (and `data`, when requested) to these segment IDs,
     * without double-counting contacts that belong to more than one.
     */
    segmentId?: string[];
  };
};

export type SegmentMetricsTotals = Partial<Record<SegmentMetric, number>>;

export type SegmentMetricsDataRow = SegmentMetricsTotals & {
  segment_id: string;
  segment_name: string;
};

export interface GetSegmentsMetricsResponseSuccess {
  object: 'segments_metrics';
  metrics: SegmentMetric[];
  dimensions: SegmentMetricsDimension[];
  totals: SegmentMetricsTotals;
  data?: SegmentMetricsDataRow[];
}

export type GetSegmentsMetricsResponse =
  Response<GetSegmentsMetricsResponseSuccess>;
