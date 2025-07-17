import { Box } from '@mui/material';
import CalendarStaffSelection from './CalendarStaffSelection';
import Calendar from './Calendar';
import { StaffColorProvider } from './contexts/StaffColorContext';

export default function CalendarLayout() {
  return (
    <StaffColorProvider>
      <CalendarStaffSelection boxProps={{ width: 200 }} />
      <Box
        width={'calc(100% - 200px)'}
        marginLeft={'200px'}
        position="relative"
      >
        <Calendar />
      </Box>
    </StaffColorProvider>
  );
}
