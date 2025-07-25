import { ApiWorkingTime } from '../types/api/working-time';
import { mapApiToWorkingTime } from '../types/api/working-time.mapper';
import { EditWorkingTimeDto } from '../types/working-time';
import { client } from './client';

export async function editWorkingTime(id: number, inputs: EditWorkingTimeDto) {
  const workingTime = await client.patch<ApiWorkingTime>(
    `working-time/${id}`,
    inputs,
  );

  return mapApiToWorkingTime(workingTime);
}

export async function editWorkingTimeSetting(
  id: number,
  inputs: EditWorkingTimeDto
) {
  const workingTime = await client.patch<ApiWorkingTime>(
    `working-time-company-settings/${id}`,
    inputs,
  );

  return mapApiToWorkingTime(workingTime);
}
