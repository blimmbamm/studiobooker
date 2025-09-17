import { Box } from '@mui/material';

import {
  FallbackMessage,
  ListSkeleton,
  Staff,
  Service,
} from '@studiobooker/utils';

import { useAllStaff } from '../../../../../hooks/staff.queries';
import StaffList from '../../../../../components/StaffList';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';

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
