import { Divider } from '@mui/material';

import { FallbackMessage } from '@studiobooker/utils';
import { useCompany } from '../../../hooks/company.queries';
import CompanyInformation from './components/company-information/CompanyInformation';

export default function Settings() {
  const { company, isError } = useCompany();

  if (isError) {
    return <FallbackMessage message="Something went wrong..." />;
  }

  console.log(company);

  return (
    <>
      <CompanyInformation company={company} />
      <Divider />
      {/* <CompanyWorkingTimeSettings company={company} /> */}
    </>
  );
}
