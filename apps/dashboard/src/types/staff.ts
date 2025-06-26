import { ServiceCategoryForStaff } from './service-category';
import { WorkingTime } from './working-time';

export type Staff = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
};

export type StaffStructured = Staff & {
  workingTimes: WorkingTime[];
  serviceCategories: ServiceCategoryForStaff[];
};

export type EditStaffDto = {
  name?: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
};
