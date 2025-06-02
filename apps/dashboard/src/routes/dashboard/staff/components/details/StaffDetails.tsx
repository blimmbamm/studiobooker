import { SxProps } from '@mui/material';

import { StaffStructured } from '../../../../../types/staff';
import { Section } from '@studiobooker/utils';
import StaffName from './StaffName';
import StaffNotes from './StaffNotes';
import StaffEmail from './StaffEmail';
import StaffPhone from './StaffPhone';
import StaffPropertySkeleton from './StaffPropertySkeleton';

type Props = {
  staff: StaffStructured | undefined;
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
      {staff && (
        <>
          <StaffPropertySkeleton name="Name" />
          <StaffPropertySkeleton name="E-mail" />
          <StaffPropertySkeleton name="Phone" />
          <StaffPropertySkeleton name="Notes" />
        </>
      )}
      {staff && (
        <>
          <StaffName staff={staff} />
          <StaffEmail staff={staff} />
          <StaffPhone staff={staff} />
          <StaffNotes staff={staff} />
        </>
      )}
    </Section>
  );
}
