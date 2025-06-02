import { Box, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { TimePicker } from '@studiobooker/utils';

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
        <Box key={index} sx={{ position: 'relative' }}>
          <TimePicker defaultValue={dayjs('00:00', 'HH:mm')} hidden />
          <Skeleton
            variant="rounded"
            height={40}
            width={'100%'}
            sx={{ position: 'absolute', top: 0 }}
          />
        </Box>
      ))}
    </>
  );
}
