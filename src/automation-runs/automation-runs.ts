import { buildPaginationQuery } from '../common/utils/build-pagination-query';
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
  ): Promise<GetAutomationRunResponse> {
    const data = await this.resend.get<GetAutomationRunResponseSuccess>(
      `/automations/${options.automationId}/runs/${options.runId}`,
    );
    return data;
  }

  async list(
    options: ListAutomationRunsOptions,
  ): Promise<ListAutomationRunsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/automations/${options.automationId}/runs?${queryString}`
      : `/automations/${options.automationId}/runs`;

    const data = await this.resend.get<ListAutomationRunsResponseSuccess>(url);
    return data;
  }
}
