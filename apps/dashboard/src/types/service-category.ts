import { Service, ServiceWithStaffQualification } from './service';

export type ServiceCategory = {
  id: number;
  name: string;
};

export type ServiceCategoryStructured = ServiceCategory & {
  services: Service[];
};

export type ServiceCategoryForStaff = ServiceCategory & {
  services: ServiceWithStaffQualification[];
};

export type EditServiceCategoryDto = {
  name?: string;
};
