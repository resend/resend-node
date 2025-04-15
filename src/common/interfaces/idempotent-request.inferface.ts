export interface IdempotentRequest {
  /**
   * Unique key that ensures the same operation is not processed multiple times.
   * Allows for safe retries without duplicating operations.
   * If provided, will be sent as the `Idempotency-Key` header.
   */
  idempotencyKey?: string;
}