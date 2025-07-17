import { Appointment } from './appointment';
import { ServiceCategoryForStaff } from './service-category';
import { WorkingTime } from './working-time';

export type Staff = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  activated: boolean;
};

export type StaffWithServiceQualification = Staff & {
  staffIsQualifiedForService: boolean;
};

export type StaffStructured = Staff & {
  workingTimes: WorkingTime[];
  serviceCategories: ServiceCategoryForStaff[];
};

export type StaffWithAppointments = Staff & {
  appointments: Appointment[];
};

export type EditStaffDto = {
  name?: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  activated?: boolean;
};
