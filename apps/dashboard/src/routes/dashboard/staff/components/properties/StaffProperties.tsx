import {
  PropertiesTableSection,
  PropertySkeleton,
  StaffStructured,
} from '@studiobooker/utils';

import StaffName from './StaffName';
import StaffNotes from './StaffNotes';
import StaffEmail from './StaffEmail';
import StaffPhone from './StaffPhone';

type Props = {
  staff: StaffStructured | undefined;
};

export default function StaffProperties({ staff }: Props) {
  return (
    <PropertiesTableSection title="Details">
      {!staff && (
        <>
          <PropertySkeleton name="Name" />
          <PropertySkeleton name="E-mail" />
          <PropertySkeleton name="Phone" />
          <PropertySkeleton name="Notes" />
        </>
      )}
      {staff && (
        <>
          <StaffName staff={staff} />
          <StaffEmail staff={staff} />
          <StaffPhone staff={staff} />
          <StaffNotes staff={staff} />
        </>
      )}
    </PropertiesTableSection>
  );
}
