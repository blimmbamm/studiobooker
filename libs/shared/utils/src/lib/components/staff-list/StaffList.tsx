import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';
import { Staff } from '../../types/api/staff/staff';

type StaffListProps<T extends Staff> = {
  staff: T[];
  onClickStaff?: (staff: T) => void;
  staffItemIcon?: (staff: T) => ReactNode;
  staffIsSelected?: (staff: T) => boolean;
  staffIsDisabled?: (staff: T) => boolean;
  listProps?: ListProps;
};

export function StaffList<T extends Staff>({
  staff,
  onClickStaff,
  staffItemIcon,
  staffIsSelected,
  staffIsDisabled,
  listProps,
}: StaffListProps<T>) {
  return (
    <List
      disablePadding
      sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      {...listProps}
    >
      {staff.map((s) => (
        <ListItem
          key={s.id}
          disablePadding
          sx={{ backgroundColor: grey[300], borderRadius: 1.5 }}
        >
          <ListItemButton
            onClick={() => onClickStaff?.(s)}
            selected={staffIsSelected?.(s)}
            disabled={staffIsDisabled?.(s)}
          >
            {staffItemIcon && <ListItemIcon>{staffItemIcon(s)}</ListItemIcon>}
            <ListItemText
              primary={s.name}
              slotProps={{ primary: { noWrap: true } }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
