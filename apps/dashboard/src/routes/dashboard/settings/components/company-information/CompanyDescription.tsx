import {
  PropertiesTableProperty,
  CompanyStructured,
} from '@studiobooker/utils';

import { useCompanyInfoProperty } from '../../hooks/useCompanyInfoProperty';

type Props = { company: CompanyStructured };

export default function CompanyDescription({ company }: Props) {
  const { value, handleChange } = useCompanyInfoProperty({
    entity: company.companyInfo,
    property: 'description',
    parseProperty: (value) => value,
  });

  return (
    <PropertiesTableProperty
      name="Description"
      multiline
      value={value}
      onChange={handleChange}
    />
  );
}
