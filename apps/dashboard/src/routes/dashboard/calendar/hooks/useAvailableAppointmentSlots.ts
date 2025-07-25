import { Dayjs } from 'dayjs';

import { useQuery } from '@studiobooker/utils';
import { getAvailableAppointmentSlots } from '../../../../api/appointment.api';
import { Service } from 'apps/dashboard/src/types/service';
import { Staff } from 'apps/dashboard/src/types/staff';

type UseAvailableAppointmentSlotsParams = {
  service: Service;
  staff: Staff;
  date: Dayjs;
};
export function useAvailableAppointmentSlots({
  service,
  staff,
  date,
}: UseAvailableAppointmentSlotsParams) {
  const { data: slots, ...query } = useQuery({
    queryKey: ['appointment-slots', service, staff, date.format('YYYY-MM-DD')],
    queryFn: () =>
      getAvailableAppointmentSlots({
        staffId: staff.id,
        serviceId: service.id,
        start: date.toDate(),
      }),
  });

  const noSlots = slots && slots.every(({ slots }) => slots.length === 0);

  return {
    slots,
    noSlots,
    ...query,
  };
}
