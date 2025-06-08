import { Box, CssBaseline, AppBar, Toolbar, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Outlet, NavLink } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Box display={'flex'} flexDirection={'column'} height={'100dvh'}>
      <CssBaseline />
      <AppBar sx={{ zIndex: 1 }} position="static">
        <Toolbar>
          <Button component={NavLink} to={'login'} color="inherit">
            Login
          </Button>
          <Button component={NavLink} to={'register'} color="inherit">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{
          // overflowY: 'scroll',
          // scrollbarGutter: 'stable', // alternative for modern browsers
          backgroundColor: grey[100],
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
