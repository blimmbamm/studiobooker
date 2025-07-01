import { SettingsItem, RemoveButton } from '@studiobooker/utils';
import { useRemoveStaff } from '../../../../../hooks/staff.queries';
import { useNavigate } from 'react-router-dom';
import { Staff } from '../../../../../types/staff';

type Props = {
  staff: Staff;
};

export default function RemoveStaff({ staff }: Props) {
  const navigate = useNavigate();

  const { mutate } = useRemoveStaff({ onSuccess: () => navigate('..') });

  return (
    <SettingsItem
      title="Remove staff"
      description="Staff is removed permanently."
    >
      <RemoveButton
        onConfirm={() => mutate({ id: staff.id })}
        dialogTitle="Remove staff?"
        dialogMessage={`This will remove the staff member permanently. 
          This action cannot be undone. Are you sure?`}
      />
    </SettingsItem>
  );
}
