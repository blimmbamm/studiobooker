import { CompanyInfo } from './company-info';
import { ApiCompanyInfo } from './company-info.api';

export function mapApiToCompanyInfo(data: ApiCompanyInfo): CompanyInfo {
  return { ...data };
}
