import { ApiStaffWithAppointments } from './staff';

export type ApiCalendarDay = {
  date: string;
  staffWithAppointments: ApiStaffWithAppointments[];
};
