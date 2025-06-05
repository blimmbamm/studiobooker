import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStaff, editStaff, getAllStaff, getStaff } from '../api/staff.api';
import { EditStaffDto, StaffStructured } from '../types/staff';
import { QueryError, QueryErrorType } from '../api/client';

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
  const query = useQuery<StaffStructured, QueryError>({
    queryKey: ['staff', staffId],
    queryFn: () => getStaff(staffId!),
    retry: (count, error) => {
      if (error.type === QueryErrorType.OTHER) {
        return count < 3;
      } else {
        return error.status >= 500 && count < 3;
      }
    },
    enabled: !!staffId,
    networkMode: 'always',
  });

  // Improvement: Exclude data

  return {
    ...query,
    isNotFoundError: query.error?.type === QueryErrorType.HTTP_NOT_FOUND,
    isOtherError:
      query.error?.type === QueryErrorType.HTTP_OTHER ||
      query.error?.type === QueryErrorType.OTHER, // both http errors and network/others
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
