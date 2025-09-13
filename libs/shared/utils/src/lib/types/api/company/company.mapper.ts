import { mapApiToCompanyInfo } from '../company-info/company-info.mapper';
import { mapApiToWorkingTime } from '../working-time/working-time.mapper';
import { Company, CompanyStructured } from './company';
import { ApiCompany, ApiCompanyStructured } from './company.api';

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
