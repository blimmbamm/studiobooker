import { Box, Button } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

import { AppBarLayout } from '@studiobooker/utils';
import DemoLogin from './login/DemoLogin';

export default function AuthLayout() {
  return (
    <AppBarLayout
      mainContent={<Outlet />}
      mainContainerSx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Button component={NavLink} to={'login'} color="inherit">
        Login
      </Button>
      <Button component={NavLink} to={'register'} color="inherit">
        Signup
      </Button>
      <Box flex={1} />
      <DemoLogin />
    </AppBarLayout>
  );
}
