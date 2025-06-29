import {InputAdornment} from '@mui/material';

import { PropertiesTableProperty } from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { useServiceProperty } from '../../hooks/useServiceProperty';

export default function ServicePrice({ service }: { service: Service }) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const { value, handleChange } = useServiceProperty({
    entity: service,
    property: 'price',
    parseProperty: (value) => +value,
    updateValueIf: isNumberString,
  });

  return (
    <PropertiesTableProperty
      name="Price"
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        },
      }}
    />
  );
}
