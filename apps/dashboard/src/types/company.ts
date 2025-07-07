import { CompanyInfo } from './company-info';
import { WorkingTime } from './working-time';

export type Company = {
  id: number;
  email: string;
};

export type CompanyStructured = Company & {
  companyInfo: CompanyInfo;
  workingTimeSettings: WorkingTime[];
};
