import {
  ServiceCategory,
  ServiceCategoryStructured,
} from '../service-category';
import {
  ApiServiceCategory,
  ApiServiceCategoryStructured,
} from './service-category';
import { mapApiToService } from './service.mapper';

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
