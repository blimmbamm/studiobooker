import { Dayjs } from 'dayjs';
import { AppointmentSlot } from './appointment-slot';

export type AvailableAppointmentSlots = {
  day: Dayjs;
  slots: AppointmentSlot[];
};
