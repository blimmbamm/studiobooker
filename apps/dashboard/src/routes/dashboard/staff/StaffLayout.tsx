import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffList from './components/navigation/StaffList';

export default function StaffLayout() {
  return (
    <Box maxWidth={1000} margin={'auto'} sx={{ backgroundColor: 'white' }}>
      <StaffList />
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
