import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffList from './StaffList';

export default function StaffLayout() {
  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column">
        <StaffList />
      </Box>
      <Outlet />
    </Box>
  );
}
