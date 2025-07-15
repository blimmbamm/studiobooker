import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Dayjs } from 'dayjs';

import { DUMMY_APPOINTMENTS } from '../../../constants/dummy-appointments';
import AxisLabels from './components/AxisLabels';
import GridLines from './components/GridLines';
import CalendarHeader from './components/CalendarHeader';
import CalendarColumnHeader from './components/CalendarColumnHeader';
import DayView from './DayView';

export type Appointment = {
  id: number;
  start: Dayjs;
  end: Dayjs;
  startNum: number;
  endNum: number;
  // staff: { id: number };
  staffIndex: number;
};

type StaffWithAppointments = {
  id: number;
  appointments: Appointment[];
};

export type CalendarDay = {
  date: Dayjs;
  staff: StaffWithAppointments[];
};

export default function Calendar() {
  // const {days} = useCalendarData() // this could use useViewMode etc. itself

  const calendarDays = DUMMY_APPOINTMENTS;
  // const calendarDays = DUMMY_APPOINTMENTS[0];

  return (
    <>
      <CalendarHeader height={56} />
      <CalendarColumnHeader days={calendarDays} top={56} />
      <Box
        display="flex"
        gap={1}
        width="100%"
        paddingLeft={8} // increase padding to have space for legend
        paddingRight={8}
        position="relative"
        marginBottom={5}
        borderBottom={1}
        borderColor={(theme) => theme.palette.divider}
        bgcolor={grey[100]}
      >
        {/* Grid lines and axis labels: */}
        <GridLines nCols={calendarDays.length} gridImageHeight="60px" />
        <AxisLabels boxProps={{ left: 0 }} typographyProps={{ right: 4 }} />
        <AxisLabels boxProps={{ right: 0 }} typographyProps={{ left: 4 }} />

        {/* Actual calendar/appointment data: */}
        {calendarDays.map((day) => (
          <DayView key={day.date.toString()} day={day} />
        ))}

        {/* Some invisible element/appointment could be added here 
            with  current time as offset, that could be scrolled into view */}
      </Box>
    </>
  );
}

// function ExampleAppointment() {
//   return (
//     <Box
//       position="absolute"
//       width={200}
//       height={180 - 1} // duration = minutes - 1?!
//       sx={{
//         backgroundImage: 'linear-gradient(to bottom, gray 1px, lightgreen 1px)',
//         backgroundSize: '100% 30px',
//         backgroundPosition: '0px -1px',
//       }}
//       top={60 + 60}
//       padding={'4px'}
//     >
//       <Box
//         width={'100%'}
//         height={'100%'}
//         bgcolor={'magenta'}
//         borderRadius={2}
//       />
//     </Box>
//   );
// }
