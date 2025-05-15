import { ApiService } from './service';
import { ApiServiceCategory } from './service-category';
import { ApiWorkingTime } from './working-time';

export type ApiStaff = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
};

export type ApiStaffStructured = ApiStaff & {
  workingTimes: ApiWorkingTime[];
  serviceCategories: Array<
    Omit<ApiServiceCategory, 'services'> & {
      services: Array<ApiService & { staffIsQualifiedForService: boolean }>;
    }
  >;
};
