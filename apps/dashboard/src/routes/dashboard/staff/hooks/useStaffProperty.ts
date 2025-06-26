import { EditStaffDto, Staff } from '../../../../types/staff';
import { useEditStaff } from '../../../../hooks/staff.queries';
import { createUseProperty } from '../../../../hooks/useProperty';

export const useStaffProperty = createUseProperty<EditStaffDto, Staff>({
  editMutation: (staff) => useEditStaff({ staffId: staff.id }),
});
