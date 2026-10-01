import type { PaginationOptions } from '../common/interfaces';
import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { getPaginationQueryProperties } from '../common/utils/get-pagination-query-properties';
import { parseTemplateToApiOptions } from '../common/utils/parse-template-to-api-options';
import { render } from '../render';
import type { Resend } from '../resend';
import { ChainableTemplateResult } from './chainable-template-result';
import type {
  CreateTemplateOptions,
  CreateTemplateResponse,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';
import type {
  DuplicateTemplateResponse,
  DuplicateTemplateResponseSuccess,
} from './interfaces/duplicate-template.interface';
import type {
  GetTemplateResponse,
  GetTemplateResponseSuccess,
} from './interfaces/get-template.interface';
import type {
  ListTemplatesResponse,
  ListTemplatesResponseSuccess,
} from './interfaces/list-templates.interface';
import type {
  PublishTemplateResponse,
  PublishTemplateResponseSuccess,
} from './interfaces/publish-template.interface';
import type {
  RemoveTemplateResponse,
  RemoveTemplateResponseSuccess,
} from './interfaces/remove-template.interface';
import type {
  UpdateTemplateOptions,
  UpdateTemplateResponse,
  UpdateTemplateResponseSuccess,
} from './interfaces/update-template.interface';

export class Templates {
  constructor(private readonly resend: Resend) {}

  create(
    payload: CreateTemplateOptions,
    requestOptions: RequestOptions = {},
  ): ChainableTemplateResult<CreateTemplateResponse> {
    const createPromise = this.performCreate(payload, requestOptions);
    return new ChainableTemplateResult(createPromise, this.publish.bind(this));
  }
  // This creation process is being done separately from the public create so that
  // the user can chain the publish operation after the create operation. Otherwise, due
  // to the async nature of the render, the return type would be
  // Promise<ChainableTemplateResult<CreateTemplateResponse>> which wouldn't be chainable.
  private async performCreate(
    payload: CreateTemplateOptions,
    requestOptions: RequestOptions,
  ): Promise<CreateTemplateResponse> {
    const body: CreateTemplateOptions = { ...payload };

    if (payload.react) {
      body.html = await render(payload.react);
    }

    return this.resend.post<CreateTemplateResponseSuccess>(
      '/templates',
      parseTemplateToApiOptions(body),
      requestOptions,
    );
  }

  async remove(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveTemplateResponse> {
    const data = await this.resend.delete<RemoveTemplateResponseSuccess>(
      `/templates/${identifier}`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async get(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetTemplateResponse> {
    const data = await this.resend.get<GetTemplateResponseSuccess>(
      `/templates/${identifier}`,
      requestOptions,
    );
    return data;
  }

  async list(
    options: PaginationOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListTemplatesResponse> {
    return this.resend.get<ListTemplatesResponseSuccess>(
      `/templates${getPaginationQueryProperties(options)}`,
      requestOptions,
    );
  }

  duplicate(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): ChainableTemplateResult<DuplicateTemplateResponse> {
    const promiseDuplicate = this.resend.post<DuplicateTemplateResponseSuccess>(
      `/templates/${identifier}/duplicate`,
      undefined,
      requestOptions,
    );
    return new ChainableTemplateResult(
      promiseDuplicate,
      this.publish.bind(this),
    );
  }

  async publish(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): Promise<PublishTemplateResponse> {
    const data = await this.resend.post<PublishTemplateResponseSuccess>(
      `/templates/${identifier}/publish`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async update(
    identifier: string,
    payload: UpdateTemplateOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateTemplateResponse> {
    const data = await this.resend.patch<UpdateTemplateResponseSuccess>(
      `/templates/${identifier}`,
      parseTemplateToApiOptions(payload),
      requestOptions,
    );
    return data;
  }
}
