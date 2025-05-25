import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import StaffWorkingTime from './StaffWorkingTime';
import { StaffStructured } from '../../../../../types/staff';

export default function StaffWorkingHours(props: { staff: StaffStructured }) {
  const {
    staff: { workingTimes, id },
  } = props;

  return (
    <Card sx={{overflow: 'visible'}}>
      <CardHeader title="Working times" />
      <CardContent>
        <Box display="grid" gridTemplateColumns="repeat(3, auto)">
          <Box />
          <Typography textAlign={'center'}>From</Typography>
          <Typography textAlign={'center'}>To</Typography>
          {workingTimes.map((wt) => (
            <StaffWorkingTime key={wt.id} workingTime={wt} staffId={id} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
