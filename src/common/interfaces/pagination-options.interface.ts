// Pagination options using cursor-based approach
export type PaginationOptions = {
  /**
   * Maximum number of items to return (1-100, default: 20)
   */
  limit?: number;
} & (
  | {
      /**
       * Get items after this cursor (cannot be used with 'before')
       */
      after?: string;
    }
  | {
      /**
       * Get items before this cursor (cannot be used with 'after')
       */
      before?: string;
    }
);
