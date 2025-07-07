import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function SettingsLayout() {
  return (
    <Box
      maxWidth={1000}
      margin={'auto'}
      sx={{ backgroundColor: 'white' }}
      minHeight={'100%'}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Outlet />
    </Box>
  );
}
