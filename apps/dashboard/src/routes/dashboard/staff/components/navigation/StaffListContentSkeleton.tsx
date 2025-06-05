import { ListItem, ListItemButton, Skeleton } from '@mui/material';

export default function StaffListContentSkeleton() {
  return [100, 50, 70].map((value) => (
    <ListItemButton key={value} disabled>
      <ListItem>
        <Skeleton width={`${value}%`} />
      </ListItem>
    </ListItemButton>
  ));
}
