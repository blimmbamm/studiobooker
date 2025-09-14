'use client';

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
import { grey } from '@mui/material/colors';

import { ServicesListProps } from './ServicesList';
import { ServiceCategoryStructured } from '../../types/api/service-category/service-category';

type ServicesListItemProps<T extends ServiceCategoryStructured> = Omit<
  ServicesListProps<T>,
  'serviceCategories'
> & { serviceCategory: T };

export default function ServicesListItem<T extends ServiceCategoryStructured>({
  serviceCategory,
  categoryAsItemButton = true,
  expandOnSecondaryAction = false,
  onClickCategory,
  categoryItemIcon,
  categoryIsDisabled,
  renderListItemContent,
  onCollapseCategory,
}: ServicesListItemProps<T>) {
  const { name, services } = serviceCategory;

  const [open, setOpen] = useState(false);

  function handleExpand() {
    setOpen((prevOpen) => !prevOpen);
  }

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
        sx={{ backgroundColor: grey[300], borderRadius: 1.5 }}
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
      <Collapse in={open} onExited={onCollapseCategory}>
        <List
          disablePadding
          sx={{ backgroundColor: grey[100], borderRadius: 1.5 }}
        >
          {services.map((s) => renderListItemContent(s))}
        </List>
      </Collapse>
    </>
  );
}
