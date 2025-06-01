import { useParams } from 'react-router-dom';
import { useStaff } from '../../../hooks/staff.queries';
import { CircularProgress, Divider } from '@mui/material';
import StaffDetails from './components/details/StaffDetails';
import StaffServices from './components/services/StaffServices';
import StaffWorkingTimes from './components/working-times/StaffWorkingTimes';

export default function StaffDetailPage() {
  const { id: staffId } = useParams<{ id: string }>();

  // if (!staffId) return <Navigate to={'..'} />;
  if (!staffId) return <CircularProgress />;

  const { data: staff } = useStaff(+staffId);

  {
    /* Maybe use skeletons while staff is undefined; 
            If using a loading spinner, it would be better to pass 
            a potentially undefined staff prop to StaffDetails, s.t. 
            loading spinner can be displayed in there, e.g. within the card */
  }

  return (
    <>
      {staff && <StaffDetails staff={staff} />}
      <Divider />
      {staff && <StaffWorkingTimes staff={staff} />}
      <Divider />
      {staff && <StaffServices sx={{ marginBottom: 5 }} staff={staff} />}
    </>
  );
}
