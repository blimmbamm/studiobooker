import { FallbackMessage, ListSkeleton } from '@studiobooker/utils';
import { Staff } from '../../../../../types/staff';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import StaffList from '../../../../../components/StaffList';
import { Service } from '../../../../../types/service';
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
  const { staff, isError, isLoading } = useAllStaff(selectedService?.id);

  if (isError) return <FallbackMessage message="Failed to load staff." />;

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      {staff && (
        <StaffList
          staff={staff}
          onClickStaff={onSelectStaff}
          staffIsSelected={(staff) => staff === selectedStaff}
        />
      )}
      <AddAppointmentStepNavigation
        {...stepNavigationProps}
        nextDisabled={!Boolean(selectedStaff)}
      />
    </>
  );
}
