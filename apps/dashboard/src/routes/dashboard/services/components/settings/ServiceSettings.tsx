import { SettingsSection } from '@studiobooker/utils';
import { ServiceStructured } from '../../../../../types/service';
import { SxProps } from '@mui/material';
import RemoveService from './RemoveService';

type Props = {
  service?: ServiceStructured;
  sx?: SxProps;
};

export default function ServiceSettings({ service, sx }: Props) {
  return (
    <SettingsSection>
      <RemoveService service={service} />
    </SettingsSection>
  );
}
