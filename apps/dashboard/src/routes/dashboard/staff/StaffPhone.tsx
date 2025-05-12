import { TextField, Typography } from '@mui/material';
import { useStaffProperty } from './useStaffProperty';
import { Staff } from '../../../types/staff';

export default function StaffPhone(props: {staff: Staff}) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }
  
  const { value, handleChange, hasError, checkErrors } = useStaffProperty({
    staff: props.staff,
    property: 'phone',
    updateValueIf: isNumberString,
  });



  return (
    <>
      <Typography>Phone</Typography>
      <TextField
        variant="outlined"
        value={value}
        onChange={handleChange}
        onBlur={checkErrors}
        error={hasError}
        helperText={hasError && 'Invalid e-mail. This is not saved.'}
        autoComplete="off"
      />
    </>
  );
}
