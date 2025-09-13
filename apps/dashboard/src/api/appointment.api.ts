import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

import { ApiCalendarDay } from '../types/api/calendar-day';
import { mapApiToCalendarDay } from '../types/api/calendar-day.mapper';
import { CalendarDay } from '../types/calendar-day';
import { client } from './client';
import { ApiAvailableAppointmentSlots } from '../types/api/available-appointment-slots';
import { mapApiToAvailableAppointmentSlots } from '../types/api/available-appointment-slots.mapper';
import { AddAppointmentDto, UpdateAppointmentDto } from '../types/appointment';
import { ApiAppointment } from '../types/api/appointment';
import { mapApiToAppointment } from '../types/api/appointment.mapper';

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
    `appointment?from=${from}&to=${to}&staff=${staffIds.toString()}`
  );

  return calendarDays.map(mapApiToCalendarDay);
}

export async function getAvailableAppointmentSlots(args: {
  start: Date; // TODO: could this be Dayjs?
  serviceId: number;
  staffId: number;
}) {
  const slots = await client.post<ApiAvailableAppointmentSlots[]>(
    'appointment/available-slots',
    args
  );
  return slots.map(mapApiToAvailableAppointmentSlots);
}

export async function addAppointment(addAppointmentDto: AddAppointmentDto) {
  const appointment = await client.post<ApiAppointment>(
    'appointment',
    addAppointmentDto
  );

  return mapApiToAppointment(appointment);
}

export async function updateAppointment(id: number, dto: UpdateAppointmentDto) {
  const appointment = await client.patch<ApiAppointment>(
    `appointment/${id}`,
    dto
  );

  return mapApiToAppointment(appointment);
}

export async function cancelAppointment(id: number) {
  const appointment = await client.patch<ApiAppointment>(
    `appointment/cancel/${id}`,
    {}
  );

  return mapApiToAppointment(appointment);
}

export async function confirmAppointment(id: number) {
  const appointment = await client.patch<ApiAppointment>(
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
