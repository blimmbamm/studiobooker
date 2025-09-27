import { Divider } from '@mui/material';

import { FallbackMessage, useNumericParam } from '@studiobooker/utils';

import StaffServices from './components/services/StaffServices';
import StaffWorkingTimes from './components/working-times/StaffWorkingTimes';
import StaffSettings from './components/settings/StaffSettings';
import StaffProperties from './components/properties/StaffProperties';
import StaffStatus from './components/status/StaffStatus';
import { useStaff } from '../../../hooks/queries/staff.queries';
import StaffActivationValidationProvider from '../../../contexts/StaffActivationValidationContext';
import { usePageTitle } from '../../../hooks/meta-data/usePageTitle';

export default function StaffDetail() {
  const staffId = useNumericParam('id');

  const { staff, isNotFoundError, isOtherError } = useStaff(staffId);

  usePageTitle(`Staff - ${staff ? staff.name : '...'}`);

  if (!staffId || isNotFoundError) {
    return <FallbackMessage message="The requested staff does not exist." />;
  }

  if (isOtherError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return (
    <StaffActivationValidationProvider staff={staff}>
      <StaffStatus staff={staff} />
      <Divider />
      <StaffProperties staff={staff} />
      <Divider />
      <StaffWorkingTimes staff={staff} />
      <Divider />
      <StaffServices staff={staff} />
      <Divider />
      <StaffSettings staff={staff} sx={{ marginBottom: 5 }} />
    </StaffActivationValidationProvider>
  );
}
