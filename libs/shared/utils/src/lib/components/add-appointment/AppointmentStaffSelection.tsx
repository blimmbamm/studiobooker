'use client';

import { Box } from '@mui/material';

import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { Service } from '../../types';
import { Staff } from '../../types/api/staff/staff';
import { FallbackMessage } from '../FallbackMessage';
import { ListSkeleton } from '../ListSkeleton';
import { StaffQuery } from './AddAppointmentForServiceDialog';
import StaffList from '../staff-list/StaffList';

type Props = {
  selectedService: Service;
  selectedStaff: Staff | null;
  staffQuery: StaffQuery;
  onSelectStaff: (staff: Staff) => void;
} & AddAppointmentStepNavigationProps;

export default function AppointmentStaffSelection({
  selectedStaff,
  selectedService,
  staffQuery,
  onSelectStaff,
  ...stepNavigationProps
}: Props) {
  const { staff, noStaff, isError, isLoading } = staffQuery(selectedService);

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
