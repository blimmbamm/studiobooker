import { CircularProgress } from '@mui/material';

import { FallbackMessage } from '@studiobooker/utils';
import { useAllStaff } from '../../../hooks/staff.queries';

export default function StaffDetailStart() {
  const { isLoading, staff, isError } = useAllStaff();

  const hasSomeStaff = Boolean(staff?.length);

  if (isLoading) {
    return <CircularProgress sx={{ margin: 'auto', marginTop: '20dvh' }} />;
  }

  if (isError) {
    return <FallbackMessage message='Something went wrong...'/>
  }

  return (
    <>
      {hasSomeStaff && (
        <FallbackMessage message="Select staff to view detail..." />
      )}
      {!hasSomeStaff && (
        <FallbackMessage message="You don't have any staff yet. Start adding some!" />
      )}
    </>
  );
}
