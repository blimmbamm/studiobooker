import { useQueryClient } from '@tanstack/react-query';

import { useQuery, useMutation } from '@studiobooker/utils';
import {
  addStaff,
  editStaff,
  getAllStaff,
  getStaff,
  removeStaff,
} from '../api/staff.api';
import { EditStaffDto } from '../types/staff';

export const StaffQueryKeys = {
  STAFF_ANY: ['staff'],
  STAFF_ALL: ['staff', 'all'],
  STAFF_DETAIL: (id: number) => ['staff', id],
};

export function useAllStaff() {
  const { data: staff, ...query } = useQuery({
    queryKey: StaffQueryKeys.STAFF_ALL,
    queryFn: () => getAllStaff(),
  });

  return {
    ...query,
    staff,
  };
}

export function useStaff(staffId?: number) {
  const { data: staff, ...query } = useQuery({
    queryKey: StaffQueryKeys.STAFF_DETAIL(staffId!),
    queryFn: () => getStaff(staffId!),
    enabled: !!staffId,
  });

  return {
    ...query,
    staff,
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
      queryClient.invalidateQueries({ queryKey: StaffQueryKeys.STAFF_ANY });
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
      queryClient.invalidateQueries({ queryKey: StaffQueryKeys.STAFF_ANY });
      args.onSuccess?.();
    },
    onError: () => {
      args.onError?.();
    },
  });
}

export function useRemoveStaff({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => removeStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: StaffQueryKeys.STAFF_ALL,
      });
      onSuccess?.();
    },
  });
}
