import { mapApiToServiceCategory } from '../types/api/service-category.mapper';
import { ApiServiceCategory } from '../types/api/service-category';
import { client } from './client';
import { ApiService } from '../types/api/service';
import { mapApiToService } from '../types/api/service.mapper';
import { EditServiceDto } from '../types/service';

export async function getServicesByCategory() {
  const servicesByCategory = await client.get<ApiServiceCategory[]>(
    'service-category',
    200
  );
  return servicesByCategory.map((sc) => mapApiToServiceCategory(sc));
}

export async function getService(id: number) {
  const service = await client.get<ApiService>(`service/${id}`, 200);
  return mapApiToService(service);
}

export async function editService(id: number, inputs: EditServiceDto) {
  const service = await client.patch<ApiService>(`service/${id}`, inputs);
  return mapApiToService(service);
}

export function addStaffToService(serviceId: number, staffId: number) {
  return client.post<void>(`service/${serviceId}/personnel/${staffId}`);
}

export function removeStaffFromService(serviceId: number, staffId: number) {
  return client.delete<void>(`service/${serviceId}/personnel/${staffId}`, {});
}
