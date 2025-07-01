import { Box, Skeleton } from '@mui/material';

export function SettingSkeleton() {
  return (
    <Box>
      <Skeleton width={'30%'} height={40} />
      <Skeleton width={'100%'} variant="text" />
      <Skeleton width={'80%'} variant="text" />
    </Box>
  );
}
