import { SettingSkeleton, TableSection } from '@studiobooker/utils';
import { ServiceStructured } from '../../../../../types/service';
import { SxProps } from '@mui/material';
import ManageServiceActivation from './ManageServiceActivation';
import RemoveService from './RemoveService';

type Props = {
  service?: ServiceStructured;
  sx?: SxProps;
};

export default function ServiceSettings({ service, sx }: Props) {
  return (
    <TableSection title="Settings" columns={service ? 2 : 1} sx={sx}>
      {!service && (
        <>
          <SettingSkeleton />
          <SettingSkeleton />
        </>
      )}
      {service && (
        <>
          <ManageServiceActivation service={service} />
          <RemoveService service={service} />
        </>
      )}
    </TableSection>
  );
}
