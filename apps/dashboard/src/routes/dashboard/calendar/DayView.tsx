import { Box, Typography } from '@mui/material';
import { CalendarDay } from './Calendar';

type Props = {
  day: CalendarDay;
  // width: number;
  // nStaff: number;
  // firstDay: boolean;
  // lastDay: boolean;
};

export default function DayView({
  day,
}: // width,
// nStaff,
// firstDay,
// lastDay,
Props) {
  // const firstAppointmentRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   firstAppointmentRef.current?.scrollIntoView({
  //     behavior: 'instant',
  //     block: 'start',
  //   });
  // });

  return (
    <Box
      height={1438}
      flex={1}
      sx={{ backgroundColor: 'transparent' }}
      display="flex"
      gap={0.5}
    >
      {day.staff.map((s) => (
        <Box key={s.id} flex={1} position="relative">
          {s.appointments.map((a) => (
            <Box
              key={a.id}
              position="absolute"
              top={a.startNum}
              width={'100%'}
              height={a.endNum - a.startNum - 1}
              paddingBlock={'1.5px'}
            >
              <Box
                width={'100%'}
                height={'100%'}
                bgcolor={'magenta'}
                borderRadius={1.5}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
