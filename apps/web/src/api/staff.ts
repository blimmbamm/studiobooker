import { ApiStaff } from '../../../../libs/shared/utils/src/lib/types/api/staff/staff.api';
import { mapApiToStaff } from '../../../../libs/shared/utils/src/lib/types/api/staff/staff.mapper';
import { client } from './client';

export async function getStaffByService({
  companyId,
  serviceId,
}: {
  companyId: number;
  serviceId: number;
}) {
  const staff = await client.post<ApiStaff[]>('public/service-personnel', {
    companyId,
    serviceId,
  });
  return staff.map(mapApiToStaff);
}
