import { PropertiesTableProperty } from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { useServiceProperty } from '../../hooks/useServiceProperty';

export default function ServiceDuration({ service }: { service: Service }) {
  function isNumberString(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const { value, handleChange } = useServiceProperty({
    entity: service,
    property: 'duration',
    parseProperty: (value) => +value, // this is safe because updateValueIf only allows numeric strings
    updateValueIf: isNumberString,
  });

  return (
    <PropertiesTableProperty
      name="Duration (min.)"
      value={value}
      onChange={handleChange}
    />
  );
}
