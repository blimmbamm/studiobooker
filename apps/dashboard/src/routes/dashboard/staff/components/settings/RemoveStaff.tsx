import { SettingsItem, RemoveButton } from '@studiobooker/utils';
import { useRemoveStaff } from '../../../../../hooks/staff.queries';
import { useNavigate } from 'react-router-dom';
import { Staff } from '../../../../../types/staff';

type Props = {
  staff?: Staff;
};

export default function RemoveStaff({ staff }: Props) {
  const navigate = useNavigate();

  const { mutate } = useRemoveStaff({ onSuccess: () => navigate('..') });

  function handleRemoveStaff() {
    if (staff) {
      mutate({ id: staff.id });
    }
  }

  return (
    <SettingsItem
      title="Remove staff"
      description="Staff is removed permanently."
    >
      <RemoveButton
        onConfirm={handleRemoveStaff}
        dialogTitle="Remove staff?"
        dialogMessage={`This will remove the staff member permanently. 
          This action cannot be undone. Are you sure?`}
        buttonProps={{ disabled: !Boolean(staff) }}
      />
    </SettingsItem>
  );
}
