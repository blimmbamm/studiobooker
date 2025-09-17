import { ChangeEvent } from 'react';
import { InputAdornment } from '@mui/material';

import {
  isPositiveNumberStringOrEmpty,
  PropertiesTableProperty,
  Service,
} from '@studiobooker/utils';

import { useServiceProperty } from '../../hooks/useServiceProperty';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';

export default function ServiceDuration({ service }: { service: Service }) {
  const { value, handleChange } = useServiceProperty({
    entity: service,
    property: 'duration',
    parseProperty: (value) => +value, // this is safe because updateValueIf only allows numeric strings
    updateValueIf: isPositiveNumberStringOrEmpty,
  });

  const { hasError, errorMessage, resetError } =
    useServiceActivationValidation();

  function handleChangeDuration(event: ChangeEvent<HTMLInputElement>) {
    const didChange = handleChange(event);

    if (didChange) {
      resetError('duration');
    }
  }

  return (
    <PropertiesTableProperty
      name="Duration"
      value={value}
      onChange={handleChangeDuration}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">min.</InputAdornment>,
        },
      }}
      error={hasError('duration')}
      helperText={errorMessage('duration')}
      disabled={service.activated}
    />
  );
}
