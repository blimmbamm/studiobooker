import {
  Card,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddStaff from './AddStaff';
import { useAllStaff } from '../../../hooks/staff.queries';

export default function StaffList() {
  const { isPending, staff } = useAllStaff();

  return (
    <Card sx={{ overflow: 'visible' }}>
      {isPending && <CircularProgress />}
      <List>
        {staff?.map((s) => (
          <ListItemButton key={s.id}>
            <ListItem
              component={NavLink}
              to={s.id.toString()}
              sx={{ color: 'inherit' }}
            >
              {s.name}
            </ListItem>
          </ListItemButton>
        ))}
      </List>
      <AddStaff />
    </Card>
  );
}
