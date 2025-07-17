import {
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import {
  FallbackMessage,
  NavigationListSkeleton,
  SideNavSection,
} from '@studiobooker/utils';
import { useCalendarStaffSelection } from './hooks/useCalendarStaffSelection';
import { useAllStaff } from '../../../hooks/staff.queries';
import { grey } from '@mui/material/colors';
import { useStaffColors } from './contexts/StaffColorContext';

type Props = { boxProps?: BoxProps };

export default function CalendarStaffSelection({ boxProps }: Props) {
  const { toggleStaff, staffIds } = useCalendarStaffSelection();

  const { staff, isLoading, isError } = useAllStaff();

  // function* colorIterator(colors: string[]) {
  //   let index = 0;
  //   while (true) {
  //     console.log(index)
  //     yield colors[index % colors.length];
  //     index++;
  //   }
  // }

  // // Usage
  // const colors = ['red', 'blue', 'green'];
  // const iterator = colorIterator(colors);
  // '#33FF57'
  const staffColorMap = useStaffColors()

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
                // <CheckBoxOutlinedIcon />
                // <CheckBoxIcon sx={{ color: iterator.next().value! }} />
                <CheckBoxIcon sx={{ color: staffColorMap[s.id] }} />
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
