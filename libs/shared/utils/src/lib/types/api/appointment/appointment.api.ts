import { ApiService } from '../service/service.api';
import { ApiStaff } from '../staff/staff.api';
import { AppointmentStatus } from './appointment';

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
