import {
  StatusSection,
  Staff,
  StaffStructured,
  useAlert,
} from '@studiobooker/utils';

import { useEditStaff } from '../../../../../hooks/queries/staff.queries';
import { useStaffActivationValidation } from '../../../../../contexts/StaffActivationValidationContext';

type Props = { staff?: StaffStructured };

export default function StaffStatus({ staff }: Props) {
  const { mutate } = useEditStaff({
    staffId: staff?.id || 0,
    withOptimisticUpdating: true,
  });

  const { setError } = useStaffActivationValidation();

  const { show } = useAlert();

  const hasNoWorkingTimes = staff?.workingTimes.every((wt) => !wt.activated);

  const hasNoServiceCapability = staff?.serviceCategories.every((c) =>
    c.services.every((s) => !s.staffIsQualifiedForService)
  );

  function handleToggleStaffActivation(staff: Staff) {
    if (!hasNoServiceCapability && !hasNoWorkingTimes) {
      mutate({
        input: { activated: !staff.activated },
      });
    }

    if(hasNoWorkingTimes || hasNoServiceCapability) {
      show({severity: 'error', message: 'Staff cannot be activated, check reasons below.'})
    }

    if (hasNoWorkingTimes) {
      setError(
        'working-times',
        'Staff members with no working times cannot be activated.'
      );
    }

    if (hasNoServiceCapability) {
      setError(
        'services',
        'Staff members without any service capability cannot be activated.'
      );
    }
  }

  return (
    <StatusSection
      entity={staff}
      activeStatusText={
        <>
          With this status, the staff member is visible to customers and
          bookable. Details and settings can not be edited while the staff
          member is active.
        </>
      }
      inactiveStatusText={
        <>
          With this status, the staff member is invisible to customers and not
          bookable. Details and settings can only be edited while the staff
          member is inactive.
        </>
      }
      activated={(staff) => staff.activated}
      onToggleActivation={(staff) => handleToggleStaffActivation(staff)}
    />
  );
}
