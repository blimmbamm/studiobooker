import { WorkingTime } from '@studiobooker/utils';

import { useEditWorkingTimeSetting } from '../../../../hooks/queries/working-time.queries';
import { useWorkingTime } from '../../../../hooks/working-time/useWorkingTime';

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
