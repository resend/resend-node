export interface RequestOptions {
  headers?: HeadersInit;
  /** Optional AbortSignal to cancel the request. */
  signal?: AbortSignal;
}
