import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  GetWorkflowRunOptions,
  GetWorkflowRunResponse,
  GetWorkflowRunResponseSuccess,
} from './interfaces/get-workflow-run.interface';
import type {
  ListWorkflowRunsOptions,
  ListWorkflowRunsResponse,
  ListWorkflowRunsResponseSuccess,
} from './interfaces/list-workflow-runs.interface';

export class WorkflowRuns {
  constructor(private readonly resend: Resend) {}

  async get(options: GetWorkflowRunOptions): Promise<GetWorkflowRunResponse> {
    const data = await this.resend.get<GetWorkflowRunResponseSuccess>(
      `/workflows/${options.workflowId}/runs/${options.runId}`,
    );
    return data;
  }

  async list(
    options: ListWorkflowRunsOptions,
  ): Promise<ListWorkflowRunsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/workflows/${options.workflowId}/runs?${queryString}`
      : `/workflows/${options.workflowId}/runs`;

    const data = await this.resend.get<ListWorkflowRunsResponseSuccess>(url);
    return data;
  }
}
