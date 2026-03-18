import type { CreateTemplateResponse } from './interfaces/create-template-options.interface';
import type { DuplicateTemplateResponse } from './interfaces/duplicate-template.interface';
import type { PublishTemplateResponse } from './interfaces/publish-template.interface';

export class ChainableTemplateResult<
  T extends CreateTemplateResponse | DuplicateTemplateResponse,
> implements PromiseLike<T>
{
  constructor(
    private readonly promise: Promise<T>,
    private readonly publishFn: (
      id: string,
    ) => Promise<PublishTemplateResponse>,
  ) {}

  // If user calls `then` or only awaits for the result of create() or duplicate(), the behavior should be
  // exactly as if they called create() or duplicate() directly. This will act as a normal promise

  // biome-ignore lint/suspicious/noThenProperty: This class intentionally implements PromiseLike
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  async publish(): Promise<PublishTemplateResponse> {
    const { data, error } = await this.promise;

    if (error) {
      return {
        data: null,
        headers: null,
        error,
      };
    }
    return this.publishFn(data.id);
  }
}
