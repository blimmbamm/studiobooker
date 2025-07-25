import { Skeleton } from '@mui/material';

export default function StaffServicesSkeleton() {
  return (
    <>
      <Skeleton
        variant="rounded"
        width={'100%'}
        height={48}
        sx={{ marginBottom: 1 }}
      />
      <Skeleton variant="rounded" width={'75%'} height={48} />
    </>
  );
}
