import { CircularProgress } from '@mui/material';
import { useAllStaff } from '../../../hooks/staff.queries';
import StaffDetailFallback from './StaffDetailFallback';

export default function StaffDetailStart() {
  const allStaffQuery = useAllStaff();

  const hasSomeStaff = Boolean(allStaffQuery.staff?.length);

  return (
    <>
      {allStaffQuery.isLoading && (
        <CircularProgress sx={{ margin: 'auto', marginTop: '20dvh' }} />
      )}
      {hasSomeStaff && (
        <StaffDetailFallback message="Select staff to view detail..." />
      )}
      {!hasSomeStaff && (
        <StaffDetailFallback message="You don't have staff yet. Start adding some!" />
      )}
    </>
  );
}
