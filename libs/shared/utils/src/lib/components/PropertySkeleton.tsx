import {
  Box,
  Skeleton,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

export function PropertySkeleton({
  name,
  adornment = '',
}: {
  name: string;
  adornment?: string;
}) {
  return (
    <>
      <Typography>{name}</Typography>
      <Box position="relative">
        <TextField
          size="small"
          sx={{
            visibility: 'hidden',
          }}
          slotProps={
            adornment
              ? {
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {adornment}
                      </InputAdornment>
                    ),
                  },
                }
              : {}
          }
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
