import { ApiStaff, ApiStaffStructured } from '../types/api/staff';
import {
  mapApiToStaff,
  mapApiToStaffStructured,
} from '../types/api/staff.mapper';
import { EditStaffDto } from '../types/staff';
import { client } from './client';

function toSearchParams(params?: Record<string, any>): URLSearchParams {
  if (!params) return new URLSearchParams();

  const stringParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      stringParams[key] = String(value);
    }
  });

  return new URLSearchParams(stringParams);
}

export type GetAllStaffSearchParams = {
  serviceId?: number;
  activated?: boolean;
};

export async function getAllStaff(searchParams?: GetAllStaffSearchParams) {
  const urlSearchParams = new URLSearchParams(toSearchParams(searchParams));
  const path = `personnel?${urlSearchParams}`;
  const staff = await client.get<ApiStaff[]>(path);
  return staff.map(mapApiToStaff);
}

export async function getStaff(id: number) {
  const staff = await client.get<ApiStaffStructured>(`personnel/${id}`);

  return mapApiToStaffStructured(staff);
}

export async function addStaff(name: string) {
  const staff = await client.post<ApiStaff>('personnel', { name });
  return mapApiToStaff(staff);
}

export async function editStaff(id: number, inputs: EditStaffDto) {
  const staff = await client.patch<ApiStaff>(`personnel/${id}`, inputs);
  return mapApiToStaff(staff);
}

export async function removeStaff(id: number) {
  const staff = await client.delete<ApiStaff>(`personnel/${id}`, {});
  return mapApiToStaff(staff);
}
