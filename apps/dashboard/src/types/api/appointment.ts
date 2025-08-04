import { AppointmentStatus } from '../appointment';
import { ApiService } from './service';
import { ApiStaff } from './staff';

export type ApiAppointment = {
  id: number;
  start: string;
  duration: number;
  status: AppointmentStatus;
  personnel?: ApiStaff;
  service?: ApiService;
  customerName: string | null;
  customerEmail: string | null;
  title: string;
  notes: string | null;
};
