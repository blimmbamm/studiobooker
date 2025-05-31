import { Box, Typography } from '@mui/material';

import StaffWorkingTime from './StaffWorkingTime';
import { StaffStructured } from '../../../../../types/staff';
import Section from '../../../../../../../../libs/shared/utils/src/lib/components/Section';

export default function StaffWorkingHours(props: { staff: StaffStructured }) {
  const {
    staff: { workingTimes, id },
  } = props;

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
    >
      <Box />
      <Typography textAlign='center'>From</Typography>
      <Typography textAlign='center'>To</Typography>
      {workingTimes.map((wt) => (
        <StaffWorkingTime key={wt.id} workingTime={wt} staffId={id} />
      ))}
    </Section>
  );
}
