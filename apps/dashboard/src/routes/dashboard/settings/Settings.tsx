import { Divider } from '@mui/material';

import { FallbackMessage } from '@studiobooker/utils';

import CompanyInformation from './components/company-information/CompanyInformation';
import WorkingTimeSettings from './components/working-times/WorkingTimeSettings';
import { useCompany } from '../../../hooks/queries/company.queries';
import { usePageTitle } from '../../../hooks/meta-data/usePageTitle';

export default function Settings() {
  usePageTitle('Settings');

  const { company, isError } = useCompany();

  if (isError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  return (
    <>
      <CompanyInformation company={company} />
      <Divider />
      <WorkingTimeSettings company={company} />
    </>
  );
}
