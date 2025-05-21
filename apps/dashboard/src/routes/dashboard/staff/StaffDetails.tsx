import { Staff } from '../../../types/staff';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

import StaffName from './StaffName';
import StaffNotes from './StaffNotes';
import StaffEmail from './StaffEmail';
import StaffPhone from './StaffPhone';

export default function StaffDetails(props: { staff: Staff }) {
  const { staff } = props;

  return (
    <Card>
      <CardHeader title="Details" />
      <CardContent>
        {/* Should I add grid display to CardContent? Would this be good or bad? */}
        <Box display={'grid'} gridTemplateColumns="auto auto">
          <StaffName staff={staff} />
          <StaffEmail staff={staff} />
          <StaffPhone staff={staff}/>
          <StaffNotes staff={staff} />
        </Box>
      </CardContent>
    </Card>
  );
}
