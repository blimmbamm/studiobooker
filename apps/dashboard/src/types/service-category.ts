import { Service, ServiceWithStaffQualification } from './service';

export type ServiceCategory = {
  id: number;
  name: string;
};

export type ServiceCategoryStructured = ServiceCategory & {
  services: Service[];
};

// export type ServiceCategoryForStaff = Omit<ServiceCategory, 'services'> & {
//   services: ServiceWithStaffQualification[];
// };
export type ServiceCategoryForStaff = ServiceCategory & {
  services: ServiceWithStaffQualification[];
};
