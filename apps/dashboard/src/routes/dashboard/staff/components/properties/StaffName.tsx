import { PropertiesTableProperty, Staff } from '@studiobooker/utils';

import { useStaffProperty } from '../../hooks/useStaffProperty';

type Props = { staff: Staff };

export default function StaffName({ staff }: Props) {
  const { value, showError, handleChange, checkErrors, helperText } =
    useStaffProperty({
      entity: staff,
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
      disabled={staff.activated}
      // tooltip={staff.activated && 'Can only be edited with inactive status.'}
    />
  );
}
