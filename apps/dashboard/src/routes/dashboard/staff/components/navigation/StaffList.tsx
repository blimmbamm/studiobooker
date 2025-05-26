import {
  Card,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';

export default function StaffList() {
  const { isPending, staff } = useAllStaff();

  return (
    <Card
      sx={{
        width: 250,
        margin: 2,
        marginBottom: 4,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible', // only for bottom button
        position: 'sticky',
        // top: 0,
        // bottom: 0,
        height: "100%",
        top: "1rem"
      }}
    >
      <CardHeader title="Staff" />
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
    </Card>
  );
}
