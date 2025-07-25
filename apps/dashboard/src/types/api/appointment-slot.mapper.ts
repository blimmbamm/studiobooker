import dayjs from 'dayjs';
import { AppointmentSlot } from '../appointment-slot';
import { ApiAppointmentSlot } from './appointment-slot';

export function mapApiToAppointmentSlot(
  data: ApiAppointmentSlot
): AppointmentSlot {
  return { ...data, date: dayjs(data.date) };
}
