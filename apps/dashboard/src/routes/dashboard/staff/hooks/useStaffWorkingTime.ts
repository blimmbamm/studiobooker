import { WorkingTime } from '@studiobooker/utils';

import { useEditWorkingTime } from '../../../../hooks/working-time.queries';
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
