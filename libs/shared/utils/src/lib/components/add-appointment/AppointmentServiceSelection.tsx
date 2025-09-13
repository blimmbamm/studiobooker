'use client';

import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { Service } from '../../types';
import { FallbackMessage } from '../FallbackMessage';
import { ListSkeleton } from '../ListSkeleton';
import { ServicesList } from '../services-list';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { ServicesByCategoryQuery } from './AddAppointmentForServiceDialog';

type Props = {
  selectedService: Service | null;
  servicesByCategoryQuery: ServicesByCategoryQuery;
  onSelectService: (service: Service) => void;
} & AddAppointmentStepNavigationProps;

export default function AppointmentServiceSelection({
  selectedService,
  servicesByCategoryQuery,
  onSelectService,
  ...stepNavigationProps
}: Props) {
  const { serviceCategories, noServices, isError, isLoading } =
    servicesByCategoryQuery();

  if (isError) return <FallbackMessage message="Failed to load services." />;

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      <Box flex={1} overflow={'auto'}>
        {serviceCategories && (
          <ServicesList
            serviceCategories={serviceCategories}
            renderListItemContent={(s) => (
              <ListItem key={s.id} disablePadding>
                <ListItemButton
                  selected={selectedService === s} 
                  onClick={() => onSelectService(s)}
                >
                  <ListItemText primary={s.title} />
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
