import {
  isValidFullEmailOrEmpty,
  isValidPartialEmailOrEmpty,
  PropertiesTableProperty,
} from '@studiobooker/utils';
import { useStaffProperty } from '../../hooks/useStaffProperty';
import { Staff } from '../../../../../types/staff';

export default function StaffEmail(props: { staff: Staff }) {
  const { value, handleChange, showError, checkErrors, helperText } =
    useStaffProperty({
      entity: props.staff,
      property: 'email',
      parseProperty: (value) => value,
      updateValueIf: isValidPartialEmailOrEmpty,
      submitValueIf: isValidFullEmailOrEmpty,
      validationErrorHelperText: 'Invalid e-mail. This not saved.',
    });

  return (
    <PropertiesTableProperty
      name="E-mail"
      value={value}
      onChange={handleChange}
      onBlur={checkErrors}
      error={showError}
      helperText={helperText}
    />
  );
}
