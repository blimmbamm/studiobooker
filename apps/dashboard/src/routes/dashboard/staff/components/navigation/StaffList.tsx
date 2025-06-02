import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SideNavSection } from '@studiobooker/utils';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';

export default function StaffList() {
  const { isPending, staff } = useAllStaff();

  return (
    <SideNavSection title="Staff" actionComponent={<AddStaff />}>
      {/* If all staff pending, render skeleton */}
      {isPending && <CircularProgress />}
      <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
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
    </SideNavSection>
  );
}
