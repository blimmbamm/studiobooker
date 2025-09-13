import { Dayjs } from 'dayjs';
import { StaffWithAppointments } from '../staff/staff';

export type CalendarDay = {
  date: Dayjs;
  dateStr: string;
  staffWithAppointments: StaffWithAppointments[];
};
