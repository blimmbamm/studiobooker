import { SxProps } from '@mui/material';

import { TableSection } from '@studiobooker/utils';
import RemoveStaff from './RemoveStaff';
import ManageStaffActivation from './ManageStaffActivation';
import { StaffStructured } from '../../../../../types/staff';

type Props = { staff?: StaffStructured; sx: SxProps };

export default function StaffSettings({ staff, sx }: Props) {
  return (
    <TableSection title="Settings" columns={2} sx={sx}>
      {!staff && (
        // Actually, all the text inside the settings items could be displayed even if staff is not available yet
        // Maybe only buttons should be disabled/skeletons
        <p>Skeleton...</p>
      )}
      {staff && (
        <>
          <ManageStaffActivation />
          <RemoveStaff staff={staff} />
        </>
      )}
    </TableSection>
  );
}
