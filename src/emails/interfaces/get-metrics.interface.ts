import type { Response } from '../../interfaces';

export type EmailMetric =
  | 'received'
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

export type EmailMetricsDimension = 'period' | 'domain' | 'email';

export type EmailMetricsGranularity = 'hourly' | 'daily' | 'weekly';

export type GetEmailsMetricsOptions = {
  /**
   * The start of the date range, as an ISO 8601 date or datetime.
   * Defaults to 6 days before `endDate`.
   *
   * @link https://resend.com/docs/api-reference/emails/get-metrics#query-parameters
   */
  startDate?: string;

  /**
   * The end of the date range, as an ISO 8601 date or datetime.
   * Defaults to now.
   *
   * @link https://resend.com/docs/api-reference/emails/get-metrics#query-parameters
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
  granularity?: EmailMetricsGranularity;

  /**
   * The metrics to include in the response. Defaults to all metrics.
   */
  metrics?: EmailMetric[];

  /**
   * The dimensions to break the response down by. Defaults to `[]`, which
   * returns a single `totals` row for the whole range, with no `data`.
   */
  dimensions?: EmailMetricsDimension[];

  filter?: {
    /**
     * Restrict the response to these sending domain IDs.
     */
    domainId?: string[];

    /**
     * Restrict the response to these email IDs. Cannot be combined with the
     * `domain` dimension.
     */
    emailId?: string[];
  };
};

export type EmailMetricsTotals = Partial<Record<EmailMetric, number>>;

export type EmailMetricsDataRow = EmailMetricsTotals & {
  period?: string;
  domain_id?: string;
  domain_name?: string;
  email_id?: string;
};

export interface GetEmailsMetricsResponseSuccess {
  object: 'metrics';
  start_date: string;
  end_date: string;
  metrics: EmailMetric[];
  dimensions: EmailMetricsDimension[];
  granularity: EmailMetricsGranularity;
  totals: EmailMetricsTotals;
  data?: EmailMetricsDataRow[];
}

export type GetEmailsMetricsResponse =
  Response<GetEmailsMetricsResponseSuccess>;
