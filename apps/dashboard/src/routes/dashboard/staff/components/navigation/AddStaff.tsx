import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useAddStaff } from '../../../../../hooks/staff.queries';

export default function AddStaff() {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const addStaffMutation = useAddStaff({ onSuccess: () => handleClose() });

  function handleClose() {
    addStaffMutation.reset();
    setOpen(false);
  }
  
  function handleChange() {
    if (addStaffMutation.error) {
      addStaffMutation.reset();
    }
  }
  
  function handleAddStaff() {
    // Optimize: check if valid = at least one character before sending request
    addStaffMutation.mutate({ name: inputRef.current?.value || '' });
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        // variant="contained"        
      >
        <PersonAddIcon fontSize='medium'/>
      </IconButton>
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
