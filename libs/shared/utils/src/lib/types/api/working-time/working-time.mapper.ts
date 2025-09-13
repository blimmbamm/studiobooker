import { WorkingTime } from './working-time';
import { ApiWorkingTime } from './working-time.api';

export function mapApiToWorkingTime(data: ApiWorkingTime): WorkingTime {
  return data;
}
