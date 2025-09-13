import { ApiServiceCategoryStructured } from '../service-category/service-category.api';

export type ApiStudioInformation = {
  name: string;
  description: string;
  services: ApiServiceCategoryStructured[];
};
