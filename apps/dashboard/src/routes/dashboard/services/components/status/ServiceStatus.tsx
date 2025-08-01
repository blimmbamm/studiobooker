import { SxProps } from '@mui/material';
import { Service, ServiceStructured } from '../../../../../types/service';
import { StatusSection } from '@studiobooker/utils';
import { useEditService } from '../../../../../hooks/service.queries';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';

type Props = {
  service?: ServiceStructured;
  sx?: SxProps;
};

export default function ServiceStatus({ service, sx }: Props) {
  const { mutate } = useEditService({
    serviceId: service?.id || 0, // TODO: move serviceId to mutate function
    withOptimisticUpdating: true,
  });

  const { setError } = useServiceActivationValidation();

  function handleActivateService(service: Service) {
    if (!service.duration || !service.price) {
      if (!service.duration) {
        setError('duration', 'Must be set in order to activate service.');
      }

      if (!service.price) {
        setError('price', 'Must be set in order to activate service');
      }
    } else {
      mutate({ input: { activated: !service.activated } });
    }
  }

  return (
    <StatusSection
      entity={service}
      activeStatusText={
        <>
          With this status, the service is visible to customers and bookable.
          Details and settings can not be edited while the service is active.
        </>
      }
      inactiveStatusText={
        <>
          With this status, the service is invisible to customers and not
          bookable. Details and settings can only be edited while the service is
          inactive.
        </>
      }
      activated={(service) => service.activated}
      onToggleActivation={handleActivateService}
    />
  );
}
