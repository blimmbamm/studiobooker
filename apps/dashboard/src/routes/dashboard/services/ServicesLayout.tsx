import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import ServicesNavigation from './components/ServicesNavigation';

export default function ServicesLayout() {
  return (
    <Box
      maxWidth={1000}
      margin={'auto'}
      sx={{ backgroundColor: 'white' }}
      minHeight={'100%'}
    >
      <ServicesNavigation />
      <Box
        marginLeft={'500px'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
