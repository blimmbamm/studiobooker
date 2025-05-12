import { Staff } from '../../../types/staff';
import { TextField, Typography } from '@mui/material';
import { useStaffProperty } from './useStaffProperty';

export default function StaffNotes(props: { staff: Staff }) {
  const { value, handleChange } = useStaffProperty({
    staff: props.staff,
    property: 'notes',
  });

  return (
    <>
      <Typography>Notes</Typography>
      <TextField
        variant="outlined"
        multiline
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </>
  );
}
