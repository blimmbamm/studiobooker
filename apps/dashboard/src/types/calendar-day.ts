import { Dayjs } from 'dayjs';
import { StaffWithAppointments } from './staff';

export type CalendarDay = {
  date: Dayjs;
  dateStr: string;
  staffWithAppointments: StaffWithAppointments[];
};
