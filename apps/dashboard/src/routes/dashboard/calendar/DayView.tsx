import { Box } from '@mui/material';

import CalendarAppointment from './components/calendar-appointment/CalendarAppointment';
import { Appointment, CalendarDay } from '@studiobooker/utils';

type Props = {
  day: CalendarDay;
  onClickAppointment: (appointment: Appointment) => void;
};

export default function DayView({ day, onClickAppointment }: Props) {
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
            <CalendarAppointment
              key={appt.id}
              appointment={appt}
              staff={s}
              onClick={() => onClickAppointment(appt)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
