import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';

import {
  FallbackMessage,
  ListSkeleton,
  Service,
  ServicesList,
} from '@studiobooker/utils';

import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { useServicesByCategory } from '../../../../../hooks/queries/service.queries';

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
            renderListItemContent={(service) => (
              <ListItem key={service.id} disablePadding>
                <ListItemButton
                  onClick={() => onSelectService(service)}
                  selected={service === selectedService}
                >
                  <ListItemText primary={service.title} />
                </ListItemButton>
              </ListItem>
            )}
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
