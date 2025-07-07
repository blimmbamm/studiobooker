import { PropertiesTableProperty } from '@studiobooker/utils';
import { useStaffProperty } from '../../hooks/useStaffProperty';
import { Staff } from '../../../../../types/staff';

export default function StaffPhone(props: { staff: Staff }) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const { value, handleChange } = useStaffProperty({
    entity: props.staff,
    property: 'phone',
    parseProperty: (value) => value,
    updateValueIf: isNumberString,
  });

  return (
    <PropertiesTableProperty
      name="Phone"
      value={value}
      onChange={handleChange}
    />
  );
}
