import { PropertySkeleton, PropertiesTableSection } from '@studiobooker/utils';
import { CompanyStructured } from '../../../../../types/company';
import CompanyName from './CompanyName';
import CompanyDescription from './CompanyDescription';

type Props = {
  company?: CompanyStructured;
};

export default function CompanyInformation({ company }: Props) {
  return (
    <PropertiesTableSection title="Company information">
      {!company && (
        <>
          <PropertySkeleton name="Name" />
          <PropertySkeleton name="Description" />
        </>
      )}
      {company && (
        <>
          <CompanyName company={company} />
          <CompanyDescription company={company} />
        </>
      )}
    </PropertiesTableSection>
  );
}
