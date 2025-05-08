import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStaff, getAllStaff } from '../api/staff.api';

export function useAllStaff() {
  const query = useQuery({
    queryKey: ['staff'],
    queryFn: () => getAllStaff(),
  });

  return {
    ...query,
    staff: query.data,
  };
}

export function useStaff() {}

export function useAddStaff(args: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { name: string }) => addStaff(variables.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      args.onSuccess?.();
    },
    onError: () => {
      args.onError?.();
    },
  });
}
