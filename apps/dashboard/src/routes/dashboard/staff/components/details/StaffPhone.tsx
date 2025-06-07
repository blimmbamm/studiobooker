import { useStaffProperty } from '../../hooks/useStaffProperty';
import { Staff } from '../../../../../types/staff';
import StaffProperty from './StaffProperty';

export default function StaffPhone(props: { staff: Staff }) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const { value, handleChange } = useStaffProperty({
    staff: props.staff,
    property: 'phone',
    updateValueIf: isNumberString,
  });

  return <StaffProperty name="Phone" value={value} onChange={handleChange} />;
}
