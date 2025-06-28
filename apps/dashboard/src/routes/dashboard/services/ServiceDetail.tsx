import { FallbackMessage, useNumericParam } from '@studiobooker/utils';
import { useService } from '../../../hooks/service.queries';
import { ServiceProperties } from './components/ServiceProperties';

export default function ServiceDetail() {
  const serviceId = useNumericParam('id');

  const { service, isNotFoundError, isOtherError, isError } = useService(serviceId);

  if (!serviceId || isNotFoundError) {
    return <FallbackMessage message="The requested service does not exist." />;
  }

  console.log(isOtherError)
  console.log(isError)

  if (isOtherError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return <ServiceProperties service={service} />;
}
