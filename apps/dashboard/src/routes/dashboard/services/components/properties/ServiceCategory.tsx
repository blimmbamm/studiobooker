import { MenuItem } from '@mui/material';

import { PropertiesTableProperty } from '@studiobooker/utils';
import { ServiceStructured } from '../../../../../types/service';
import { useServicesByCategory } from '../../../../../hooks/service.queries';
import { useSelectServiceCategory } from '../../hooks/useSelectServiceCategory';

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
    >
      {serviceCategories?.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      ))}
    </PropertiesTableProperty>
  );
}
