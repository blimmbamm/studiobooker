import { Box, SxProps, Typography } from '@mui/material';

import { TableSection } from '@studiobooker/utils';
import StaffWorkingTime from './StaffWorkingTime';
import { StaffStructured } from '../../../../../types/staff';
import StaffWorkingTimeSkeleton from './StaffWorkingTimeSkeleton';
import { WEEKDAYS } from '../../../../../constants/weekdays';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffWorkingHours({ staff, sx }: Props) {
  return (
    <TableSection
      title="Working times"
      columns={3}
      tableSx={{ width: 'fit-content', rowGap: 1 }}
      sx={sx}
    >
      <Box />
      <Typography textAlign="center">From</Typography>
      <Typography textAlign="center">To</Typography>
      {!staff &&
        WEEKDAYS.map((wt) => (
          <StaffWorkingTimeSkeleton key={wt} weekday={wt} />
        ))}
      {staff &&
        staff.workingTimes.map((wt) => (
          <StaffWorkingTime key={wt.id} workingTime={wt} staff={staff} />
        ))}
    </TableSection>
  );
}
