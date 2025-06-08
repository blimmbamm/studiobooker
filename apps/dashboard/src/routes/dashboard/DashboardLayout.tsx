import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

import { AppBarLayout } from '@studiobooker/utils';
import { useLogout } from '../../hooks/auth/useLogout';

export default function DashboardRoot() {
  const { mutate: logout } = useLogout();

  return (
    <AppBarLayout mainContainerSx={{ overflowY: 'scroll' }}>
      <Button component={NavLink} to={'calendar'} color="inherit">
        Calendar
      </Button>
      <Button component={NavLink} to={'staff'} color="inherit">
        Staff
      </Button>
      <Button component={NavLink} to={'services'} color="inherit">
        Services
      </Button>
      <Button component={NavLink} to={'settings'} color="inherit">
        Settings
      </Button>
      <Button onClick={() => logout()} color="inherit">
        Logout
      </Button>
    </AppBarLayout>
  );
}
