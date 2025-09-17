import { Divider } from '@mui/material';

import { FallbackMessage, useNumericParam } from '@studiobooker/utils';

import { useStaff } from '../../../hooks/staff.queries';
import StaffServices from './components/services/StaffServices';
import StaffWorkingTimes from './components/working-times/StaffWorkingTimes';
import StaffSettings from './components/settings/StaffSettings';
import StaffProperties from './components/properties/StaffProperties';
import StaffStatus from './components/status/StaffStatus';

export default function StaffDetail() {
  const staffId = useNumericParam('id');

  const { staff, isNotFoundError, isOtherError } = useStaff(staffId);

  if (!staffId || isNotFoundError) {
    return <FallbackMessage message="The requested staff does not exist." />;
  }

  if (isOtherError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return (
    <>
      <StaffStatus staff={staff} />
      <Divider />
      <StaffProperties staff={staff} />
      <Divider />
      <StaffWorkingTimes staff={staff} />
      <Divider />
      <StaffServices staff={staff} />
      <Divider />
      <StaffSettings staff={staff} sx={{ marginBottom: 5 }} />
    </>
  );
}
