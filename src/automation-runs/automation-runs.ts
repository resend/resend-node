import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import { path } from '../common/utils/path';
import type { Resend } from '../resend';
import type {
  GetAutomationRunOptions,
  GetAutomationRunResponse,
  GetAutomationRunResponseSuccess,
} from './interfaces/get-automation-run.interface';
import type {
  ListAutomationRunsOptions,
  ListAutomationRunsResponse,
  ListAutomationRunsResponseSuccess,
} from './interfaces/list-automation-runs.interface';

export class AutomationRuns {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetAutomationRunOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetAutomationRunResponse> {
    const data = await this.resend.get<GetAutomationRunResponseSuccess>(
      path`/automations/${options.automationId}/runs/${options.runId}`,
      requestOptions,
    );
    return data;
  }

  async list(
    options: ListAutomationRunsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListAutomationRunsResponse> {
    const queryString = buildPaginationQuery(options);
    const searchParams = new URLSearchParams(queryString);

    if (options.status) {
      const statusValue = Array.isArray(options.status)
        ? options.status.join(',')
        : options.status;
      searchParams.set('status', statusValue);
    }

    const qs = searchParams.toString();
    const basePath = path`/automations/${options.automationId}/runs`;
    const url = qs ? `${basePath}?${qs}` : basePath;

    const data = await this.resend.get<ListAutomationRunsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }
}
