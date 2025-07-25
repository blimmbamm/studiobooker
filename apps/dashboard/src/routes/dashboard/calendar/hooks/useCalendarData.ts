import { useQuery, useAlert } from '@studiobooker/utils';
import { useCalendarStaffSelection } from './useCalendarStaffSelection';
import { useCalendarTimeRange } from './useCalendarTimeRange';
import {
  getCalendarData,
  getPlaceholderCalendarData,
} from '../../../../api/appointment.api';
import { useEffect } from 'react';

export function useCalendarData() {
  const { timeRange } = useCalendarTimeRange();
  const { staffIds } = useCalendarStaffSelection();

  const { show } = useAlert();

  const { data: calendarDays, ...query } = useQuery({
    queryKey: [timeRange, staffIds],
    queryFn: () =>
      getCalendarData({
        from: timeRange!.from,
        to: timeRange!.to,
        staffIds: staffIds!,
      }),
    enabled: Boolean(timeRange && staffIds && staffIds.length > 0),
    initialData:
      timeRange &&
      getPlaceholderCalendarData({ from: timeRange.from, to: timeRange.to }),
  });

  useEffect(() => {
    if (query.isError) {
      show({ message: 'Something went wrong. :(' });
    }
  }, [query.isError]);

  return {
    ...query,
    calendarDays,
  };
}
