import { Service, ServiceWithStaffQualification } from "./service";

export type ServiceCategory = {
  id: number;
  name: string;
  services: Service[];
}

export type ServiceCategoryForStaff = Omit<ServiceCategory, 'services'> & {
  services: ServiceWithStaffQualification[];
};