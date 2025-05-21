import { ServiceCategory } from '../service-category';
import { ApiServiceCategory } from './service-category';
import { mapApiToService } from './service.mapper';

export function mapApiToServiceCategory(
  data: ApiServiceCategory
): ServiceCategory {
  return { ...data, services: data.services.map((s) => mapApiToService(s)) };
}
