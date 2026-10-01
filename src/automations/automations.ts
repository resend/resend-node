import { AutomationRuns } from '../automation-runs/automation-runs';
import type { RequestOptions } from '../common/interfaces/request-options.interface';
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
  DuplicateAutomationResponse,
  DuplicateAutomationResponseSuccess,
} from './interfaces/duplicate-automation.interface';
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
    requestOptions: RequestOptions = {},
  ): Promise<CreateAutomationResponse> {
    const data = await this.resend.post<CreateAutomationResponseSuccess>(
      '/automations',
      parseAutomationToApiOptions(payload),
      requestOptions,
    );

    return data;
  }

  async list(
    options: ListAutomationsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListAutomationsResponse> {
    const queryString = buildPaginationQuery(options);
    const params = [queryString];

    if (options.status) {
      params.push(`status=${encodeURIComponent(options.status)}`);
    }

    const qs = params.filter(Boolean).join('&');
    const url = qs ? `/automations?${qs}` : '/automations';

    const data = await this.resend.get<ListAutomationsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetAutomationResponse> {
    const data = await this.resend.get<GetAutomationResponseSuccess>(
      `/automations/${id}`,
      requestOptions,
    );
    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveAutomationResponse> {
    const data = await this.resend.delete<RemoveAutomationResponseSuccess>(
      `/automations/${id}`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateAutomationOptions,
    requestOptions: RequestOptions = {},
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
      `/automations/${id}`,
      apiPayload,
      requestOptions,
    );
    return data;
  }

  async duplicate(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<DuplicateAutomationResponse> {
    const data = await this.resend.post<DuplicateAutomationResponseSuccess>(
      `/automations/${id}/duplicate`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async stop(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<StopAutomationResponse> {
    const data = await this.resend.post<StopAutomationResponseSuccess>(
      `/automations/${id}/stop`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
