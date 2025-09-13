import { CompanyInfo } from '../company-info/company-info';
import { WorkingTime } from '../working-time/working-time';

export type Company = {
  id: number;
  email: string;
};

export type CompanyStructured = Company & {
  companyInfo: CompanyInfo;
  workingTimeSettings: WorkingTime[];
};
