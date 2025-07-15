import { Box } from '@mui/material';
import CalendarStaffSelection from './CalendarStaffSelection';
import Calendar from './Calendar';

export default function CalendarLayout() {
  return (
    <>
      <CalendarStaffSelection boxProps={{ width: 200 }} />
      <Box width={'calc(100% - 200px)'} marginLeft={'200px'}>
        <Calendar />
      </Box>
    </>
  );
}
