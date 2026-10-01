export interface AutoRetryOptions {
  /** Maximum number of retries for retryable failures. Default is 2. */
  maxRetries?: number;
}

export type AutoRetryOption = boolean | AutoRetryOptions;

export interface RequestOptions {
  /** Optional AbortSignal to cancel the request (also stops any pending retries). */
  signal?: AbortSignal;
  /**
   * Automatic retry configuration for this request.
   * Can be set to `true` (defaults to 2 retries), `false` (disable retries), or `{ maxRetries: number }`.
   */
  autoRetry?: AutoRetryOption;
}
