import { Staff } from '../../../../../types/staff';
import { useStaffProperty } from '../../hooks/useStaffProperty';
import StaffProperty from './StaffProperty';

export default function StaffName(props: { staff: Staff }) {
  const { value, hasError, handleChange, checkErrors } = useStaffProperty({
    staff: props.staff,
    property: 'name',
    submitValueIf: (value) => Boolean(value),
  });

  return (
    <StaffProperty
      name="Name"
      value={value}
      onChange={handleChange}
      error={hasError}
      helperText={hasError && 'Must not be empty.'} // this is not correct, other errors can occur
      onBlur={checkErrors}
    />
  );
}
