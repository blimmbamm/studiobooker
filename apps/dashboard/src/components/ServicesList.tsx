import { List, ListProps } from '@mui/material';
import { ReactNode } from 'react';

import { ServiceCategoryStructured } from '@studiobooker/utils';
import ServicesListItem from './ServicesListItem';

export type ServicesListProps<T extends ServiceCategoryStructured> = {
  serviceCategories: T[];
  categoryAsItemButton?: boolean;
  expandOnSecondaryAction?: boolean;
  onClickCategory?: () => void;
  onClickService?: (service: T['services'][number]) => void;
  categoryItemIcon?: (category: T) => ReactNode;
  serviceItemIcon?: (service: T['services'][number]) => ReactNode;
  serviceIsSelected?: (service: T['services'][number]) => boolean;
  serviceIsDisabled?: (service: T['services'][number]) => boolean;
  categoryIsDisabled?: (category: T) => boolean;
  listProps?: ListProps;
};

export function ServicesList<T extends ServiceCategoryStructured>({
  serviceCategories,
  listProps,
  ...props
}: ServicesListProps<T>) {
  return (
    <List disablePadding {...listProps}>
      {serviceCategories.map((sc) => (
        <ServicesListItem key={sc.id} serviceCategory={sc} {...props} />
      ))}
    </List>
  );
}
