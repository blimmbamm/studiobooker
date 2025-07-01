import { useQueryClient } from '@tanstack/react-query';

import { useQuery, useMutation } from '@studiobooker/utils';
import {
  addStaff,
  editStaff,
  getAllStaff,
  getStaff,
  removeStaff,
} from '../api/staff.api';
import { EditStaffDto, StaffStructured } from '../types/staff';

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

export function useEditStaff({
  staffId,
  onError,
  onSuccess,
  withOptimisticUpdating = false,
}: {
  staffId: number;
  onError?: () => void;
  onSuccess?: () => void;
  withOptimisticUpdating?: boolean;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { input: EditStaffDto }) =>
      editStaff(staffId, variables.input),
    onMutate: ({ input }) => {
      if (withOptimisticUpdating) {
        const queryKey = StaffQueryKeys.STAFF_DETAIL(staffId);
        queryClient.cancelQueries({ queryKey });

        const prevStaff = queryClient.getQueryData<StaffStructured>(queryKey);

        queryClient.setQueryData<StaffStructured>(queryKey, (data) => {
          if (!data) return data;

          const newData = structuredClone(data);

          return { ...newData, ...input };
        });

        return { prevStaff, queryKey };
      } else {
        return;
      }
    },
    onSuccess: () => {
      // this will invalidate both staff and staff details... actually invalidating the edited detail would be enough
      queryClient.invalidateQueries({ queryKey: StaffQueryKeys.STAFF_ANY });
      onSuccess?.();
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.prevStaff);
      }
      onError?.();
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
