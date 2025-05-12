import { TextField, Typography } from '@mui/material';
import { Staff } from '../../../types/staff';
import { useStaffProperty } from './useStaffProperty';

export default function StaffName(props: { staff: Staff }) {
  const { value, hasError, handleChange, checkErrors } = useStaffProperty({
    staff: props.staff,
    property: 'name',
    submitValueIf: (value) => Boolean(value),
  });

  return (
    <>
      <Typography>Name</Typography>
      <TextField
        variant="outlined"
        value={value}
        onChange={handleChange}
        error={hasError}
        helperText={hasError && 'Must not be empty.'}
        onBlur={checkErrors}
        autoComplete="off"
      />
    </>
  );
}
