import { NavLink, Outlet } from 'react-router-dom';

import { AppBarLayout, NavButton } from '@studiobooker/utils';
import DemoLogin from './login/DemoLogin';

export default function AuthLayout() {
  return (
    <AppBarLayout
      mainContent={<Outlet />}
      mainContainerSx={{ display: 'flex', flexDirection: 'column' }}
    >
      <NavButton component={NavLink} to={'login'}>
        Login
      </NavButton>
      <NavButton component={NavLink} to={'register'}>
        Signup
      </NavButton>
      <DemoLogin />
    </AppBarLayout>
  );
}
