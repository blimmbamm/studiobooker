import { Staff } from '../staff';
import { ApiStaff } from './staff';

export function mapApiToStaff(data: ApiStaff): Staff {
  return data;
}
