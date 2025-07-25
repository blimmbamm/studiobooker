import { InputAdornment } from '@mui/material';

import {
  isPositiveNumberStringOrEmpty,
  PropertiesTableProperty,
} from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { useServiceProperty } from '../../hooks/useServiceProperty';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';
import { ChangeEvent } from 'react';

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
    />
  );
}
