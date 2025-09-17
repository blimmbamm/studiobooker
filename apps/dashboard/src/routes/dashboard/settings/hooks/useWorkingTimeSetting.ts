import { WorkingTime } from '@studiobooker/utils';

import { useWorkingTime } from '../../../../hooks/useWorkingTime';
import { useEditWorkingTimeSetting } from '../../../../hooks/working-time.queries';

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
