import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';
import SideNavSection from '../../../../../../../../libs/shared/utils/src/lib/components/SideNavSection';

export default function StaffList() {
  const { isPending, staff } = useAllStaff();

  return (
    <SideNavSection title="Staff">
      {/* If all staff pending, render skeleton */}
      {isPending && <CircularProgress />}
      <List sx={{ flex: 1, overflowY: 'auto' }}>
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
      <AddStaff />
    </SideNavSection>
  );
}
