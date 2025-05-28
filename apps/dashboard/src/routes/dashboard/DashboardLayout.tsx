import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';

export default function DashboardRoot() {
  /**
   * - static appbar
   * - main scrollable and centered container with max-width 1000px (or so)
   * - scrollable content has left-margin of 250px (sidenav width)
   * - side nav is fixed with top 0 and left as max(100dvw-1000px, 0)/2;
   *   because of top 0, there must be empty toolbar inserted at top of sidenav
   *
   * Other approach with relative/absolute position:
   * - static appbar
   * - scrollable container s.t. scrollbar is at right viewport end
   * - inside scrollable container: centered container with max-width 1000px and relative position
   * - side nav with absolute position, bottom 0 (top/left 0 needed?6+)
   * - main content with left-margin of sidenav width, say 250px
   *
   */

  const { logout } = useAuth();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      height={'100dvh'}
    >
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
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        flex={1}
        overflow={'auto'}
        // height={'100%'}
        // sx={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
