'use client';

import {
  useQuery as useTanstackQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import { QueryError, QueryErrorType } from '../types';

export function useQuery<TData>(
  options: UseQueryOptions<TData, QueryError, TData, QueryKey>
): UseQueryResult<TData, QueryError> & {
  isNotFoundError: boolean;
  isOtherError: boolean;
} {
  const { queryKey, ...otherOptions } = options;

  const query = useTanstackQuery<TData, QueryError, TData, QueryKey>({
    ...otherOptions,
    queryKey,
    retry: (count, error) =>
      error.type === QueryErrorType.OTHER
        ? count < 3
        : error.status >= 500 && count < 3,
    // networkMode: 'always',
    // By default, useQuery only tries to fetch if
    // online. To simulate errors because of network, mode can be set to 'always'
    // and then switch to offline mode in the browser.
  });

  return {
    ...query,
    isNotFoundError:
      query.isError && query.error?.type === QueryErrorType.HTTP_NOT_FOUND,
    isOtherError: query.isError,
  };
}
