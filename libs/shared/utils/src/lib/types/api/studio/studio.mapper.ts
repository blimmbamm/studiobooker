import { mapApiToServiceCategoryStructured } from '../service-category/service-category.mapper';
import { StudioInformation } from './studio';
import { ApiStudioInformation } from './studio.api';

export function mapApiToStudioInformation(
  data: ApiStudioInformation
): StudioInformation {
  return {
    ...data,
    services: data.services.map(mapApiToServiceCategoryStructured),
  };
}
