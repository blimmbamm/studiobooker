import { Dayjs } from 'dayjs';
import { Service } from './service';
import { Staff } from './staff';

export type Appointment = {
  id: number;
  start: Dayjs;
  startNum: number;
  duration: number;
  confirmed: boolean;
  personnel?: Staff;
  service?: Service;
  customer: string | null;
  title: string;
  notes: string | null;
};
