import { useParams } from 'react-router-dom';
import { useStaff } from '../../../hooks/staff.queries';
import { Box, CircularProgress } from '@mui/material';
import StaffDetails from './StaffDetails';
import StaffServices from './StaffServices';

export default function StaffDetailPage() {
  const { id: staffId } = useParams<{ id: string }>();

  // if (!staffId) return <Navigate to={'..'} />;
  if (!staffId) return <CircularProgress />;

  const { data: staff } = useStaff(+staffId);

  return (
    <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
      <Box width={400}>
        {/* Maybe use skeletons while staff is undefined; 
            If using a loading spinner, it would be better to pass 
            a potentially undefined staff prop to StaffDetails, s.t. 
            loading spinner can be displayed in there, e.g. within the card */}
        {staff && <StaffDetails staff={staff} />}
        {/* <StaffWorkingHours /> */}
      </Box>
      <Box>{staff && <StaffServices staff={staff} />}</Box>
    </Box>
  );
}
