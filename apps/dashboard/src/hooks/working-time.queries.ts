import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditWorkingTimeDto } from '../types/working-time';
import { editWorkingTime } from '../api/working-time';
import { useDebouncedCallback } from '../../../../libs/shared/utils/src/lib/useDebouncedCallback';

export function useEditWorkingTime({
  workingTimeId,
  staffId,
}: {
  workingTimeId: number;
  staffId: number;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ inputs }: { inputs: EditWorkingTimeDto }) =>
      editWorkingTime(workingTimeId, inputs),
    onMutate: () => {
      // perform optimistic update
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    },
  });

  const [mutateDebounced, cancelMutateDebounced] = useDebouncedCallback(
    mutation.mutate,
    300
  );

  return {
    ...mutation,
    mutateDebounced,
    cancelMutateDebounced,
  };
}
