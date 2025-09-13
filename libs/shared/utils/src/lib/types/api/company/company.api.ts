import { ApiCompanyInfo } from '../company-info/company-info.api';
import { ApiWorkingTime } from '../working-time/working-time.api';

export type ApiCompany = {
  id: number;
  email: string;
};

export type ApiCompanyStructured = ApiCompany & {
  companyInfo: ApiCompanyInfo;
  workingTimeSettings: ApiWorkingTime[];
};
