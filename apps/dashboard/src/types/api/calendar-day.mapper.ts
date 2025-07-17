import dayjs from 'dayjs';
import { CalendarDay } from '../calendar-day';
import { ApiCalendarDay } from './calendar-day';
import { mapApiToStaffWithAppointments } from './staff.mapper';

export function mapApiToCalendarDay(data: ApiCalendarDay): CalendarDay {
  return {
    date: dayjs(data.date),
    dateStr: data.date,
    staffWithAppointments: data.staffWithAppointments.map(
      mapApiToStaffWithAppointments
    ),
  };
}
