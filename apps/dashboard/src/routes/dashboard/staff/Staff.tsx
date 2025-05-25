import { useParams } from 'react-router-dom';
import { useStaff } from '../../../hooks/staff.queries';
import { Box, CircularProgress } from '@mui/material';
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
    // <Box
    //   // display={'flex'}
    //   // flexDirection={'column'}
    //   // flexWrap={'wrap'}
    //   // gap={2}
    //   marginTop={2}
    //   marginBottom={4}
    // >
    <>
      {/* <Box marginTop={2} /> */}
      {staff && <StaffDetails staff={staff} />}
      {staff && <StaffWorkingTimes staff={staff} />}
      {staff && <StaffServices staff={staff} />}
    </>
    // </Box>
  );
}
