export interface RequestOptions {
  /** Optional AbortSignal to cancel the request (also stops any pending retries). */
  signal?: AbortSignal;
  /** Timeout in milliseconds per request attempt. Aborts the attempt when exceeded. */
  timeoutMs?: number;
  /**
   * Maximum number of retries for retryable failures (HTTP 429, 5xx, and network errors).
   * A Retry-After header is honored when present, otherwise exponential backoff is used.
   * Timeouts and aborts are not retried.
   */
  retries?: number;
}
