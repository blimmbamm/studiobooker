import {
  useQuery as useTanstackQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';

import { QueryError, QueryErrorType } from '../types/query-error';

export function useQuery<TData, TKey extends QueryKey = QueryKey>(
  options: UseQueryOptions<TData, QueryError, TData, TKey>
): UseQueryResult<TData, QueryError> & {
  isNotFoundError: boolean;
  isOtherError: boolean;
} {
  const query = useTanstackQuery<TData, QueryError, TData, TKey>({
    ...options,
    retry: (count, error) =>
      error.type === QueryErrorType.OTHER
        ? count < 3
        : error.status >= 500 && count < 3,
    // networkMode: 'always',
    ...options,
  });

  return {
    ...query,
    isNotFoundError:
      query.isError && query.error?.type === QueryErrorType.HTTP_NOT_FOUND,
    isOtherError: query.isError /*&&
      (query.error?.type === QueryErrorType.HTTP_OTHER ||
        query.error?.type === QueryErrorType.OTHER), */
  };
}
