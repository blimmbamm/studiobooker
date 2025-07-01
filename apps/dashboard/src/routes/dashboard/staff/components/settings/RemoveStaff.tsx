import { SettingsItem, ConfirmDialog } from '@studiobooker/utils';
import { useRemoveStaff } from '../../../../../hooks/staff.queries';
import { useNavigate } from 'react-router-dom';
import { Staff } from '../../../../../types/staff';
import { Button } from '@mui/material';
import { useState } from 'react';

type Props = {
  staff: Staff;
};

export default function RemoveStaff({ staff }: Props) {
  const navigate = useNavigate();

  const { mutate } = useRemoveStaff({ onSuccess: () => navigate('..') });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  return (
    <SettingsItem
      title="Remove staff"
      description="Staff is permanently removed."
    >
      <Button
        variant="outlined"
        onClick={() => setConfirmDialogOpen(true)}
        color="error"
        sx={{ backgroundColor: (theme) => theme.palette.error.light }}
      >
        Remove
      </Button>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Remove staff?"
        message={`This will remove this staff member permanently. 
          This action cannot be undone. Are you sure?`}
        onConfirm={() => mutate({ id: staff.id })}
      />
    </SettingsItem>
  );
}
