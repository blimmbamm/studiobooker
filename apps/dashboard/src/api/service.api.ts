import { mapApiToServiceCategoryStructured } from '../types/api/service-category.mapper';
import {
  ApiServiceCategory,
  ApiServiceCategoryStructured,
} from '../types/api/service-category';
import { client } from './client';
import { ApiService, ApiServiceStructured } from '../types/api/service';
import {
  mapApiToService,
  mapApiToServiceStructured,
} from '../types/api/service.mapper';
import { EditServiceDto } from '../types/service';

export async function getServicesByCategory() {
  const servicesByCategory = await client.get<ApiServiceCategoryStructured[]>(
    'service-category',
    200
  );
  return servicesByCategory.map(mapApiToServiceCategoryStructured);
}

export async function getService(id: number) {
  const service = await client.get<ApiServiceStructured>(`service/${id}`, 200);
  return mapApiToServiceStructured(service);
}

export async function editService(id: number, inputs: EditServiceDto) {
  const service = await client.patch<ApiService>(`service/${id}`, inputs, 2000);
  return mapApiToService(service);
}

export async function editServiceServiceCategory(
  id: number,
  categoryId: number
) {
  const service = await client.patch<ApiService>(
    `service/${id}/category/${categoryId}`,
    {},
    500
  );

  return mapApiToService(service);
}

export function addStaffToService(serviceId: number, staffId: number) {
  return client.post<void>(`service/${serviceId}/personnel/${staffId}`);
}

export function removeStaffFromService(serviceId: number, staffId: number) {
  return client.delete<void>(`service/${serviceId}/personnel/${staffId}`, {});
}

export function addCategory(name: string) {
  return client.post<ApiServiceCategory>('service-category', { name });
}

export function addService(title: string, categoryId: number) {
  return client.post<ApiService>(`service-category/${categoryId}/service`, {
    title,
  });
}

export async function removeService(id: number) {
  const service = await client.delete<ApiService>(`service/${id}`, {});
  return mapApiToService(service);
}
