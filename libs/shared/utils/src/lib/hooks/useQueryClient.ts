import {
  InvalidateQueryFilters,
  useQueryClient as useTanstackQueryClient,
} from '@tanstack/react-query';
import { useOptionalAuth } from '../contexts';

/**
 * Custom version of `useQueryClient`, that prepends queryKeys with company id 
 * when calling `invalidateQueries`
 */
export function useQueryClient() {
  const queryClient = useTanstackQueryClient();
  const auth = useOptionalAuth();

  const originalInvalidate = queryClient.invalidateQueries.bind(queryClient);

  // Enhanced version of invalidateQueries
  queryClient.invalidateQueries = function (filters?: InvalidateQueryFilters) {
    // If queryKey is set, preprend it with the id in auth, but only if not there already
    const finalFilters =
      filters?.queryKey && filters.queryKey?.[0] !== auth?.id
        ? {
            ...filters,
            queryKey: auth ? [auth.id, ...filters.queryKey] : filters.queryKey,
          }
        : filters;

    return originalInvalidate(finalFilters);
  };

  return queryClient;
}
