import { ApiStaff } from '../types/api/staff';
import { mapApiToStaff } from '../types/api/staff.mapper';
import { get, post } from './client';

export async function getAllStaff() {
  const staff = await get<ApiStaff[]>('personnel');
  console.log(staff)

  return staff.map((s) => mapApiToStaff(s));
}

export async function addStaff(name: string) {
  const staff = await post<ApiStaff>('personnel', { name });
  return mapApiToStaff(staff);
}
