import { Box, SxProps, Typography } from '@mui/material';

import { TableSection, StaffStructured, WEEKDAYS } from '@studiobooker/utils';

import StaffWorkingTime from './StaffWorkingTime';
import StaffWorkingTimeSkeleton from './StaffWorkingTimeSkeleton';
import { useStaffActivationValidation } from '../../../../../contexts/StaffActivationValidationContext';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffWorkingHours({ staff, sx }: Props) {
  const { errorMessage } = useStaffActivationValidation();

  return (
    <TableSection
      title="Working times"
      columns={3}
      sectionError={errorMessage('working-times')}
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
