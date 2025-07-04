import { ApiStaff, ApiStaffStructured } from '../types/api/staff';
import {
  mapApiToStaff,
  mapApiToStaffStructured,
} from '../types/api/staff.mapper';
import { EditStaffDto } from '../types/staff';
import { client } from './client';

export async function getAllStaff() {
  const staff = await client.get<ApiStaff[]>('personnel', 300);
  return staff.map((s) => mapApiToStaff(s));
}

export async function getStaff(id: number) {
  const staff = await client.get<ApiStaffStructured>(`personnel/${id}`, 300);

  return mapApiToStaffStructured(staff);
}

export async function addStaff(name: string) {
  const staff = await client.post<ApiStaff>('personnel', { name });
  return mapApiToStaff(staff);
}

export async function editStaff(id: number, inputs: EditStaffDto) {
  const staff = await client.patch<ApiStaff>(`personnel/${id}`, inputs, 300);
  return mapApiToStaff(staff);
}

export async function removeStaff(id: number) {
  const staff = await client.delete<ApiStaff>(`personnel/${id}`, {});
  return mapApiToStaff(staff);
}
