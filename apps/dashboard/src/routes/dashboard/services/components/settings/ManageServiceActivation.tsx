import { Box, FormControlLabel, Switch, Typography } from '@mui/material';

import { Service } from '../../../../../types/service';
import { useEditService } from '../../../../../hooks/service.queries';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';

type Props = {
  service: Service;
};

export default function ManageServiceActivation({ service }: Props) {
  const { mutate } = useEditService({
    serviceId: service.id,
    withOptimisticUpdating: true,
  });

  const { setError } = useServiceActivationValidation();

  function handleActivateService() {
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
    <Box display="flex" justifyContent={'space-between'}>
      <Typography>
        {service.activated
          ? `Service is activated and visible for customers. 
        Switch to editing mode to change service settings.`
          : `Service is currently in editing mode and not visible for customers. `}
      </Typography>
      <FormControlLabel
        checked={service.activated}
        onChange={handleActivateService}
        control={<Switch color="primary" />}
        label={service.activated ? 'Active' : 'Editing'}
        labelPlacement="top"
      />
    </Box>
  );
}
