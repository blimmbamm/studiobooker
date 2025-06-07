import { Staff } from '../../../../../types/staff';
import { useStaffProperty } from '../../hooks/useStaffProperty';
import StaffProperty from './StaffProperty';

export default function StaffName(props: { staff: Staff }) {
  const { value, showError, handleChange, checkErrors, helperText } =
    useStaffProperty({
      staff: props.staff,
      property: 'name',
      submitValueIf: (value) => Boolean(value),
      validationErrorHelperText: 'Must not be empty.',
    });

  return (
    <StaffProperty
      name="Name"
      value={value}
      onChange={handleChange}
      error={showError}
      helperText={helperText}
      onBlur={checkErrors}
    />
  );
}
