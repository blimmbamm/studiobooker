import {
  List,
  ListItemButton,
  ListItem,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import { NavLink, To } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FallbackMessage } from './FallbackMessage';

type Props<T extends { id: number }> = {
  isLoading: boolean;
  isError?: boolean;
  data: T[] | undefined;
  fallbackMessage: string;
  errorMessage: string;
  labelProperty: keyof T;
  isActive: (item: T) => boolean;
  navigateTo?: (item: T) => To;
  onClick?: (item: T) => void;
};

export function NavigationList<T extends { id: number }>({
  isLoading,
  isError = false,
  data,
  fallbackMessage,
  errorMessage,
  labelProperty,
  isActive,
  navigateTo,
  onClick,
}: Props<T>) {
  const content = () => {
    if (isLoading) return <NavigationListSkeleton />;

    if (isError) return <FallbackMessage message={errorMessage} />;

    if (data && data.length === 0)
      return <FallbackMessage message={fallbackMessage} />;

    if (data && data.length > 0)
      return data.map((item) => (
        <ListItemButton
          key={item.id}
          onClick={() => onClick?.(item)}
          sx={{
            backgroundColor: isActive(item) ? grey[200] : 'inherit',
          }}
        >
          <ListItem
            component={navigateTo ? NavLink : 'li'}
            to={navigateTo?.(item)}
            sx={{
              color: 'inherit',
            }}
          >
            <Typography noWrap>{String(item[labelProperty])}</Typography>
            <Box flex={1} />
            {isActive(item) && <NavigateNextIcon />}
          </ListItem>
        </ListItemButton>
      ));

    return;
  };

  return (
    <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
      {content()}
    </List>
  );
}

function NavigationListSkeleton() {
  return [100, 50, 70].map((value) => (
    <ListItemButton key={value} disabled>
      <ListItem>
        <Skeleton width={`${value}%`} />
      </ListItem>
    </ListItemButton>
  ));
}
