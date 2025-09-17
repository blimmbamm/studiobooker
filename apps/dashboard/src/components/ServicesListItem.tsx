import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { grey, red } from '@mui/material/colors';

import { ServicesListProps } from './ServicesList';
import { ServiceCategoryStructured } from '@studiobooker/utils';

type ServicesListItemProps<T extends ServiceCategoryStructured> = Omit<
  ServicesListProps<T>,
  'serviceCategories'
> & { serviceCategory: T };

export default function ServicesListItem<T extends ServiceCategoryStructured>({
  serviceCategory,
  categoryAsItemButton = true,
  expandOnSecondaryAction = false,
  onClickCategory,
  onClickService,
  categoryItemIcon,
  serviceItemIcon,
  serviceIsSelected,
  serviceIsDisabled,
  categoryIsDisabled,
}: ServicesListItemProps<T>) {
  const { name, services } = serviceCategory;

  const [open, setOpen] = useState(false);

  function handleExpand() {
    setOpen((prevOpen) => !prevOpen);
  }

  // Ok, don't know why, but 8.5 (and fractions, at least partially) is making the pattern seamless from one listitem to another:
  // const x = 8.5/3;
  const x = 8.5;

  const categoryItemContent = (
    <>
      {categoryItemIcon && (
        <ListItemIcon>{categoryItemIcon(serviceCategory)}</ListItemIcon>
      )}
      <ListItemText primary={name} />
      {!expandOnSecondaryAction && (open ? <ExpandLess /> : <ExpandMore />)}
    </>
  );

  function handleClickCategory() {
    if (!expandOnSecondaryAction) {
      handleExpand();
    }
    onClickCategory?.();
  }

  return (
    <>
      <ListItem
        disablePadding={categoryAsItemButton}
        secondaryAction={
          expandOnSecondaryAction && (
            <IconButton onClick={handleExpand}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )
        }
        sx={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${grey[100]},
            ${grey[100]} ${x}px,
            ${red[100]} ${x}px,
            ${red[100]} ${2 * x}px
          )`,
        }}
      >
        {categoryAsItemButton ? (
          <ListItemButton
            onClick={handleClickCategory}
            disabled={categoryIsDisabled?.(serviceCategory)}
          >
            {categoryItemContent}
          </ListItemButton>
        ) : (
          categoryItemContent
        )}
      </ListItem>
      <Collapse in={open}>
        <List disablePadding sx={{ backgroundColor: grey[100] }}>
          {services.map((s) => (
            <ListItem key={s.id} disablePadding>
              <ListItemButton
                onClick={() => onClickService?.(s)}
                selected={serviceIsSelected?.(s)}
                disabled={serviceIsDisabled?.(s)}
              >
                {serviceItemIcon && (
                  <ListItemIcon>{serviceItemIcon(s)}</ListItemIcon>
                )}
                <ListItemText primary={s.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
