import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { getClient } from '../../http';
import { ApiCalendarDay } from '../../types/api/calendar-day/calendar-day.api';
import { mapApiToCalendarDay } from '../../types/api/calendar-day/calendar-day.mapper';
import {
  AddAppointmentDto,
  ApiAppointment,
  ApiAvailableAppointmentSlots,
  mapApiToAppointment,
  mapApiToAvailableAppointmentSlots,
  UpdateAppointmentDto,
} from '../../types';
import { CalendarDay } from '../../types/api/calendar-day/calendar-day';

dayjs.extend(isSameOrBefore);

export async function getCalendarData({
  from,
  to,
  staffIds,
}: {
  from: string;
  to: string;
  staffIds: number[];
}) {
  const calendarDays = await getClient().get<ApiCalendarDay[]>(
    `appointment?from=${from}&to=${to}&staff=${staffIds.toString()}`
  );
  console.log(calendarDays)
  console.log(calendarDays.map(mapApiToCalendarDay))

  return calendarDays.map(mapApiToCalendarDay);
}

export async function getAvailableAppointmentSlots(args: {
  start: Date; // this could be Dayjs
  serviceId: number;
  staffId: number;
}) {
  const slots = await getClient().post<ApiAvailableAppointmentSlots[]>(
    'appointment/available-slots',
    args
  );
  return slots.map(mapApiToAvailableAppointmentSlots);
}

export async function addAppointment(addAppointmentDto: AddAppointmentDto) {
  const appointment = await getClient().post<ApiAppointment>(
    'appointment',
    addAppointmentDto
  );

  return mapApiToAppointment(appointment);
}

export async function updateAppointment(id: number, dto: UpdateAppointmentDto) {
  const appointment = await getClient().patch<ApiAppointment>(
    `appointment/${id}`,
    dto
  );

  return mapApiToAppointment(appointment);
}

export async function cancelAppointment(id: number) {
  const appointment = await getClient().patch<ApiAppointment>(
    `appointment/cancel/${id}`,
    {}
  );

  return mapApiToAppointment(appointment);
}

export async function confirmAppointment(id: number) {
  const appointment = await getClient().patch<ApiAppointment>(
    `appointment/confirm/${id}`,
    {}
  );

  return mapApiToAppointment(appointment);
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
