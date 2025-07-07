import { WorkingTimeSetting } from '../working-time-setting';
import { ApiWorkingTimeSetting } from './working-time-setting';

export function mapApiToWorkingTimeSetting(
  data: ApiWorkingTimeSetting
): WorkingTimeSetting {
  return { ...data };
}
