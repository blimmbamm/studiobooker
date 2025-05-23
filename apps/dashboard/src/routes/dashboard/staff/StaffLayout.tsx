import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffList from './components/navigation/StaffList';

export default function StaffLayout() {
  return (
    <Box display="flex" flexDirection="row" height={'100%'}>
      {/* <Box display="flex" flexDirection="column"> */}
      <StaffList />
      {/* </Box> */}
      <Box display={'flex'} overflow={'auto'} flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
