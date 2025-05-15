import { ServiceCategory } from '../service-category';
import { ApiServiceCategory } from './service-category';

export function mapApiToServiceCategory(
  data: ApiServiceCategory
): ServiceCategory {
  return data;
}
