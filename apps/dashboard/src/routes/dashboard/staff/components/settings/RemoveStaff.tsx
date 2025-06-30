import { SettingsItem } from '@studiobooker/utils';
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
      description="Staff is permanently removed."
      buttonLabel="Remove"
      onAction={() => mutate({ id: staff.id })}
      confirmActionDialogTitle='Remove staff?'
      confirmActionDialogMessage={`This will remove this staff member permanently. 
        This action cannot be undone. Are you sure?`}
    />
  );
}
