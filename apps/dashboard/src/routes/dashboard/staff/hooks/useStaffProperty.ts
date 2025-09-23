import { createUseProperty, EditStaffDto, Staff } from '@studiobooker/utils';

import { useEditStaff } from '../../../../hooks/queries/staff.queries';

export const useStaffProperty = createUseProperty<EditStaffDto, Staff>({
  editMutation: (staff) => useEditStaff({ staffId: staff.id }),
});
