'use client';

import { List, ListProps } from '@mui/material';
import { ReactNode } from 'react';

import ServicesListItem from './ServicesListItem';
import { ServiceCategoryStructured } from '../../types/api/service-category/service-category';

export type ServicesListProps<T extends ServiceCategoryStructured> = {
  serviceCategories: T[];
  categoryAsItemButton?: boolean;
  expandOnSecondaryAction?: boolean;
  onClickCategory?: () => void;
  categoryItemIcon?: (category: T) => ReactNode;
  categoryIsDisabled?: (category: T) => boolean;
  listProps?: ListProps;
  renderListItemContent: (s: T['services'][number]) => ReactNode;
  onCollapseCategory?: () => void;
};

export function ServicesList<T extends ServiceCategoryStructured>({
  serviceCategories,
  listProps,
  ...props
}: ServicesListProps<T>) {
  const { sx, ...otherListProps } = listProps || {};
  return (
    <List
      disablePadding
      {...otherListProps}
      sx={{ ...sx, gap: 0.5, display: 'flex', flexDirection: 'column' }}
    >
      {serviceCategories.map((sc) => (
        <ServicesListItem key={sc.id} serviceCategory={sc} {...props} />
      ))}
    </List>
  );
}
