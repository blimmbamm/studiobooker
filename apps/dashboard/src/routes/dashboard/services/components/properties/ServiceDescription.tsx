import { PropertiesTableProperty } from '@studiobooker/utils';
import { useServiceProperty } from '../../hooks/useServiceProperty';
import { Service } from '../../../../../types/service';

export default function ServiceDescription({ service }: { service: Service }) {
  const { value, handleChange } = useServiceProperty({
    entity: service,
    property: 'description',
    parseProperty: (value) => value,
  });
  return (
    <PropertiesTableProperty
      name="Description"
      value={value}
      onChange={handleChange}
      multiline
      disabled={service.activated}
    />
  );
}
