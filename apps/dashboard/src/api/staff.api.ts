import { ApiStaff } from '../types/api/staff';
import { mapApiToStaff } from '../types/api/staff.mapper';
import { EditStaffDto } from '../types/staff';
import { get, patch, post } from './client';

export async function getAllStaff() {
  const staff = await get<ApiStaff[]>('personnel');
  return staff.map((s) => mapApiToStaff(s));
}

export async function getStaff(id: number) {
  const staff = await get<ApiStaff>(`personnel/${id}`);
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('fetched staff details')
  return mapApiToStaff(staff);
}

export async function addStaff(name: string) {
  const staff = await post<ApiStaff>('personnel', { name });
  return mapApiToStaff(staff);
}

export async function editStaff(id: number, inputs: EditStaffDto) {
  const staff = await patch<ApiStaff>(`personnel/${id}`, inputs);
  return mapApiToStaff(staff);
}
