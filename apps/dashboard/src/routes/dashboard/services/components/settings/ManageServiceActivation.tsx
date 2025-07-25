import { FormControlLabel, Switch } from '@mui/material';
import { SettingsItem } from '@studiobooker/utils';
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
    <SettingsItem
      title="Service activation"
      description={`Manage the activation status of this service. 
        Services can only be edited in edit mode.
        Services need to be active in order
        to be available for customers.`}
    >
      <FormControlLabel
        checked={service.activated}
        onChange={handleActivateService}
        control={<Switch color="primary" />}
        label={service.activated ? 'Active mode' : 'Edit mode'}
        labelPlacement="top"
      />
    </SettingsItem>
  );
}
