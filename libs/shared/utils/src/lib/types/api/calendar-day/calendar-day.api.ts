import { ApiStaffWithAppointments } from '../staff/staff.api';

export type ApiCalendarDay = {
  date: string;
  staffWithAppointments: ApiStaffWithAppointments[];
};
