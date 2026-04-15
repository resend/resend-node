import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  GetLogResponse,
  GetLogResponseSuccess,
} from './interfaces/get-log.interface';
import type {
  ListLogsOptions,
  ListLogsResponse,
  ListLogsResponseSuccess,
} from './interfaces/list-logs.interface';

export class Logs {
  constructor(private readonly resend: Resend) {}

  async list(options: ListLogsOptions = {}): Promise<ListLogsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/logs?${queryString}` : '/logs';
    const data = await this.resend.get<ListLogsResponseSuccess>(url);
    return data;
  }

  async get(id: string): Promise<GetLogResponse> {
    const data = await this.resend.get<GetLogResponseSuccess>(`/logs/${id}`);
    return data;
  }
}
