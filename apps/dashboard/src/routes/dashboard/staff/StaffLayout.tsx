import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffList from './components/navigation/StaffList';

export default function StaffLayout() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      maxWidth={800}
      margin={'auto'}
      overflow={'visible'}      
    >
      <StaffList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        paddingTop={2}
        paddingBottom={4}
        gap={2}
        flex={1}
        overflow={'hidden'}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
