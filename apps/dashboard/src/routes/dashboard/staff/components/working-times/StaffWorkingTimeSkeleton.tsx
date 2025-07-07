import { Box, Skeleton, Typography } from '@mui/material';

import { TimePickerSkeleton } from '@studiobooker/utils';

type Props = { weekday: string };

export default function StaffWorkingTimeSkeleton({ weekday }: Props) {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box padding={1}>
          <Skeleton variant="rounded" width={24} height={24} />
        </Box>
        <Typography paddingLeft={1}>{weekday}</Typography>
      </Box>
      {[1, 2].map((index) => (
        <TimePickerSkeleton key={index} />
      ))}
    </>
  );
}
