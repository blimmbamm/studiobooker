import { Divider } from '@mui/material';

import { FallbackMessage } from '@studiobooker/utils';

import { useCompany } from '../../../hooks/company.queries';
import CompanyInformation from './components/company-information/CompanyInformation';
import WorkingTimeSettings from './components/working-times/WorkingTimeSettings';

export default function Settings() {
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
