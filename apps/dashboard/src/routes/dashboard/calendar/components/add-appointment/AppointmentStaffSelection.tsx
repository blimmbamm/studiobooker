import { Box } from '@mui/material';

import {
  FallbackMessage,
  ListSkeleton,
  Staff,
  Service,
  StaffList,
} from '@studiobooker/utils';

import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { useAllStaff } from '../../../../../hooks/queries/staff.queries';

type Props = {
  selectedService: Service;
  selectedStaff: Staff | null;
  onSelectStaff: (staff: Staff) => void;
} & AddAppointmentStepNavigationProps;

export default function AppointmentStaffSelection({
  selectedStaff,
  selectedService,
  onSelectStaff,
  ...stepNavigationProps
}: Props) {
  const { staff, noStaff, isError, isLoading } = useAllStaff({
    serviceId: selectedService.id,
    activated: true,
  });

  if (isError) return <FallbackMessage message="Failed to load staff." />;

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      <Box flex={1} overflow={'auto'}>
        {staff && (
          <StaffList
            staff={staff}
            onClickStaff={onSelectStaff}
            staffIsSelected={(staff) => staff === selectedStaff}
          />
        )}
        {noStaff && <FallbackMessage message="There is no staff available." />}
      </Box>
      <AddAppointmentStepNavigation
        {...stepNavigationProps}
        nextDisabled={!Boolean(selectedStaff)}
      />
    </>
  );
}
