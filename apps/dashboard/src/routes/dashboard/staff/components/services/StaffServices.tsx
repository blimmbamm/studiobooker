import { List, SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Section } from '@studiobooker/utils';
import { StaffStructured } from '../../../../../types/staff';
import StaffServiceCategory from './StaffServiceCategory';
import { useManageStaffServices } from '../../../../../hooks/service.queries';

type Props = {
  staff: StaffStructured;
  sx?: SxProps;
};

export default function StaffServices({ staff, sx }: Props) {
  const { serviceCategories, id: staffId } = staff;

  const manageStaffServicesMutation = useManageStaffServices({ staffId });

  function handleToggleService(id: number, select: boolean) {
    // Trigger mutation
    manageStaffServicesMutation.mutate({ select, serviceId: id });
  }

  return (
    <Section
      title="Services"
      contentBoxProps={{
        width: 'fit-content',
        minWidth: '75%',
      }}
      sx={sx}
    >
      <List
        disablePadding
        sx={{
          backgroundColor: grey[300],
        }}
      >
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
