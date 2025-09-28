import { ServiceCategoryStructured } from '../service-category/service-category';

export type StudioInformation = {
  companyId: number;
  name: string;
  description: string;
  services: ServiceCategoryStructured[];
  // This actually returns more data than this, but not needed
};
