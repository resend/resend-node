import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  GetAutomationRunStepOptions,
  GetAutomationRunStepResponse,
  GetAutomationRunStepResponseSuccess,
} from './interfaces/get-automation-run-step.interface';
import type {
  ListAutomationRunStepsOptions,
  ListAutomationRunStepsResponse,
  ListAutomationRunStepsResponseSuccess,
} from './interfaces/list-automation-run-steps.interface';

export class AutomationRunSteps {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetAutomationRunStepOptions,
  ): Promise<GetAutomationRunStepResponse> {
    const data = await this.resend.get<GetAutomationRunStepResponseSuccess>(
      `/automations/${options.automationId}/runs/${options.runId}/steps/${options.stepId}`,
    );
    return data;
  }

  async list(
    options: ListAutomationRunStepsOptions,
  ): Promise<ListAutomationRunStepsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/automations/${options.automationId}/runs/${options.runId}/steps?${queryString}`
      : `/automations/${options.automationId}/runs/${options.runId}/steps`;

    const data =
      await this.resend.get<ListAutomationRunStepsResponseSuccess>(url);
    return data;
  }
}
