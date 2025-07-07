import { Box, Skeleton } from '@mui/material';
import dayjs from 'dayjs';

import { TimePicker } from './TimePicker';

export function TimePickerSkeleton() {
  return (
    <Box sx={{ position: 'relative' }}>
      <TimePicker defaultValue={dayjs('00:00', 'HH:mm')} hidden />
      <Skeleton
        variant="rounded"
        height={40}
        width={'100%'}
        sx={{ position: 'absolute', top: 0 }}
      />
    </Box>
  );
}
