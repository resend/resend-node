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
  PublishTemplateResponse,
  PublishTemplateResponseSuccess,
} from './interfaces/publish-template.interface';
import type {
  RemoveTemplateResponse,
  RemoveTemplateResponseSuccess,
} from './interfaces/remove-template.interface';

export class Templates {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
  constructor(private readonly resend: Resend) {}

  create(
    payload: CreateTemplateOptions,
  ): ChainableTemplateResult<CreateTemplateResponse> {
    const createPromise = this.performCreate(payload);
    return new ChainableTemplateResult(createPromise, this.publish.bind(this));
  }
  // This creation process is being done separately from the public create so that
  // the user can chain the publish operation after the create operation. Otherwise, due
  // to the async nature of the renderAsync, the return type would be
  // Promise<ChainableTemplateResult<CreateTemplateResponse>> which wouldn't be chainable.
  private async performCreate(
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

    return this.resend.post<CreateTemplateResponseSuccess>(
      '/templates',
      payload,
    );
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

  duplicate(
    identifier: string,
  ): ChainableTemplateResult<DuplicateTemplateResponse> {
    const promiseDuplicate = this.resend.post<DuplicateTemplateResponseSuccess>(
      `/templates/${identifier}/duplicate`,
    );
    return new ChainableTemplateResult(
      promiseDuplicate,
      this.publish.bind(this),
    );
  }

  async publish(identifier: string): Promise<PublishTemplateResponse> {
    const data = await this.resend.post<PublishTemplateResponseSuccess>(
      `/templates/${identifier}/publish`,
    );
    return data;
  }
}
