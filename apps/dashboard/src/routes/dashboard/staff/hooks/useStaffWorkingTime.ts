import { useEditWorkingTime } from '../../../../hooks/working-time.queries';
import { WorkingTime } from '../../../../types/working-time';
import { useWorkingTime } from '../../../../hooks/useWorkingTime';

export function useStaffWorkingTime({
  staffId,
  workingTime,
}: {
  staffId: number;
  workingTime: WorkingTime;
}) {
  const editWorkingTimeMutation = useEditWorkingTime({
    workingTimeId: workingTime.id,
    staffId: staffId,
  });

  return useWorkingTime({
    workingTime,
    mutate: editWorkingTimeMutation.mutate,
    mutateDebounced: editWorkingTimeMutation.mutateDebounced,
  });
}
