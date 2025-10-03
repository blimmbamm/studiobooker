import { useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import {
  AppBarLayout,
  NavButton,
  ScrollContainerContext,
} from '@studiobooker/utils';

import { useLogout } from '../../hooks/auth/useLogout';

export default function DashboardRoot() {
  const { mutate: logout } = useLogout();

  const scrollContainerRef = useRef<HTMLElement>(null);

  const { pathname, search } = useLocation();

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
      <NavButton
        component={NavLink}
        to={`calendar${pathname.includes('calendar') ? search : ''}`}
      >
        Calendar
      </NavButton>
      <NavButton component={NavLink} to={'staff'}>
        Staff
      </NavButton>
      <NavButton component={NavLink} to={'services'}>
        Services
      </NavButton>
      <NavButton component={NavLink} to={'settings'}>
        Settings
      </NavButton>
      <NavButton onClick={() => logout()}>Logout</NavButton>
    </AppBarLayout>
  );
}
