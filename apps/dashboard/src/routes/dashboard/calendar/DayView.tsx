import { Box } from '@mui/material';

import { CalendarDay } from '../../../types/calendar-day';
import CalendarAppointment from './components/calendar-appointment/CalendarAppointment';

type Props = {
  day: CalendarDay;
};

export default function DayView({ day }: Props) {
  return (
    <Box
      height={1438}
      flex={1}
      sx={{ backgroundColor: 'transparent' }}
      display="flex"
      gap={0.5}
    >
      {day.staffWithAppointments.map((s) => (
        <Box key={s.id} flex={1} position="relative">
          {s.appointments.map((appt) => (
            <CalendarAppointment key={appt.id} appointment={appt} staff={s} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
