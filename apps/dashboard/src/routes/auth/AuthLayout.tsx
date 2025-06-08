import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { AppBarLayout } from '@studiobooker/utils';

export default function AuthLayout() {
  return (
    <AppBarLayout
      mainContainerSx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Button component={NavLink} to={'login'} color="inherit">
        Login
      </Button>
      <Button component={NavLink} to={'register'} color="inherit">
        Signup
      </Button>
    </AppBarLayout>
  );
}
