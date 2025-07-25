import { Dayjs } from 'dayjs';

export type AppointmentSlot = {
  date: Dayjs;
  staffIds: number[];
};
