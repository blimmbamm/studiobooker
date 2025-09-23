import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { CenteredLayoutBox } from '@studiobooker/utils';

import StaffNavigation from './components/navigation/StaffNavigation';

export default function StaffLayout() {
  return (
    <CenteredLayoutBox>
      <StaffNavigation />
      <Box
        marginLeft={'250px'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Outlet />
      </Box>
    </CenteredLayoutBox>
  );
}
