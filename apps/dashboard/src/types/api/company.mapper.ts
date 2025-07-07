import { Company, CompanyStructured } from '../company';
import { ApiCompany, ApiCompanyStructured } from './company';
import { mapApiToCompanyInfo } from './company-info.mapper';
import { mapApiToWorkingTime } from './working-time.mapper';

export function mapApiToCompany(data: ApiCompany): Company {
  return data;
}

export function mapApiToCompanyStructured(
  data: ApiCompanyStructured
): CompanyStructured {
  return {
    ...data,
    companyInfo: mapApiToCompanyInfo(data.companyInfo),
    workingTimeSettings: data.workingTimeSettings.map(mapApiToWorkingTime),
  };
}
