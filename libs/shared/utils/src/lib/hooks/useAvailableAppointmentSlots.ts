import { Dayjs } from 'dayjs';
import { AvailableAppointmentSlots, Service, Staff } from '../types';
import { QueryKey } from '@tanstack/react-query';
import { useQuery } from './useQuery';

type UseAvailableAppointmentSlotsParams = {
  service: Service;
  staff: Staff;
  start: Dayjs;
};

export function createUseAvailableAppointmentSlots({
  queryKey,
  queryFn,
}: {
  queryKey: (args: UseAvailableAppointmentSlotsParams) => QueryKey;
  queryFn: (
    args: UseAvailableAppointmentSlotsParams
  ) => Promise<AvailableAppointmentSlots[]>;
}) {
  return function (args: UseAvailableAppointmentSlotsParams) {
    const { data: slots, ...query } = useQuery({
      queryKey: queryKey(args),
      queryFn: () => queryFn(args),
    });

    const noSlots = slots && slots.every(({ slots }) => slots.length === 0);

    return {
      slots,
      noSlots,
      ...query,
    };
  };
}
