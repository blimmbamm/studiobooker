import { Box } from '@mui/material';
import { CalendarDay } from '../../../types/calendar-day';
import { useStaffColors } from './contexts/StaffColorContext';

type Props = {
  day: CalendarDay;
};

export default function DayView({ day }: Props) {
  const staffColorMap = useStaffColors();

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
          {s.appointments.map((a) => (
            <Box
              key={a.id}
              position="absolute"
              top={a.startNum}
              width={'100%'}
              height={a.duration - 1}
              paddingBlock={'1.5px'}
            >
              <Box
                width={'100%'}
                height={'100%'}
                bgcolor={staffColorMap[s.id]}
                borderRadius={1.5}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
