import { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
