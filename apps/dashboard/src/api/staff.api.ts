import { ApiStaff, ApiStaffStructured } from '../types/api/staff';
import {
  mapApiToStaff,
  mapApiToStaffStructured,
} from '../types/api/staff.mapper';
import { EditStaffDto } from '../types/staff';
import { client } from './client';

export async function getAllStaff() {
  const staff = await client.get<ApiStaff[]>('personnel');
  return staff.map((s) => mapApiToStaff(s));
}

export async function getStaff(id: number) {
  const staff = await client.get<ApiStaffStructured>(`personnel/${id}`);

  console.log(staff);

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
