import { useQueryClient as useTanstackQueryClient } from '@tanstack/react-query';

/**
 * This used to be a customized version of tanstack's useQueryClient, but
 * things got to complicated...
 */
export const useQueryClient = useTanstackQueryClient;
