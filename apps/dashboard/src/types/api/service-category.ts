import { ApiService, ApiServiceWithStaffQualification } from './service';

export type ApiServiceCategory = {
  id: number;
  name: string;
  services: ApiService[];
};

export type ApiServiceCategoryForStaff = Omit<ApiServiceCategory, 'services'> & {
  services: ApiServiceWithStaffQualification[];
};