import { FormControlLabel, Switch } from '@mui/material';
import { SettingsItem } from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { useEditService } from '../../../../../hooks/service.queries';

type Props = {
  service: Service;
};

export default function ManageServiceActivation({ service }: Props) {
  const { mutate } = useEditService({
    serviceId: service.id,
    withOptimisticUpdating: true,
  });

  return (
    <SettingsItem
      title="Service activation"
      description={`Manage the activation status of this service. Inactive services are not visible to customers, what is especially useful when drafting or editing a service.`}
    >
      <FormControlLabel
        checked={service.activated}
        onChange={() => mutate({ input: { activated: !service.activated } })}
        control={<Switch color="primary" />}
        label={service.activated ? 'Active' : 'Inactive'}
        labelPlacement="top"
      />
    </SettingsItem>
  );
}
