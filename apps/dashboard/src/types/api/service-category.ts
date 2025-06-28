import { ApiService, ApiServiceWithStaffQualification } from './service';

export type ApiServiceCategory = {
  id: number;
  name: string;
};

export type ApiServiceCategoryStructured = ApiServiceCategory & {
  services: ApiService[];
};

export type ApiServiceCategoryForStaff = ApiServiceCategory & {
  services: ApiServiceWithStaffQualification[];
};
