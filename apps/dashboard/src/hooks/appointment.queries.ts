import { useMutation, useQueryClient } from '@studiobooker/utils';
import {
  AddAppointmentDto,
  Appointment,
  UpdateAppointmentDto,
} from '../types/appointment';
import {
  addAppointment,
  cancelAppointment,
  confirmAppointment,
  updateAppointment,
} from '../api/appointment.api';
import { QueryKey } from '@tanstack/react-query';

function useInvalidateAppointmentQueries() {
  const queryClient = useQueryClient();

  function invalidateAppointmentQueries(appointment: Appointment) {
    /** Invalidate fitting calendar day queries:
     * - dto.start must be included in timeRange
     * - dto.staffId must be included in the staffIds
     */
    const fromLastMonday = appointment.start
      .day(appointment.start.day() === 0 ? -6 : 1)
      .format('YYYYMMDD');
    const fromToday = appointment.start.format('YYYYMMDD');

    queryClient.invalidateQueries({
      predicate: ({ queryKey }: { queryKey: QueryKey }) => {
        if (
          Array.isArray(queryKey) &&
          typeof queryKey[0] === 'object' &&
          queryKey[0] !== null &&
          'from' in queryKey[0] &&
          'to' in queryKey[0] &&
          Array.isArray(queryKey[1])
        ) {
          const [dateRange, staffIds] = queryKey as [
            { from: string; to: string },
            number[]
          ];

          return (
            [fromLastMonday, fromToday].includes(dateRange.from) &&
            !!appointment.personnel &&
            staffIds.includes(appointment.personnel?.id)
          );
        }

        return false;
      },
    });
  }

  return invalidateAppointmentQueries;
}

export function useAddAppointment({ onSuccess }: { onSuccess?: () => void }) {
  const invalidateAppointmentQueries = useInvalidateAppointmentQueries();

  return useMutation({
    mutationFn: ({ dto }: { dto: AddAppointmentDto }) => addAppointment(dto),
    onSuccess: (appointment) => {
      onSuccess?.();

      invalidateAppointmentQueries(appointment);
    },
  });
}

export function useUpdateAppointment() {
  const invalidateAppointmentQueries = useInvalidateAppointmentQueries();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateAppointmentDto }) =>
      updateAppointment(id, dto),
    onSuccess: (appointment) => {
      invalidateAppointmentQueries(appointment);
    },
  });
}

export function useCancelAppointment() {
  const invalidateAppointmentQueries = useInvalidateAppointmentQueries();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => cancelAppointment(id),
    onSuccess: (appointment) => {
      invalidateAppointmentQueries(appointment);
    },
  });
}

type UseConfirmAppointmentParams = { onSuccess?: () => void };
export function useConfirmAppointment({
  onSuccess,
}: UseConfirmAppointmentParams) {
  const invalidateAppointmentQueries = useInvalidateAppointmentQueries();

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => confirmAppointment(id),
    onSuccess: (appointment) => {
      onSuccess?.();
      invalidateAppointmentQueries(appointment);
    },
  });

  function handleConfirmAppointment(appointment: Appointment) {
    mutation.mutate({ id: appointment.id });
  }

  return { ...mutation, handleConfirmAppointment };
}
