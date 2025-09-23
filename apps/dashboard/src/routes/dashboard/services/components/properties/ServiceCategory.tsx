import { MenuItem } from '@mui/material';

import {
  PropertiesTableProperty,
  ServiceStructured,
} from '@studiobooker/utils';

import { useSelectServiceCategory } from '../../hooks/useSelectServiceCategory';
import { useServicesByCategory } from '../../../../../hooks/queries/service.queries';

export default function ServiceCategory({
  service,
}: {
  service: ServiceStructured;
}) {
  const { serviceCategories } = useServicesByCategory();

  const { value, handleChange } = useSelectServiceCategory({
    serviceId: service.id,
    initialCategoryId: service.serviceCategory.id,
  });

  return (
    <PropertiesTableProperty
      name="Category"
      select
      value={value}
      onChange={handleChange}
      disabled={service.activated}
    >
      {serviceCategories?.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      ))}
    </PropertiesTableProperty>
  );
}
