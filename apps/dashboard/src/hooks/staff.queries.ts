import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStaff, editStaff, getAllStaff, getStaff } from '../api/staff.api';
import { EditStaffDto } from '../types/staff';
import { CustomError } from '../api/client';

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

export function useStaff(staffId?: number) {
  const query = useQuery({
    queryKey: ['staff', staffId],
    queryFn: () => getStaff(staffId!),
    retry: (count, error) => {
      const e = error as CustomError;
      if (e.status === 404) {
        return false;
      } else {
        return count <= 3;
      }
    },
    enabled: !!staffId,
  });

  console.log(query.error?.message);

  // Improvement: Exclude data

  return {
    ...query,
    staff: query.data,
  };
}

export function useAddStaff(
  args: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) {
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

export function useEditStaff(args: {
  staffId: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { input: EditStaffDto }) =>
      editStaff(args.staffId, variables.input),
    onSuccess: () => {
      // this will invalidate both staff and staff details
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      args.onSuccess?.();
    },
    onError: () => {
      args.onError?.();
    },
  });
}
