import { Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MouseEvent, useState } from 'react';
import AddAppointmentForServiceDialog from './AddAppointmentForServiceDialog';

export default function AddAppointment() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  function handleCloseMenu() {
    setMenuAnchor(null);
  }

  function handleOpenDialog() {
    handleCloseMenu();
    setDialogOpen(true);
  }

  // TODO: put mutation logic from summary component here and then pass callback to the dialog component.

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<AddIcon />}
        onClick={(e: MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget)}
      >
        Add
      </Button>
      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenDialog}>Service appointment</MenuItem>
        <MenuItem disabled>Other appointment</MenuItem>
      </Menu>
      <AddAppointmentForServiceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      {/* <AddCustomAppointmentDialog /> */}
    </>
  );
}
