import { SxProps } from '@mui/material';

import { SettingsSection, StaffStructured } from '@studiobooker/utils';

import RemoveStaff from './RemoveStaff';

type Props = { staff?: StaffStructured; sx?: SxProps };

export default function StaffSettings({ staff, sx }: Props) {
  return (
    <SettingsSection sx={sx}>
      <RemoveStaff staff={staff} />
    </SettingsSection>
  );
}
