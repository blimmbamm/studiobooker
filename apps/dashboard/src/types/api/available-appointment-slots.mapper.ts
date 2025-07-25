import dayjs from 'dayjs';
import { AvailableAppointmentSlots } from '../available-appointment-slots';
import { ApiAvailableAppointmentSlots } from './available-appointment-slots';
import { mapApiToAppointmentSlot } from './appointment-slot.mapper';

export function mapApiToAvailableAppointmentSlots(
  data: ApiAvailableAppointmentSlots
): AvailableAppointmentSlots {
  return {
    day: dayjs(data.day),
    slots: data.slots.map(mapApiToAppointmentSlot),
  };
}
