import { ChangeEvent } from 'react';
import { InputAdornment } from '@mui/material';

import {
  isPositiveNumberStringOrEmpty,
  PropertiesTableProperty,
  Service,
} from '@studiobooker/utils';

import { useServiceProperty } from '../../hooks/useServiceProperty';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';

export default function ServicePrice({ service }: { service: Service }) {
  const { value, handleChange } = useServiceProperty({
    entity: service,
    property: 'price',
    parseProperty: (value) => +value,
    updateValueIf: isPositiveNumberStringOrEmpty,
  });

  const { hasError, errorMessage, resetError } =
    useServiceActivationValidation();

  function handleChangePrice(event: ChangeEvent<HTMLInputElement>) {
    const didChange = handleChange(event);

    if (didChange) {
      resetError('price');
    }
  }

  return (
    <PropertiesTableProperty
      name="Price"
      value={value}
      onChange={handleChangePrice}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        },
      }}
      error={hasError('price')}
      helperText={errorMessage('price')}
      disabled={service.activated}
    />
  );
}
