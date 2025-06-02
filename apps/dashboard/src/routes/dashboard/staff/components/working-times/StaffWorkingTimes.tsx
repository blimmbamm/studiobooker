import { Box, SxProps, Typography } from '@mui/material';

import { Section } from '@studiobooker/utils';
import StaffWorkingTime from './StaffWorkingTime';
import { StaffStructured } from '../../../../../types/staff';
import StaffWorkingTimeSkeleton from './StaffWorkingTimeSkeleton';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffWorkingHours({ staff, sx }: Props) {
  const DEFAULT_WORKING_TIMES = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <Section
      title="Working times"
      contentBoxProps={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        width: 'fit-content',
        rowGap: 1,
        columnGap: 3,
      }}
      sx={sx}
    >
      <Box />
      <Typography textAlign="center">From</Typography>
      <Typography textAlign="center">To</Typography>
      {staff &&
        staff.workingTimes.map((wt) => (
          <StaffWorkingTime key={wt.id} workingTime={wt} staffId={staff.id} />
        ))}
      {staff &&
        DEFAULT_WORKING_TIMES.map((wt) => (
          <StaffWorkingTimeSkeleton key={wt} weekday={wt} />
        ))}
    </Section>
  );
}
