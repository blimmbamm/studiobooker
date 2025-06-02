import { Box, Skeleton, TextField, Typography } from '@mui/material';

type Props = { name: string };

export default function StaffPropertySkeleton({ name }: Props) {
  return (
    <>
      <Typography>{name}</Typography>
      <Box position="relative">
        <TextField
          size="small"
          sx={{
            // height: 0,
            // position: 'fixed',
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
      {/* <TextField
        variant="outlined"
        size="small"
        autoComplete="off"
        {...textFieldProps}
      /> */}
    </>
  );
}
