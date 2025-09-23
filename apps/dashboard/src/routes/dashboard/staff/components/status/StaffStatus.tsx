import { StatusSection, Staff } from '@studiobooker/utils';

import { useEditStaff } from '../../../../../hooks/queries/staff.queries';

type Props = { staff?: Staff };

export default function StaffStatus({ staff }: Props) {
  const { mutate } = useEditStaff({
    staffId: staff?.id || 0,
    withOptimisticUpdating: true,
  });

  function handleToggleStaffActivation(staff: Staff) {
    mutate({
      input: { activated: !staff.activated },
    });
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
