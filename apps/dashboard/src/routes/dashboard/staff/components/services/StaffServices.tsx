import { List } from '@mui/material';

import { StaffStructured } from '../../../../../types/staff';
import StaffServiceCategory from './StaffServiceCategory';
import { useManageStaffServices } from '../../../../../hooks/service.queries';
import Section from '../../../../../../../../libs/shared/utils/src/lib/components/Section';

export default function StaffServices(props: { staff: StaffStructured }) {
  const { serviceCategories, id: staffId } = props.staff;

  const manageStaffServicesMutation = useManageStaffServices({ staffId });

  function handleToggleService(id: number, select: boolean) {
    // Trigger mutation
    manageStaffServicesMutation.mutate({ select, serviceId: id });
  }

  return (
    <Section title="Services">
      <List disablePadding>
        {serviceCategories.map((sc) => (
          <StaffServiceCategory
            key={sc.id}
            serviceCategory={sc}
            onToggleService={handleToggleService}
          />
        ))}
      </List>
    </Section>
  );
}
