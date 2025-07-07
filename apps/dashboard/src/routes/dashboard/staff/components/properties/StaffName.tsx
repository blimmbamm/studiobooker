import { PropertiesTableProperty } from '@studiobooker/utils';
import { Staff } from '../../../../../types/staff';
import { useStaffProperty } from '../../hooks/useStaffProperty';

export default function StaffName(props: { staff: Staff }) {
  const { value, showError, handleChange, checkErrors, helperText } =
    useStaffProperty({
      entity: props.staff,
      property: 'name',
      parseProperty: (value) => value,
      submitValueIf: (value) => Boolean(value),
      validationErrorHelperText: 'Must not be empty.',
    });

  return (
    <PropertiesTableProperty
      name="Name"
      value={value}
      onChange={handleChange}
      error={showError}
      helperText={helperText}
      onBlur={checkErrors}
    />
  );
}
