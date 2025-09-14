import { Box, Typography } from '@mui/material';

type Props = { message: string; description?: string };

export function CenteredMessage({ message, description }: Props) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      textAlign={'center'}
      height={'100%'}
    >
      <Box flexGrow={1} />
      <Typography variant="h5">{message}</Typography>
      {description && <Typography>{description}</Typography>}
      <Box flexGrow={2} />
    </Box>
  );
}
