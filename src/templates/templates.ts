import type { PaginationOptions } from '../common/interfaces';
import { getPaginationQueryProperties } from '../common/utils/get-pagination-query-properties';
import type { Resend } from '../resend';
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
  RemoveTemplateResponse,
  RemoveTemplateResponseSuccess,
} from './interfaces/remove-template.interface';

export class Templates {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateTemplateOptions,
  ): Promise<CreateTemplateResponse> {
    if (payload.react) {
      if (!this.renderAsync) {
        try {
          const { renderAsync } = await import('@react-email/render');
          this.renderAsync = renderAsync;
        } catch (error) {
          throw new Error(
            'Failed to render React component. Make sure to install `@react-email/render`',
          );
        }
      }

      payload.html = await this.renderAsync(
        payload.react as React.ReactElement,
      );
    }

    const data = await this.resend.post<CreateTemplateResponseSuccess>(
      '/templates',
      payload,
    );
    return data;
  }

  async remove(identifier: string): Promise<RemoveTemplateResponse> {
    const data = await this.resend.delete<RemoveTemplateResponseSuccess>(
      `/templates/${identifier}`,
    );
    return data;
  }

  async get(identifier: string): Promise<GetTemplateResponse> {
    const data = await this.resend.get<GetTemplateResponseSuccess>(
      `/templates/${identifier}`,
    );
    return data;
  }

  async list(options: PaginationOptions = {}): Promise<ListTemplatesResponse> {
    return this.resend.get<ListTemplatesResponseSuccess>(
      `/templates${getPaginationQueryProperties(options)}`,
    );
  }

  async duplicate(identifier: string): Promise<DuplicateTemplateResponse> {
    const data = await this.resend.post<DuplicateTemplateResponseSuccess>(
      `/templates/${identifier}/duplicate`,
    );
    return data;
  }
}
