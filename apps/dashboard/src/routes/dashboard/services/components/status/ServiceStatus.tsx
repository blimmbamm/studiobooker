import { Skeleton, SxProps } from '@mui/material';
import { ServiceStructured } from '../../../../../types/service';
import { Section } from '@studiobooker/utils';
import ManageServiceActivation from '../settings/ManageServiceActivation';

type Props = {
  service?: ServiceStructured;
  sx?: SxProps;
};

export default function ServiceStatus({ service, sx }: Props) {
  return (
    <Section title="Status">
      {!service && <Skeleton />}
      {service && <ManageServiceActivation service={service} />}
    </Section>
  );
}
