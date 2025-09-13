import { ApiAppointment } from '../appointment/appointment.api';
import { ApiServiceCategoryForStaff } from '../service-category/service-category.api';
import { ApiWorkingTime } from '../working-time/working-time.api';

export type ApiStaff = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  activated: boolean;
};

export type ApiStaffWithServiceQualification = ApiStaff & {
  staffIsQualifiedForService: boolean;
};

export type ApiStaffStructured = ApiStaff & {
  workingTimes: ApiWorkingTime[];
  serviceCategories: ApiServiceCategoryForStaff[];
};

export type ApiStaffWithAppointments = ApiStaff & {
  appointments: ApiAppointment[];
};
