import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface BroadcastMetricCounter {
  total: number;
  percentage: number;
}

export interface BroadcastMetricsClickedLink {
  url: string;
  clicks: number;
  unique_clicks: number;
  percentage: number;
}

export interface GetBroadcastMetricsResponseSuccess {
  object: 'broadcast_metrics';
  broadcast_id: string;
  status: Broadcast['status'];
  created_at: string;
  scheduled_at: string | null;
  sent_at: string | null;
  total: number;
  sent: number;
  remaining: number;
  delivered: BroadcastMetricCounter;
  opened: BroadcastMetricCounter;
  clicked: BroadcastMetricCounter;
  unsubscribed: BroadcastMetricCounter;
  bounced: BroadcastMetricCounter;
  complained: BroadcastMetricCounter;
  suppressed: BroadcastMetricCounter;
  clicked_links: BroadcastMetricsClickedLink[];
}

export type GetBroadcastMetricsResponse =
  Response<GetBroadcastMetricsResponseSuccess>;
