import { getClient } from '../../http';
import { EditWorkingTimeDto } from '../../types/api/working-time/working-time';
import { ApiWorkingTime } from '../../types/api/working-time/working-time.api';
import { mapApiToWorkingTime } from '../../types/api/working-time/working-time.mapper';

export async function editWorkingTime(id: number, inputs: EditWorkingTimeDto) {
  const workingTime = await getClient().patch<ApiWorkingTime>(
    `working-time/${id}`,
    inputs
  );

  return mapApiToWorkingTime(workingTime);
}

export async function editWorkingTimeSetting(
  id: number,
  inputs: EditWorkingTimeDto
) {
  const workingTime = await getClient().patch<ApiWorkingTime>(
    `working-time-company-settings/${id}`,
    inputs
  );

  return mapApiToWorkingTime(workingTime);
}
