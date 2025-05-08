import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useAddStaff } from '../../../hooks/staff.queries';

export default function AddStaff() {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const addStaffMutation = useAddStaff({ onSuccess: () => handleClose() });

  function handleClose() {
    addStaffMutation.reset();
    setOpen(false);
  }

  function handleAddStaff() {
    // Optimize: check if valid = at least one character before sending request
    addStaffMutation.mutate({ name: inputRef.current?.value || '' });
  }

  function handleChange() {
    if (addStaffMutation.error) {
      addStaffMutation.reset();
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{ transform: 'translateY(50%)' }}
      >
        Add staff
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            inputRef={inputRef}
            placeholder="Name"
            variant="outlined"
            helperText={
              addStaffMutation.error && addStaffMutation.error.message
            }
            onChange={handleChange}
            error={addStaffMutation.isError}
          />
          {addStaffMutation.isPending && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddStaff}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
