import { CompanyInfo } from './company-info';
import { WorkingTimeSetting } from './working-time-setting';

export type Company = {
  id: number;
  email: string;
};

export type CompanyStructured = Company & {
  companyInfo: CompanyInfo;
  workingTimeSettings: WorkingTimeSetting[];
};
