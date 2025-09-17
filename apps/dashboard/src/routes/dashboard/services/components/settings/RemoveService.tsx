import { useNavigate } from 'react-router-dom';

import { SettingsItem, RemoveButton, Service } from '@studiobooker/utils';

import { useRemoveService } from '../../../../../hooks/service.queries';

type Props = {
  service?: Service;
};

export default function RemoveService({ service }: Props) {
  const navigate = useNavigate();

  const { mutate } = useRemoveService({ onSuccess: () => navigate('..') });

  function handleRemoveService() {
    if (service) {
      mutate({ id: service.id });
    }
  }

  return (
    <SettingsItem
      title="Remove service"
      description="Service is removed permanently."
    >
      <RemoveButton
        onConfirm={handleRemoveService}
        dialogTitle="Remove service?"
        dialogMessage={`This will remove the service permanently. 
          This action cannot be undone. Are you sure?`}
        buttonProps={{ disabled: !Boolean(service) }}
      />
    </SettingsItem>
  );
}
