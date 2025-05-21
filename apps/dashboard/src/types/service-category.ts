import { Service, ServiceWithStaffQualification } from "./service";

export type ServiceCategory = {
  id: number;
  name: string;
  services: Service[]; // should this be optional? I guess yes, to be consistent with other types
}

export type ServiceCategoryForStaff = Omit<ServiceCategory, 'services'> & {
  services: ServiceWithStaffQualification[];
};