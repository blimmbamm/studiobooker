import { ApiService } from './service';
import { ApiStaff } from './staff';

export type ApiAppointment = {
  id: number;
  start: string;
  duration: number;
  confirmed: boolean;
  personnel?: ApiStaff;
  service?: ApiService;
  customer: string | null;
  title: string;
  notes: string | null;
};
