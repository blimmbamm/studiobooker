import { Box, Typography } from '@mui/material';
import SearchStudios from '../components/SearchStudios';

export default function Index() {
  return (
    <Box display={'flex'} justifyContent={'center'} height={'100%'}>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Box flex={1} />
        <Typography variant="h4">Booking appointments made easy!</Typography>
        <SearchStudios />
        <Box flex={3} />
      </Box>
    </Box>
  );
}
