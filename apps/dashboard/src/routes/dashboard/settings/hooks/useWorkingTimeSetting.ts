import { useWorkingTime } from '../../../../hooks/useWorkingTime';
import { useEditWorkingTimeSetting } from '../../../../hooks/working-time.queries';
import { WorkingTime } from '../../../../types/working-time';

type UseWorkingTimeSettingParams = {
  workingTime: WorkingTime;
};

export function useWorkingTimeSetting({
  workingTime,
}: UseWorkingTimeSettingParams) {
  const { mutate, mutateDebounced } = useEditWorkingTimeSetting({
    id: workingTime.id,
  });

  return useWorkingTime({
    workingTime,
    mutate,
    mutateDebounced,
  });
}
