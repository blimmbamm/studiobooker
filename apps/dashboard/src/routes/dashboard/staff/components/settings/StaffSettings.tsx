import { SxProps } from '@mui/material';

import { SettingsSection } from '@studiobooker/utils';
import RemoveStaff from './RemoveStaff';
import { StaffStructured } from '../../../../../types/staff';

type Props = { staff?: StaffStructured; sx?: SxProps };

export default function StaffSettings({ staff, sx }: Props) {
  return (
    <SettingsSection sx={sx}>
      <RemoveStaff staff={staff} />
    </SettingsSection>
  );
}
