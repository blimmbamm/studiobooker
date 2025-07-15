import {
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import {
  FallbackMessage,
  NavigationListSkeleton,
  SideNavSection,
} from '@studiobooker/utils';
import { useCalendarStaffSelection } from './hooks/useCalendarStaffSelection';
import { useAllStaff } from '../../../hooks/staff.queries';
import { grey } from '@mui/material/colors';

type Props = { boxProps?: BoxProps };

export default function CalendarStaffSelection({ boxProps }: Props) {
  // Put logic here that adds and removes staff from staff search param
  const { toggleStaff, staffIds } = useCalendarStaffSelection();

  const { staff, isLoading, isError } = useAllStaff();

  function content() {
    if (isLoading) return <NavigationListSkeleton />;

    if (isError) return <FallbackMessage message="Something went wrong. :(" />;

    if (staff && staff.length === 0)
      return <FallbackMessage message="No staff yet." />;

    if (staff && staff.length > 0) {
      return staff.map((s) => (
        <ListItem key={s.id} disablePadding>
          <ListItemButton
            sx={{
              backgroundColor: staffIds?.includes(s.id) ? grey[200] : 'inherit',
            }}
            onClick={() => toggleStaff(s.id)}
          >
            <ListItemIcon sx={{ minWidth: 0, paddingRight: 1.5 }}>
              {staffIds?.includes(s.id) ? (
                <CheckBoxOutlinedIcon />
              ) : (
                <CheckBoxOutlineBlankOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={s.name} />
          </ListItemButton>
        </ListItem>
      ));
    }

    return;
  }

  return (
    <SideNavSection title="Staff" {...boxProps}>
      <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
        {content()}
      </List>
    </SideNavSection>
  );
}
