import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffList from './components/navigation/StaffList';

export default function StaffLayout() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      height={'100%'}
      maxWidth={800}
      margin={'auto'}
    >
      <StaffList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        paddingTop={2}
        paddingBottom={4}
        overflow={'auto'}
        gap={2}
        flex={1}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
