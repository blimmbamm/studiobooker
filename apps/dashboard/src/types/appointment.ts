import { Dayjs } from 'dayjs';
import { Service } from './service';
import { Staff } from './staff';

export type Appointment = {
  id: number;
  start: Dayjs;
  end: Dayjs;
  startNum: number;
  duration: number;
  confirmed: boolean;
  personnel?: Staff;
  service?: Service;
  customer: string | null;
  title: string;
  notes: string | null;
};

export type AddAppointmentDto = {
  start: Dayjs;
  duration: number;
  confirmed: boolean;
  title: string;
  notes: string;
  customerName: string;
  customerEmail: string;
  serviceId: number;
  staffId: number;
};
