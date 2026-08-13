import type { Response } from '../../interfaces';

export type BroadcastMetric =
  | 'delivered'
  | 'complained'
  | 'suppressed'
  | 'bounced'
  | 'bounced_transient'
  | 'bounced_permanent'
  | 'bounced_undetermined'
  | 'opened'
  | 'clicked'
  | 'unsubscribed'
  | 'delivery_delayed'
  | 'failed'
  | 'sent'
  | 'unique_opened'
  | 'unique_clicked'
  | 'delivery_rate'
  | 'open_rate'
  | 'click_rate'
  | 'bounce_rate'
  | 'complaint_rate'
  | 'unsubscribe_rate';

export type BroadcastMetricsDimension = 'period' | 'broadcast';

export type BroadcastMetricsGranularity =
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly';

export type GetBroadcastsMetricsOptions = {
  /**
   * The start of the date range, as an ISO 8601 date or datetime.
   * Defaults to 6 days before `endDate`.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/get-broadcasts-metrics#query-parameters
   */
  startDate?: string;

  /**
   * The end of the date range, as an ISO 8601 date or datetime.
   * Defaults to now.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/get-broadcasts-metrics#query-parameters
   */
  endDate?: string;

  /**
   * The IANA timezone used to bucket periods when `period` is in `dimensions`.
   * Defaults to `UTC`.
   */
  timezone?: string;

  /**
   * The bucket size used when `period` is in `dimensions`.
   * Defaults to `daily`.
   */
  granularity?: BroadcastMetricsGranularity;

  /**
   * The metrics to include in the response. Defaults to all metrics.
   */
  metrics?: BroadcastMetric[];

  /**
   * The dimensions to break the response down by. Defaults to `[]`, which
   * returns a single `totals` row for the whole range, with no `data`.
   */
  dimensions?: BroadcastMetricsDimension[];

  /**
   * Restrict the response to these broadcast IDs (up to 100). When set,
   * the date range is ignored unless `period` is also in `dimensions`.
   */
  broadcastId?: string[];
};

export type BroadcastMetricsTotals = Partial<Record<BroadcastMetric, number>>;

export type BroadcastMetricsDataRow = BroadcastMetricsTotals & {
  period?: string;
  id?: string;
  name?: string;
};

export interface GetBroadcastsMetricsResponseSuccess {
  object: 'metrics';
  start_date: string;
  end_date: string;
  metrics: BroadcastMetric[];
  dimensions: BroadcastMetricsDimension[];
  granularity: BroadcastMetricsGranularity;
  totals: BroadcastMetricsTotals;
  data?: BroadcastMetricsDataRow[];
}

export type GetBroadcastsMetricsResponse =
  Response<GetBroadcastsMetricsResponseSuccess>;
