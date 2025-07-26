import { FallbackMessage, ListSkeleton } from '@studiobooker/utils';
import { useServicesByCategory } from '../../../../../hooks/service.queries';
import { ServicesList } from '../../../../../components/ServicesList';
import { Service } from '../../../../../types/service';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { Box } from '@mui/material';

type Props = {
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
} & AddAppointmentStepNavigationProps;

export default function AppointmentServiceSelection({
  selectedService,
  onSelectService,
  ...stepNavigationProps
}: Props) {
  const { serviceCategories, noServices, isError, isLoading } =
    useServicesByCategory(true);

  if (isError) return <FallbackMessage message="Failed to load services." />;

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      <Box flex={1} overflow={'auto'}>
        {serviceCategories && (
          <ServicesList
            serviceCategories={serviceCategories}
            onClickService={onSelectService}
            serviceIsSelected={(service) => selectedService === service}
          />
        )}
        {noServices && (
          <FallbackMessage message="There are no services available." />
        )}
      </Box>
      <AddAppointmentStepNavigation
        {...stepNavigationProps}
        nextDisabled={!Boolean(selectedService)}
      />
    </>
  );
}
