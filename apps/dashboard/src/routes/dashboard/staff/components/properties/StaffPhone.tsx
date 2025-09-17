import { PropertiesTableProperty, Staff } from '@studiobooker/utils';

import { useStaffProperty } from '../../hooks/useStaffProperty';

type Props = { staff: Staff };

export default function StaffPhone({ staff }: Props) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const { value, handleChange } = useStaffProperty({
    entity: staff,
    property: 'phone',
    parseProperty: (value) => value,
    updateValueIf: isNumberString,
  });

  return (
    <PropertiesTableProperty
      name="Phone"
      value={value}
      onChange={handleChange}
      disabled={staff.activated}
    />
  );
}
