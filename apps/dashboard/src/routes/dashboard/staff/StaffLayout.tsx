import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import StaffNavigation from './components/navigation/StaffNavigation';


export default function StaffLayout() {
  return (
    <Box
      maxWidth={1000}
      margin={'auto'}
      sx={{ backgroundColor: 'white' }}
      minHeight={'100%'}
    >
      <StaffNavigation />
      <Box
        marginLeft={'250px'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
