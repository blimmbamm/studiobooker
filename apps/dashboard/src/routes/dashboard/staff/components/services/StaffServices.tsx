import { List, SxProps } from '@mui/material';

import { Section } from '@studiobooker/utils';
import { StaffStructured } from '../../../../../types/staff';
import StaffServiceCategory from './StaffServiceCategory';
import { useManageStaffServices } from '../../../../../hooks/service.queries';
import StaffServicesSkeleton from './StaffServicesSkeleton';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffServices({ staff, sx }: Props) {
  const manageStaffServicesMutation = useManageStaffServices();

  return (
    <Section
      title="Services"
      contentBoxProps={{
        width: 'fit-content',
        minWidth: '75%',
      }}
      sx={sx}
    >
      {!staff && <StaffServicesSkeleton />}
      {staff && (
        <List disablePadding>
          {staff.serviceCategories.map((sc) => (
            <StaffServiceCategory
              key={sc.id}
              serviceCategory={sc}
              onToggleService={(id, select) =>
                manageStaffServicesMutation.mutate({
                  staffId: staff.id,
                  select,
                  serviceId: id,
                })
              }
            />
          ))}
        </List>
      )}
    </Section>
  );
}
