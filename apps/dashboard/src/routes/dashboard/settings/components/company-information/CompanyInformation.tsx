import {
  PropertySkeleton,
  PropertiesTableSection,
  CompanyStructured,
} from '@studiobooker/utils';

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
