import { Divider } from '@mui/material';

import { FallbackMessage, useNumericParam } from '@studiobooker/utils';

import ServiceStaff from './components/staff/ServiceStaff';
import ServiceSettings from './components/settings/ServiceSettings';
import { ServiceProperties } from './components/properties/ServiceProperties';
import ServiceActivationValidationProvider from '../../../contexts/ServiceActivationValidationContext';
import ServiceStatus from './components/status/ServiceStatus';
import { useService } from '../../../hooks/queries/service.queries';
import { usePageTitle } from '../../../hooks/meta-data/usePageTitle';

export default function ServiceDetail() {
  const serviceId = useNumericParam('id');

  const { service, isNotFoundError, isOtherError } = useService(serviceId);

  usePageTitle(`Services - ${service?.title || '...'}`);

  if (!serviceId || isNotFoundError) {
    return <FallbackMessage message="The requested service does not exist." />;
  }

  if (isOtherError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return (
    <ServiceActivationValidationProvider service={service}>
      <ServiceStatus service={service} />
      <Divider />
      <ServiceProperties service={service} />
      <Divider />
      <ServiceStaff service={service} />
      <Divider />
      <ServiceSettings service={service} />
    </ServiceActivationValidationProvider>
  );
}
