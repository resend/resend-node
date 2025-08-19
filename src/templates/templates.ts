import type { Resend } from '../resend';
import type {
  CreateTemplateOptions,
  CreateTemplateResponse,
  CreateTemplateResponseSuccess,
} from './interfaces/create-template-options.interface';

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
}
