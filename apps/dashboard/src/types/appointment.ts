import { Dayjs } from 'dayjs';
import { Service } from './service';
import { Staff } from './staff';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export type Appointment = {
  id: number;
  start: Dayjs;
  end: Dayjs;
  startNum: number;
  duration: number;
  status: AppointmentStatus;
  personnel?: Staff;
  service?: Service;
  customer: string | null;
  title: string;
  notes: string | null;
};

export type AddAppointmentDto = {
  start: Dayjs;
  duration: number;
  status: AppointmentStatus;
  title: string;
  notes: string;
  customerName: string;
  customerEmail: string;
  serviceId: number;
  staffId: number;
};

export type UpdateAppointmentDto = Partial<AddAppointmentDto>;
