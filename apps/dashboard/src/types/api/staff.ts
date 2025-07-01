import {
  ApiServiceCategoryForStaff,
} from './service-category';
import { ApiWorkingTime } from './working-time';

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
}

export type ApiStaffStructured = ApiStaff & {
  workingTimes: ApiWorkingTime[];
  serviceCategories: ApiServiceCategoryForStaff[];
};
