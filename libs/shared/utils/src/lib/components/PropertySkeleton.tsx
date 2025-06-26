import { Box, Skeleton, TextField, Typography } from '@mui/material';

export function PropertySkeleton({ name }: { name: string }) {
  return (
    <>
      <Typography>{name}</Typography>
      <Box position="relative">
        <TextField
          size="small"
          sx={{
            visibility: 'hidden',
          }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={40}
          sx={{ position: 'absolute', top: 0 }}
        />
      </Box>
    </>
  );
}
