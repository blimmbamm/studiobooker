import { getClient } from '../../http';
import { EditCompanyInfoDto } from '../../types/api/company-info/company-info';
import { ApiCompanyInfo } from '../../types/api/company-info/company-info.api';
import { mapApiToCompanyInfo } from '../../types/api/company-info/company-info.mapper';
import { ApiCompanyStructured } from '../../types/api/company/company.api';
import { mapApiToCompanyStructured } from '../../types/api/company/company.mapper';

export async function getCompany() {
  const company = await getClient().get<ApiCompanyStructured>('company');
  return mapApiToCompanyStructured(company);
}

export async function editCompanyInfo(id: number, inputs: EditCompanyInfoDto) {
  const companyInfo = await getClient().patch<ApiCompanyInfo>(
    `company-info/${id}`,
    inputs
  );
  return mapApiToCompanyInfo(companyInfo);
}
