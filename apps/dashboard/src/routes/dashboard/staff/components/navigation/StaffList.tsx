import {
  Card,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAllStaff } from '../../../../../hooks/staff.queries';
import AddStaff from './AddStaff';

export default function StaffList() {
  const { isPending, staff } = useAllStaff();

  /**
   * - Fixed width of 250px or so for card
   * - scroll staff list
   * - list item overflow ellipsis
   * - are list item labels centered?
   */

  return (
    <Card    
      sx={{
        border: 1,
        // borderColor: , // how to set this to some theme color?
        margin: 2,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible'
      }}
    >
      <CardHeader title="Staff" />
      {isPending && <CircularProgress />}
      <List sx={{flex: 1}}>
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
