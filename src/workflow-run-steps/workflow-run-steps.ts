import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  GetWorkflowRunStepOptions,
  GetWorkflowRunStepResponse,
  GetWorkflowRunStepResponseSuccess,
} from './interfaces/get-workflow-run-step.interface';
import type {
  ListWorkflowRunStepsOptions,
  ListWorkflowRunStepsResponse,
  ListWorkflowRunStepsResponseSuccess,
} from './interfaces/list-workflow-run-steps.interface';

export class WorkflowRunSteps {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetWorkflowRunStepOptions,
  ): Promise<GetWorkflowRunStepResponse> {
    const data = await this.resend.get<GetWorkflowRunStepResponseSuccess>(
      `/automations/${options.workflowId}/runs/${options.runId}/steps/${options.stepId}`,
    );
    return data;
  }

  async list(
    options: ListWorkflowRunStepsOptions,
  ): Promise<ListWorkflowRunStepsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/automations/${options.workflowId}/runs/${options.runId}/steps?${queryString}`
      : `/automations/${options.workflowId}/runs/${options.runId}/steps`;

    const data =
      await this.resend.get<ListWorkflowRunStepsResponseSuccess>(url);
    return data;
  }
}
