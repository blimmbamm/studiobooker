import { PropertiesTableProperty } from '@studiobooker/utils';
import { Staff } from '../../../../../types/staff';
import { useStaffProperty } from '../../hooks/useStaffProperty';

export default function StaffNotes(props: { staff: Staff }) {
  const { value, handleChange } = useStaffProperty({
    entity: props.staff,
    property: 'notes',
    parseProperty: (value) => value,
  });

  return (
    <PropertiesTableProperty
      name="Notes"
      multiline
      value={value}
      onChange={handleChange}
    />
  );
}
