import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLogout } from '../../hooks/auth/useLogout';

export default function DashboardRoot() {
  const { mutate: logout } = useLogout();

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100dvh'}>
      <CssBaseline />
      <AppBar sx={{ zIndex: 1 }} position="static">
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
          <Button onClick={() => logout()} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        flex={1}
        sx={{
          overflowY: 'scroll',
          // scrollbarGutter: 'stable', // alternative for modern browsers
          backgroundColor: grey[100],
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
