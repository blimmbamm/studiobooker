import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditWorkingTimeDto } from '../types/working-time';
import { editWorkingTime } from '../api/working-time';
import { useDebouncedCallback } from '../../../../libs/shared/utils/src/lib/useDebouncedCallback';
import { StaffStructured } from '../types/staff';

export function useEditWorkingTime({
  workingTimeId,
  staffId,
  onEditing,
}: {
  workingTimeId: number;
  staffId: number;
  onEditing: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ inputs }: { inputs: EditWorkingTimeDto }) =>
      editWorkingTime(workingTimeId, inputs),
    onMutate: ({ inputs }) => {
      queryClient.cancelQueries({ queryKey: ['staff', staffId] });

      const prevStaff = queryClient.getQueryData<StaffStructured>([
        'staff',
        staffId,
      ]);

      queryClient.setQueryData<StaffStructured>(['staff', staffId], (data) => {
        if (!data) return data;

        const optimisticallyUpdatedStaff: StaffStructured = {
          ...data,
          workingTimes: data.workingTimes.map((wt) =>
            wt.id === workingTimeId ? { ...wt, ...inputs } : wt
          ),
        };

        return optimisticallyUpdatedStaff;
      });
      return { prevStaff };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    },
  });

  const [mutateDebounced, cancelMutateDebounced] = useDebouncedCallback(
    (variables: { inputs: EditWorkingTimeDto }) => {
      onEditing();
      mutation.mutate(variables);
    },
    500
  );

  return {
    ...mutation,
    mutateDebounced,
    cancelMutateDebounced,
  };
}
