import { useParams } from 'react-router-dom';
import { useStaff } from '../../../hooks/staff.queries';
import { Divider } from '@mui/material';
import StaffDetails from './components/details/StaffDetails';
import StaffServices from './components/services/StaffServices';
import StaffWorkingTimes from './components/working-times/StaffWorkingTimes';
import StaffDetailFallback from './StaffDetailFallback';

export default function StaffDetail() {
  // This logic could go into a separate hook:
  const { id } = useParams<{ id: string }>();
  const staffId = Boolean(Number(id)) ? Number(id) : undefined;

  const { staff, isNotFoundError, isOtherError } = useStaff(staffId);

  if (!staffId || isNotFoundError) {
    return (
      <StaffDetailFallback message="The requested staff does not exist." />
    );
  }

  if (isOtherError) {
    return <StaffDetailFallback message="Something went wrong..." />;
  }

  return (
    <>
      <StaffDetails staff={staff} />
      <Divider />
      <StaffWorkingTimes staff={staff} />
      <Divider />
      <StaffServices sx={{ marginBottom: 5 }} staff={staff} />
    </>
  );
}
