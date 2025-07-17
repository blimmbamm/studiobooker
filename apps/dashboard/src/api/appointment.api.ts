import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

import { ApiCalendarDay } from '../types/api/calendar-day';
import { mapApiToCalendarDay } from '../types/api/calendar-day.mapper';
import { CalendarDay } from '../types/calendar-day';
import { client } from './client';

export async function getCalendarData({
  from,
  to,
  staffIds,
}: {
  from: string;
  to: string;
  staffIds: number[];
}) {
  const calendarDays = await client.get<ApiCalendarDay[]>(
    `appointment?from=${from}&to=${to}&staff=${staffIds.toString()}`,
    500
  );

  return calendarDays.map(mapApiToCalendarDay);
}

export function getPlaceholderCalendarData({
  from,
  to,
}: {
  from: string;
  to: string;
}): CalendarDay[] {
  const dates: CalendarDay[] = [];

  const start = dayjs.utc(from, 'YYYYMMDD');
  const end = dayjs.utc(to, 'YYYYMMDD');

  for (let i = 0; start.add(i, 'day').isSameOrBefore(end, 'day'); i++) {
    const date = start.add(i, 'day');
    const dateStr = date.format('YYYY-MM-DD');
    dates.push({
      date,
      dateStr,
      staffWithAppointments: [],
    });
  }

  return dates;
}
