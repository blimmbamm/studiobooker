import dayjs from 'dayjs';
import {
  ApiAppointmentSlot,
  ApiAvailableAppointmentSlots,
} from './appointment-slot.api';
import { AppointmentSlot, AvailableAppointmentSlots } from './appointment-slot';

export function mapApiToAppointmentSlot(
  data: ApiAppointmentSlot
): AppointmentSlot {
  return { ...data, date: dayjs(data.date) };
}

export function mapApiToAvailableAppointmentSlots(
  data: ApiAvailableAppointmentSlots
): AvailableAppointmentSlots {
  return {
    day: dayjs(data.day),
    slots: data.slots.map(mapApiToAppointmentSlot),
  };
}
