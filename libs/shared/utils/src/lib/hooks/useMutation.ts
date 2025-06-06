import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { QueryError } from '../types';
import { useAlert } from '../components';

export function useMutation<TData, TVariables, TContext = unknown>(
  options: UseMutationOptions<TData, QueryError, TVariables, TContext> & {
    useDefaultErrorHandling?: boolean;
  }
): UseMutationResult<TData, QueryError, TVariables, TContext> {
  const alert = useAlert();

  const { onError, useDefaultErrorHandling = true, ...restOptions } = options;

  return useTanstackMutation({
    ...restOptions,
    onError: (error, variables, context) => {
      if (useDefaultErrorHandling) {
        alert.show({
          message: "Hmm, this didn't work :(",
          severity: 'error',
        });
      }

      if (onError) {
        onError(error, variables, context);
      }
    },
  });
}

// type UseMutationParams = Parameters<typeof useTanstackMutation> & {
//   useDefaultErrorHandling: boolean;
// };
// type UseMutationReturn = ReturnType<typeof useTanstackMutation>;

// export function useMutation2(...args: UseMutationParams): UseMutationReturn {
//   const { useDefaultErrorHandling, ...other } = args;
//   const [options] = other;

//   const mutation = useTanstackMutation({
//     ...options,
//     onError: (error, variables, context) => {
//       console.log('default alert logic');
//       options.onError?.(error, variables, context);
//     },
//   });

//   return mutation;
// }
