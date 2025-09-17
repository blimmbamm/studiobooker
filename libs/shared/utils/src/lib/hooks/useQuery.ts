'use client';

import {
  useQuery as useTanstackQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import { QueryError, QueryErrorType } from '../types';
import { useOptionalAuth } from '../contexts';

export function useQuery<TData>(
  options: UseQueryOptions<TData, QueryError, TData, QueryKey>
): UseQueryResult<TData, QueryError> & {
  isNotFoundError: boolean;
  isOtherError: boolean;
} {
  const { queryKey, ...otherOptions } = options;

  const auth = useOptionalAuth();

  const queryKeyWithAuthId = auth ? [auth.id, ...queryKey] : queryKey;
  console.log(queryKeyWithAuthId);

  const query = useTanstackQuery<TData, QueryError, TData, QueryKey>({
    ...otherOptions,
    queryKey: queryKeyWithAuthId,
    retry: (count, error) =>
      error.type === QueryErrorType.OTHER
        ? count < 3
        : error.status >= 500 && count < 3,
    // networkMode: 'always', // TODO: What is this used for again?
  });

  return {
    ...query,
    isNotFoundError:
      query.isError && query.error?.type === QueryErrorType.HTTP_NOT_FOUND,
    isOtherError: query.isError /*&&
      (query.error?.type === QueryErrorType.HTTP_OTHER ||
        query.error?.type === QueryErrorType.OTHER), */,
  };
}
