import { FormControlLabel, Switch } from '@mui/material';
import { SettingsItem } from '@studiobooker/utils';
import { Staff } from '../../../../../types/staff';
import { useEditStaff } from '../../../../../hooks/staff.queries';

type Props = { staff: Staff };

export default function ManageStaffActivation({ staff }: Props) {
  const { mutate } = useEditStaff({
    staffId: staff.id,
    withOptimisticUpdating: true,
  });

  return (
    <SettingsItem
      title="Staff activation"
      description={`Set staff member to active or inactive. In inactive mode, this staff cannot be booked for services by customers.
        This is helpful, if you are editing the staff and changes should not be visible to customers immediately.
      `}
    >
      <FormControlLabel
        checked={staff.activated}
        onChange={() => mutate({ input: { activated: !staff.activated } })}
        control={<Switch color="primary" />}
        label={staff.activated ? 'Active' : 'Inactive'}
        labelPlacement="top"
      />
    </SettingsItem>
  );
}
