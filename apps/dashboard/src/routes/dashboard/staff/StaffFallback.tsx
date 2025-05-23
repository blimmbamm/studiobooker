import { Box, CircularProgress, Typography } from '@mui/material';
import { useAllStaff } from '../../../hooks/staff.queries';

export default function StaffDetailFallback() {
  const allStaffQuery = useAllStaff();

  const hasSomeStaff = Boolean(allStaffQuery.staff?.length);

  return (
    <Box>
      {allStaffQuery.isLoading && <CircularProgress />}
      {hasSomeStaff && <Typography>Select staff to see detail</Typography>}
      {!hasSomeStaff && (
        <Typography>You don't have staff yet. Start adding some.</Typography>
      )}
    </Box>
  );
}
