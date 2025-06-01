import { StaffStructured } from '../../../../../types/staff';
import StaffName from './StaffName';
import StaffNotes from './StaffNotes';
import StaffEmail from './StaffEmail';
import StaffPhone from './StaffPhone';
import Section from '../../../../../../../../libs/shared/utils/src/lib/components/Section';
import { SxProps } from '@mui/material';

type Props = {
  staff: StaffStructured;
  sx?: SxProps;
};

export default function StaffDetails({ staff, sx }: Props) {
  return (
    <Section
      title="Details"
      contentBoxProps={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        width: 'fit-content',
        rowGap: 1,
        columnGap: 3,
      }}
      sx={sx}
    >
      <StaffName staff={staff} />
      <StaffEmail staff={staff} />
      <StaffPhone staff={staff} />
      <StaffNotes staff={staff} />
    </Section>
  );
}
