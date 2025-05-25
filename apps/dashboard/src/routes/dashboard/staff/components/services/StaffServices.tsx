import { Card, CardContent, CardHeader, List } from '@mui/material';

import { StaffStructured } from '../../../../../types/staff';
import StaffServiceCategory from './StaffServiceCategory';
import { useManageStaffServices } from '../../../../../hooks/service.queries';

export default function StaffServices(props: { staff: StaffStructured }) {
  const { serviceCategories, id: staffId } = props.staff;

  const manageStaffServicesMutation = useManageStaffServices({ staffId });

  function handleToggleService(id: number, select: boolean) {
    // Trigger mutation
    manageStaffServicesMutation.mutate({ select, serviceId: id });
  }

  return (
    <Card sx={{overflow: 'visible'}}>
      <CardHeader title="Services" />
      <List disablePadding>
        {serviceCategories.map((sc) => (
          <StaffServiceCategory
            key={sc.id}
            serviceCategory={sc}
            onToggleService={handleToggleService}
          />
        ))}
      </List>
      <CardContent></CardContent>
    </Card>
  );
}
