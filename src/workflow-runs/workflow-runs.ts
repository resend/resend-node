import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import { WorkflowRunSteps } from '../workflow-run-steps/workflow-run-steps';
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
  readonly steps: WorkflowRunSteps;

  constructor(private readonly resend: Resend) {
    this.steps = new WorkflowRunSteps(resend);
  }

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
