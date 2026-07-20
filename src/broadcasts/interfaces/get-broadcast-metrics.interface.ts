import type { Response } from '../../interfaces';

export interface BroadcastMetricCounter {
  count: number;
  rate: number;
}

export interface GetBroadcastMetricsResponseSuccess {
  object: 'broadcast_metrics';
  broadcast_id: string;
  total: number;
  sent: number;
  delivered: BroadcastMetricCounter;
  opened: BroadcastMetricCounter;
  clicked: BroadcastMetricCounter;
  bounced: BroadcastMetricCounter;
  complained: BroadcastMetricCounter;
  unsubscribed: BroadcastMetricCounter;
  suppressed: BroadcastMetricCounter;
}

export type GetBroadcastMetricsResponse =
  Response<GetBroadcastMetricsResponseSuccess>;
