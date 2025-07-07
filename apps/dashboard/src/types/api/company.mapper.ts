import { Company, CompanyStructured } from '../company';
import { ApiCompany, ApiCompanyStructured } from './company';
import { mapApiToCompanyInfo } from './company-info.mapper';
import { mapApiToWorkingTimeSetting } from './working-time-setting.mapper';

export function mapApiToCompany(data: ApiCompany): Company {
  return data;
}

export function mapApiToCompanyStructured(
  data: ApiCompanyStructured
): CompanyStructured {
  return {
    ...data,
    companyInfo: mapApiToCompanyInfo(data.companyInfo),
    workingTimeSettings: data.workingTimeSettings.map(
      mapApiToWorkingTimeSetting
    ),
  };
}
