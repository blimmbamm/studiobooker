import { Staff } from '../../../../../types/staff';
import { useStaffProperty } from '../../hooks/useStaffProperty';
import StaffProperty from './StaffProperty';

export default function StaffNotes(props: { staff: Staff }) {
  const { value, handleChange } = useStaffProperty({
    staff: props.staff,
    property: 'notes',
  });

  return (
    <StaffProperty
      name="Notes"
      multiline
      value={value}
      onChange={handleChange}
    />
  );
}
