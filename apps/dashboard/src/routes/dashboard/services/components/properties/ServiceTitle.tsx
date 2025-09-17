import { PropertiesTableProperty, Service } from '@studiobooker/utils';

import { useServiceProperty } from '../../hooks/useServiceProperty';

export default function ServiceTitle({ service }: { service: Service }) {
  const { value, handleChange, showError, checkErrors, helperText } =
    useServiceProperty({
      entity: service,
      property: 'title',
      parseProperty: (value) => value,
      submitValueIf: (value) => Boolean(value),
      validationErrorHelperText: 'Must not be empty.',
    });

  return (
    <PropertiesTableProperty
      name="Title"
      value={value}
      onChange={handleChange}
      error={showError}
      helperText={helperText}
      onBlur={checkErrors}
      disabled={service.activated}
    />
  );
}
