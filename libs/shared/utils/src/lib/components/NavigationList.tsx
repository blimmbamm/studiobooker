import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Skeleton,
  IconButton,
} from '@mui/material';
import { NavLink, To } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FallbackMessage } from './FallbackMessage';
import { MouseEvent, useState } from 'react';

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
  secondaryActionRender?: (
    item: T,
    anchorEl: HTMLElement | null,
    handleReset: () => void
  ) => React.ReactNode;
  secondaryActionIcon?: React.ReactNode;
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
  secondaryActionRender,
  secondaryActionIcon,
}: Props<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  function handleSecondaryAction(event: MouseEvent<HTMLElement>, item: T) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  }

  function handleReset() {
    setAnchorEl(null);
    setSelectedItem(null);
  }

  const content = () => {
    if (isLoading) return <NavigationListSkeleton />;

    if (isError) return <FallbackMessage message={errorMessage} />;

    if (data && data.length === 0)
      return <FallbackMessage message={fallbackMessage} />;

    if (data && data.length > 0)
      return data.map((item) => (
        <ListItem
          disablePadding
          key={item.id}
          component={navigateTo ? NavLink : 'li'}
          to={navigateTo?.(item)}
          sx={{
            color: 'inherit',
            ...(secondaryActionRender
              ? {
                  '&:hover .menu-button': {
                    visibility: 'visible',
                  },
                  '&:hover .active-icon': {
                    visibility: 'hidden',
                  },
                  '&:hover .list-item-button': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }
              : {}),
          }}
          secondaryAction={
            <IconButton
              className="menu-button"
              sx={{ visibility: 'hidden' }}
              onClick={(e) => handleSecondaryAction(e, item)}
            >
              {secondaryActionIcon || <MoreHorizIcon />}
            </IconButton>
          }
        >
          <ListItemButton
            onClick={() => onClick?.(item)}
            sx={{
              backgroundColor: isActive(item) ? grey[200] : 'inherit',
            }}
            className="list-item-button"
          >
            <ListItemText
              slotProps={{ primary: { noWrap: true } }}
              primary={String(item[labelProperty])}
            />
            {isActive(item) && (
              <NavigateNextIcon
                className="active-icon"
                sx={{ position: 'absolute', right: 24 }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ));

    return;
  };

  return (
    <>
      <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
        {content()}
      </List>
      {selectedItem &&
        secondaryActionRender?.(selectedItem, anchorEl, handleReset)}
      {/* Alternatively, <Menu> could go here, and only <MenuItem>'s 
        are rendered by function call with item parameter - but this 
        would restrict the usage to menus...*/}
    </>
  );
}

export function NavigationListSkeleton() {
  return [100, 50, 70].map((value) => (
    <ListItemButton key={value} disabled>
      <ListItem>
        <Skeleton width={`${value}%`} />
      </ListItem>
    </ListItemButton>
  ));
}
