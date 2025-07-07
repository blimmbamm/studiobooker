import { ApiCompanyStructured } from '../types/api/company';
import { ApiCompanyInfo } from '../types/api/company-info';
import { mapApiToCompanyInfo } from '../types/api/company-info.mapper';
import { mapApiToCompanyStructured } from '../types/api/company.mapper';
import { EditCompanyInfoDto } from '../types/company-info';
import { client } from './client';

export async function getCompany() {
  const company = await client.get<ApiCompanyStructured>('company');
  return mapApiToCompanyStructured(company);
}

export async function editCompanyInfo(id: number, inputs: EditCompanyInfoDto) {
  console.log('test')
  const companyInfo = await client.patch<ApiCompanyInfo>(
    `company-info/${id}`,
    inputs
  );
  console.log(companyInfo)
  return mapApiToCompanyInfo(companyInfo);
}
