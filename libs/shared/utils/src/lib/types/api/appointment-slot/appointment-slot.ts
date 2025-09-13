import { Dayjs } from 'dayjs';

export type AppointmentSlot = {
  date: Dayjs;
  staffIds: number[];
};

export type AvailableAppointmentSlots = {
  day: Dayjs;
  slots: AppointmentSlot[];
};
