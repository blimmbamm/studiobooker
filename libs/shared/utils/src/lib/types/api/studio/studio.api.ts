import { ApiServiceCategoryStructured } from '../service-category/service-category.api';

export type ApiStudioInformation = {
  companyId: number;
  name: string;
  description: string;
  services: ApiServiceCategoryStructured[];
};
