import { useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

import { AppBarLayout, ScrollContainerContext } from '@studiobooker/utils';

import { useLogout } from '../../hooks/auth/useLogout';

export default function DashboardRoot() {
  const { mutate: logout } = useLogout();

  const scrollContainerRef = useRef<HTMLElement>(null);

  return (
    <AppBarLayout
      mainContent={<Outlet />}
      mainContainerSx={{ overflowY: 'scroll' }}
      mainContentRef={scrollContainerRef}
      mainContentWrapper={({ children }) => (
        <ScrollContainerContext.Provider value={scrollContainerRef}>
          {children}
        </ScrollContainerContext.Provider>
      )}
    >
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
