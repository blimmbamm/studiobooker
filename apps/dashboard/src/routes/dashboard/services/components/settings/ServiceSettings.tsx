import { SxProps } from '@mui/material';

import { SettingsSection, ServiceStructured } from '@studiobooker/utils';

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
