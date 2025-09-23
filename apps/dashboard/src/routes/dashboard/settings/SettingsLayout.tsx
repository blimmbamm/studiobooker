import { Outlet } from 'react-router-dom';

import { CenteredLayoutBox } from '@studiobooker/utils';

export default function SettingsLayout() {
  return (
    <CenteredLayoutBox display="flex" flexDirection="column" gap={1}>
      <Outlet />
    </CenteredLayoutBox>
  );
}
