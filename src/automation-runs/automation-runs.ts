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
      `/automations/${encodeURIComponent(options.automationId)}/runs/${encodeURIComponent(options.runId)}`,
    );
    return data;
  }

  async list(
    options: ListAutomationRunsOptions,
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
    const safeAutomationId = encodeURIComponent(options.automationId);
    const url = qs
      ? `/automations/${safeAutomationId}/runs?${qs}`
      : `/automations/${safeAutomationId}/runs`;

    const data = await this.resend.get<ListAutomationRunsResponseSuccess>(url);
    return data;
  }
}
