import { List, ListItem, ListItemButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SideNavSection, FallbackMessage } from '@studiobooker/utils';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';
import StaffListContentSkeleton from './StaffListContentSkeleton';

export default function StaffList() {
  const { isPending, staff, isError } = useAllStaff();

  const content = isError ? (
    <FallbackMessage
      variant="body1"
      marginTop={0}
      message="Something went wrong..."
    />
  ) : (
    <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
      {isPending && <StaffListContentSkeleton />}
      {staff?.map((s) => (
        <ListItemButton key={s.id}>
          <ListItem
            component={NavLink}
            to={s.id.toString()}
            sx={{
              color: 'inherit',
            }}
          >
            <Typography noWrap>{s.name}</Typography>
          </ListItem>
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <SideNavSection title="Staff" actionComponent={<AddStaff />}>
      {content}
    </SideNavSection>
  );
}
