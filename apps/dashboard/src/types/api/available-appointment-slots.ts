import { ApiAppointmentSlot } from './appointment-slot';

export type ApiAvailableAppointmentSlots = {
  day: string;
  slots: ApiAppointmentSlot[];
};
