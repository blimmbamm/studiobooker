import {
  SideNavSection,
  NavigationList,
  useNumericParam,
} from '@studiobooker/utils';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';

export default function StaffNavigation() {
  const { isLoading, staff, isError } = useAllStaff();

  const staffId = useNumericParam('id');

  return (
    <SideNavSection title="Staff" actionComponent={<AddStaff />}>
      <NavigationList
        isLoading={isLoading}
        isError={isError}
        data={staff}
        labelProperty="name"
        errorMessage="Something went wrong. :("
        fallbackMessage="No staff yet."
        isActive={(staffMember) => staffMember.id === staffId}
        navigateTo={(staffMember) => staffMember.id.toString()}
      />
    </SideNavSection>
  );
}
