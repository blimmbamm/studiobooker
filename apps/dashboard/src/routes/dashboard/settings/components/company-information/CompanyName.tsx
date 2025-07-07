import { PropertiesTableProperty } from '@studiobooker/utils';
import { CompanyStructured } from '../../../../../types/company';
import { useCompanyInfoProperty } from '../../hooks/useCompanyInfoProperty';

type Props = { company: CompanyStructured };

export default function CompanyName({ company }: Props) {
  const { value, handleChange } = useCompanyInfoProperty({
    entity: company.companyInfo,
    property: 'name',
    parseProperty: (value) => value,
  });

  return (
    <PropertiesTableProperty
      name="Name"
      value={value}
      onChange={handleChange}
    />
  );
}
