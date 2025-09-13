import { ServiceCategoryStructured } from '../service-category/service-category';

export type StudioInformation = {
  companyId: number;
  name: string;
  description: string;
  // TODO: This actually returns more data than this
  services: ServiceCategoryStructured[];
};
