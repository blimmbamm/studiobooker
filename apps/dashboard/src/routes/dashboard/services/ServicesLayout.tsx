import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { CenteredLayoutBox } from '@studiobooker/utils';

import ServicesNavigation from './components/navigation/ServicesNavigation';

export default function ServicesLayout() {
  return (
    <CenteredLayoutBox>
      <ServicesNavigation />
      <Box
        marginLeft={'500px'}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Outlet />
      </Box>
    </CenteredLayoutBox>
  );
}
