import { mapApiToService } from '../service/service.mapper';
import { ServiceCategory, ServiceCategoryStructured } from './service-category';
import {
  ApiServiceCategory,
  ApiServiceCategoryStructured,
} from './service-category.api';

export function mapApiToServiceCategory(
  data: ApiServiceCategory
): ServiceCategory {
  return { ...data };
}

export function mapApiToServiceCategoryStructured(
  data: ApiServiceCategoryStructured
): ServiceCategoryStructured {
  return { ...data, services: data.services.map(mapApiToService) };
}
