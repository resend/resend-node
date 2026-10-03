import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { path } from '../common/utils/path';
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

  async list(
    options: ListLogsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListLogsResponse> {
    const url = buildPaginationUrl('/logs', options);
    const data = await this.resend.get<ListLogsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetLogResponse> {
    const data = await this.resend.get<GetLogResponseSuccess>(
      path`/logs/${id}`,
      requestOptions,
    );
    return data;
  }
}
