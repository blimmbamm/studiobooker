import { ApiServiceCategory } from './service-category';
import { ApiStaffWithServiceQualification } from './staff';

export type ApiService = {
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  price: number | null;
  activated: boolean;
};

export type ApiServiceWithStaffQualification = ApiService & {
  staffIsQualifiedForService: boolean;
};

export type ApiServiceStructured = ApiService & {
  personnel: ApiStaffWithServiceQualification[]; // in backend, this is still called personnel, but use staff in client
  serviceCategory: ApiServiceCategory;
};
