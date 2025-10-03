import type { Response } from '../../interfaces';
import type {
  PaginatedApiResponse,
  PaginatedData,
} from '../interfaces/pagination';

export function formatPaginatedResponse<Data>(
  response: Response<PaginatedApiResponse<Data>>,
): Response<PaginatedData<Data>> {
  if (!response.data) {
    return response;
  }

  return {
    ...response,
    data: {
      object: 'list',
      data: response.data.data,
      has_more: response.data.has_more,
    },
  };
}
