import { PropertiesTableProperty, Staff } from '@studiobooker/utils';

import { useStaffProperty } from '../../hooks/useStaffProperty';

type Props = { staff: Staff };

export default function StaffNotes({ staff }: Props) {
  const { value, handleChange } = useStaffProperty({
    entity: staff,
    property: 'notes',
    parseProperty: (value) => value,
  });

  return (
    <PropertiesTableProperty
      name="Notes"
      multiline
      value={value}
      onChange={handleChange}
      disabled={staff.activated}
    />
  );
}
