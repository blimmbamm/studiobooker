import { Box, SxProps, Typography } from '@mui/material';

import StaffWorkingTime from './StaffWorkingTime';
import { StaffStructured } from '../../../../../types/staff';
import Section from '../../../../../../../../libs/shared/utils/src/lib/components/Section';

type Props = {
  staff: StaffStructured;
  sx?: SxProps;
};

export default function StaffWorkingHours({ staff, sx }: Props) {
  const { workingTimes, id } = staff;

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
      {workingTimes.map((wt) => (
        <StaffWorkingTime key={wt.id} workingTime={wt} staffId={id} />
      ))}
    </Section>
  );
}
