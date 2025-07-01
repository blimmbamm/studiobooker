import { SettingsItem, RemoveButton } from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { useNavigate } from 'react-router-dom';
import { useRemoveService } from '../../../../../hooks/service.queries';

type Props = {
  service: Service;
};

export default function RemoveService({ service }: Props) {
  const navigate = useNavigate();

  const { mutate } = useRemoveService({ onSuccess: () => navigate('..') });
  return (
    <SettingsItem
      title="Remove service"
      description="Service is removed permanently."
    >
      <RemoveButton
        onConfirm={() => mutate({ id: service.id })}
        dialogTitle="Remove service?"
        dialogMessage={`This will remove the service permanently. 
          This action cannot be undone. Are you sure?`}
      />
    </SettingsItem>
  );
}
