import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
};

export function StaffList<T extends Staff>({
  staff,
  onClickStaff,
  staffItemIcon,
  staffIsSelected,
  staffIsDisabled,
}: StaffListProps<T>) {
  return (
    <List dense disablePadding sx={{ backgroundColor: grey[100] }}>
      {staff.map((s) => (
        <ListItem key={s.id} disablePadding>
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
