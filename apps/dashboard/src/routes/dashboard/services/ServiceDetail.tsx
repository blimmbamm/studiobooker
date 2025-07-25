import { Divider } from '@mui/material';

import { FallbackMessage, useNumericParam } from '@studiobooker/utils';
import { useService } from '../../../hooks/service.queries';
import ServiceStaff from './components/staff/ServiceStaff';
import ServiceSettings from './components/settings/ServiceSettings';
import { ServiceProperties } from './components/properties/ServiceProperties';
import ServiceActivationValidationProvider from '../../../contexts/ServiceActivationValidationContext';

export default function ServiceDetail() {
  const serviceId = useNumericParam('id');

  const { service, isNotFoundError, isOtherError } = useService(serviceId);

  if (!serviceId || isNotFoundError) {
    return <FallbackMessage message="The requested service does not exist." />;
  }

  if (isOtherError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return (
    <ServiceActivationValidationProvider service={service}>
      <ServiceProperties service={service} />
      <Divider />
      <ServiceStaff service={service} />
      <Divider />
      <ServiceSettings service={service} />
    </ServiceActivationValidationProvider>
  );
}
