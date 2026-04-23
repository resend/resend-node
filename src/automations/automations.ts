import { AutomationRuns } from '../automation-runs/automation-runs';
import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import {
  parseAutomationToApiOptions,
  parseConnection,
  parseStepConfig,
} from '../common/utils/parse-automation-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateAutomationOptions,
  CreateAutomationResponse,
  CreateAutomationResponseSuccess,
} from './interfaces/create-automation-options.interface';
import type {
  GetAutomationResponse,
  GetAutomationResponseSuccess,
} from './interfaces/get-automation.interface';
import type {
  ListAutomationsOptions,
  ListAutomationsResponse,
  ListAutomationsResponseSuccess,
} from './interfaces/list-automation.interface';
import type {
  RemoveAutomationResponse,
  RemoveAutomationResponseSuccess,
} from './interfaces/remove-automation.interface';
import type {
  StopAutomationResponse,
  StopAutomationResponseSuccess,
} from './interfaces/stop-automation.interface';
import type {
  UpdateAutomationOptions,
  UpdateAutomationResponse,
  UpdateAutomationResponseSuccess,
} from './interfaces/update-automation.interface';

export class Automations {
  readonly runs: AutomationRuns;

  constructor(private readonly resend: Resend) {
    this.runs = new AutomationRuns(this.resend);
  }

  async create(
    payload: CreateAutomationOptions,
  ): Promise<CreateAutomationResponse> {
    const data = await this.resend.post<CreateAutomationResponseSuccess>(
      '/automations',
      parseAutomationToApiOptions(payload),
    );

    return data;
  }

  async list(
    options: ListAutomationsOptions = {},
  ): Promise<ListAutomationsResponse> {
    const queryString = buildPaginationQuery(options);
    const params = [queryString];

    if (options.status) {
      params.push(`status=${encodeURIComponent(options.status)}`);
    }

    const qs = params.filter(Boolean).join('&');
    const url = qs ? `/automations?${qs}` : '/automations';

    const data = await this.resend.get<ListAutomationsResponseSuccess>(url);
    return data;
  }

  async get(id: string): Promise<GetAutomationResponse> {
    const data = await this.resend.get<GetAutomationResponseSuccess>(
      `/automations/${encodeURIComponent(id)}`,
    );
    return data;
  }

  async remove(id: string): Promise<RemoveAutomationResponse> {
    const data = await this.resend.delete<RemoveAutomationResponseSuccess>(
      `/automations/${encodeURIComponent(id)}`,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateAutomationOptions,
  ): Promise<UpdateAutomationResponse> {
    const apiPayload: Record<string, unknown> = {};

    if (payload.name !== undefined) {
      apiPayload.name = payload.name;
    }
    if (payload.status !== undefined) {
      apiPayload.status = payload.status;
    }
    if (payload.steps !== undefined) {
      apiPayload.steps = payload.steps.map(parseStepConfig);
    }
    if (payload.connections !== undefined) {
      apiPayload.connections = payload.connections.map(parseConnection);
    }

    const data = await this.resend.patch<UpdateAutomationResponseSuccess>(
      `/automations/${encodeURIComponent(id)}`,
      apiPayload,
    );
    return data;
  }

  async stop(id: string): Promise<StopAutomationResponse> {
    const data = await this.resend.post<StopAutomationResponseSuccess>(
      `/automations/${encodeURIComponent(id)}/stop`,
    );
    return data;
  }
}
