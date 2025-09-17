import { EditStaffDto, Staff } from '@studiobooker/utils';

import { useEditStaff } from '../../../../hooks/staff.queries';
import { createUseProperty } from '../../../../hooks/useProperty';

export const useStaffProperty = createUseProperty<EditStaffDto, Staff>({
  editMutation: (staff) => useEditStaff({ staffId: staff.id }),
});
