import { useMutation } from '@studiobooker/utils';
import { AddAppointmentDto } from '../types/appointment';
import { addAppointment } from '../api/appointment.api';
import { QueryKey, useQueryClient } from '@tanstack/react-query';

export function useAddAppointment({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dto }: { dto: AddAppointmentDto }) => addAppointment(dto),
    onSuccess: (_, { dto }) => {
      onSuccess?.();

      /** Invalidate fitting calendar day queries:
       * - dto.start must be included in timeRange
       * - dto.staffId must be included in the staffIds
       */
      const fromLastMonday = dto.start
        .day(dto.start.day() === 0 ? -6 : 1)
        .format('YYYYMMDD');
      const fromToday = dto.start.format('YYYYMMDD');

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
              staffIds.includes(dto.staffId)
            );
          }

          return false;
        },
      });
    },
  });
}
