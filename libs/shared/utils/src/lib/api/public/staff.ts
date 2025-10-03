import { getClient } from '../../http';
import { ApiStaff } from '../../types/api/staff/staff.api';
import { mapApiToStaff } from '../../types/api/staff/staff.mapper';

export async function getStaffByServicePublic({
  companyId,
  serviceId,
}: {
  companyId: number;
  serviceId: number;
}) {
  const staff = await getClient().post<ApiStaff[]>('public/service-personnel', {
    companyId,
    serviceId,
  });
  return staff.map(mapApiToStaff);
}
