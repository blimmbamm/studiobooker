import dayjs from 'dayjs';
import { ApiCalendarDay } from './calendar-day.api';
import { CalendarDay } from './calendar-day';
import { mapApiToStaffWithAppointments } from '../staff/staff.mapper';

export function mapApiToCalendarDay(data: ApiCalendarDay): CalendarDay {
  return {
    date: dayjs(data.date),
    dateStr: data.date,
    staffWithAppointments: data.staffWithAppointments.map(
      mapApiToStaffWithAppointments
    ),
  };
}
