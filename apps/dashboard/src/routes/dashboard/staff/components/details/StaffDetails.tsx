import { Staff } from '../../../../../types/staff';
import StaffName from './StaffName';
import StaffNotes from './StaffNotes';
import StaffEmail from './StaffEmail';
import StaffPhone from './StaffPhone';
import Section from '../../../../../../../../libs/shared/utils/src/lib/components/Section';

export default function StaffDetails(props: { staff: Staff }) {
  const { staff } = props;

  return (
    <Section
      title="Details"
      contentBoxProps={{ display: 'grid', gridTemplateColumns: 'auto auto' }}
    >
      <StaffName staff={staff} />
      <StaffEmail staff={staff} />
      <StaffPhone staff={staff} />
      <StaffNotes staff={staff} />
    </Section>
  );
}
