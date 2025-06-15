import { mapApiToServiceCategory } from '../types/api/service-category.mapper';
import { ApiServiceCategory } from '../types/api/service-category';
import { client } from './client';

export async function getServicesByCategory() {
  const servicesByCategory = await client.get<ApiServiceCategory[]>(
    'service-category', 2000
  );
  return servicesByCategory.map((sc) => mapApiToServiceCategory(sc));
}

export function addStaffToService(serviceId: number, staffId: number) {
  return client.post<void>(`service/${serviceId}/personnel/${staffId}`);
}

export function removeStaffFromService(serviceId: number, staffId: number) {
  return client.delete<void>(`service/${serviceId}/personnel/${staffId}`, {});
}
