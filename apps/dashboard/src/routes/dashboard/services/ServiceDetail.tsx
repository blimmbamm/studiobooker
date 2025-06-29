import { Divider } from '@mui/material';

import { FallbackMessage, useNumericParam } from '@studiobooker/utils';
import { useService } from '../../../hooks/service.queries';
import { ServiceProperties } from './components/ServiceProperties';
import ServiceStaff from './components/staff/ServiceStaff';

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
    <>
      <ServiceProperties service={service} />
      <Divider />
      <ServiceStaff service={service} />
    </>
  );
}
