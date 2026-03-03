import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import { parseWorkflowToApiOptions } from '../common/utils/parse-workflow-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateWorkflowOptions,
  CreateWorkflowResponse,
  CreateWorkflowResponseSuccess,
} from './interfaces/create-workflow-options.interface';
import type {
  GetWorkflowResponse,
  GetWorkflowResponseSuccess,
} from './interfaces/get-workflow.interface';
import type {
  ListWorkflowsOptions,
  ListWorkflowsResponse,
  ListWorkflowsResponseSuccess,
} from './interfaces/list-workflows.interface';
import type {
  RemoveWorkflowResponse,
  RemoveWorkflowResponseSuccess,
} from './interfaces/remove-workflow.interface';
import type {
  UpdateWorkflowOptions,
  UpdateWorkflowResponse,
  UpdateWorkflowResponseSuccess,
} from './interfaces/update-workflow.interface';

export class Workflows {
  constructor(private readonly resend: Resend) {}

  async create(payload: CreateWorkflowOptions): Promise<CreateWorkflowResponse> {
    const data = await this.resend.post<CreateWorkflowResponseSuccess>(
      '/workflows',
      parseWorkflowToApiOptions(payload),
    );

    return data;
  }

  async list(
    options: ListWorkflowsOptions = {},
  ): Promise<ListWorkflowsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/workflows?${queryString}` : '/workflows';

    const data = await this.resend.get<ListWorkflowsResponseSuccess>(url);
    return data;
  }

  async get(id: string): Promise<GetWorkflowResponse> {
    const data = await this.resend.get<GetWorkflowResponseSuccess>(
      `/workflows/${id}`,
    );
    return data;
  }

  async remove(id: string): Promise<RemoveWorkflowResponse> {
    const data = await this.resend.delete<RemoveWorkflowResponseSuccess>(
      `/workflows/${id}`,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateWorkflowOptions,
  ): Promise<UpdateWorkflowResponse> {
    const data = await this.resend.patch<UpdateWorkflowResponseSuccess>(
      `/workflows/${id}`,
      payload,
    );
    return data;
  }
}
