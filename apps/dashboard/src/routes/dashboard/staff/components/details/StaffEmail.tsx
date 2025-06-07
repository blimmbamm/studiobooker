import { useStaffProperty } from '../../hooks/useStaffProperty';
import { Staff } from '../../../../../types/staff';
import StaffProperty from './StaffProperty';

export default function StaffEmail(props: { staff: Staff }) {
  /**
   * Checks if `value` is valid initial part of an email
   */
  function isValidPartialEmailOrEmpty(value: string) {
    const conditions = [
      /^[A-Za-z0-9][A-Za-z0-9._-]*$/, // local part
      /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?@([A-Za-z0-9-]+(?:\.[A-Za-z]*)?)?$/, // full part
    ];

    return (
      !value ||
      (conditions.some((re) => re.test(value)) && !value.includes('..'))
    );
  }

  /**
   * Checks if value represents valid full email
   */
  function isValidFullEmailOrEmpty(value: string) {
    const validMailRegex =
      /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

    return !value || validMailRegex.test(value);
  }

  const { value, handleChange, showError, checkErrors, helperText } =
    useStaffProperty({
      staff: props.staff,
      property: 'email',
      updateValueIf: isValidPartialEmailOrEmpty,
      submitValueIf: isValidFullEmailOrEmpty,
      validationErrorHelperText: 'Invalid e-mail. This not saved.',
    });

  return (
    <StaffProperty
      name="E-mail"
      value={value}
      onChange={handleChange}
      onBlur={checkErrors}
      error={showError}
      helperText={helperText}
    />
  );
}
