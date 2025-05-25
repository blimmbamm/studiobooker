import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';

export default function DashboardRoot() {
  const { logout } = useAuth();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      height={'100dvh'}
      // overflow={'hidden'}
    >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
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
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box flex={1} overflow={'hidden'} >
        <Outlet />
      </Box>
    </Box>
  );
}
