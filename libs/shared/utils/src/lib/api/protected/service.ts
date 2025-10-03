import { getClient } from '../../http';
import {
  ApiService,
  ApiServiceStructured,
  EditServiceCategoryDto,
  EditServiceDto,
  mapApiToService,
  mapApiToServiceStructured,
} from '../../types';
import {
  ApiServiceCategory,
  ApiServiceCategoryStructured,
} from '../../types/api/service-category/service-category.api';
import {
  mapApiToServiceCategory,
  mapApiToServiceCategoryStructured,
} from '../../types/api/service-category/service-category.mapper';

export async function getServicesByCategory(onlyActivatedServices?: boolean) {
  const servicesByCategory = await getClient().get<
    ApiServiceCategoryStructured[]
  >(
    `service-category?${
      onlyActivatedServices ? `activated=${Boolean(onlyActivatedServices)}` : ''
    }`
  );
  return servicesByCategory.map(mapApiToServiceCategoryStructured);
}

export async function getService(id: number) {
  const service = await getClient().get<ApiServiceStructured>(`service/${id}`);
  return mapApiToServiceStructured(service);
}

export async function editService(id: number, inputs: EditServiceDto) {
  const service = await getClient().patch<ApiService>(`service/${id}`, inputs);
  return mapApiToService(service);
}

export async function editServiceCategory(
  id: number,
  inputs: EditServiceCategoryDto
) {
  const category = await getClient().patch<ApiServiceCategory>(
    `service-category/${id}`,
    inputs
  );

  return mapApiToServiceCategory(category);
}

export async function editServiceServiceCategory(
  id: number,
  categoryId: number
) {
  const service = await getClient().patch<ApiService>(
    `service/${id}/category/${categoryId}`,
    {}
  );

  return mapApiToService(service);
}

export function addStaffToService(serviceId: number, staffId: number) {
  return getClient().post<void>(`service/${serviceId}/personnel/${staffId}`);
}

export function removeStaffFromService(serviceId: number, staffId: number) {
  return getClient().delete<void>(
    `service/${serviceId}/personnel/${staffId}`,
    {}
  );
}

export function addCategory(name: string) {
  return getClient().post<ApiServiceCategory>('service-category', { name });
}

export function addService(title: string, categoryId: number) {
  return getClient().post<ApiService>(
    `service-category/${categoryId}/service`,
    {
      title,
    }
  );
}

export async function removeService(id: number) {
  const service = await getClient().delete<ApiService>(`service/${id}`, {});
  return mapApiToService(service);
}

export async function removeCategory(id: number) {
  const category = await getClient().delete<ApiServiceCategory>(
    `service-category/${id}`,
    {}
  );
  return mapApiToServiceCategory(category);
}
